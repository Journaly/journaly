import { 
  Prisma,
  MembershipSubscriptionPeriod,
  PrismaClient,
} from '@journaly/j-db-client'
import { arg, booleanArg, enumType, extendType, nonNull, objectType, stringArg } from 'nexus'
import stripe, { getOrCreateStripeCustomer, paymentErrorWrapper } from '@/nexus/utils/stripe'
import { sendPremiumWelcomeEmail } from './utils'
import {
  MembershipSubscription,
  MembershipSubscriptionPeriod as MembershipSubscriptionPeriodEnum,
} from 'nexus-prisma'

const MembershipSubscriptionType = objectType({
  name: MembershipSubscription.$name,
  description: MembershipSubscription.$description,
  definition(t) {
    t.field(MembershipSubscription.id)
    t.field(MembershipSubscription.period)
    t.field(MembershipSubscription.userId)
    t.field(MembershipSubscription.expiresAt)
    t.field(MembershipSubscription.nextBillingDate)
    t.field(MembershipSubscription.cancelAtPeriodEnd)
    t.boolean('isActive', {
      resolve: async (parent, _args, _ctx, _info) => {
        if (parent.expiresAt && parent.expiresAt < new Date(Date.now())) return false
        return true
      },
    })
  },
})

const MembershipSubscriptionPeriodEnumType = enumType({
  name: MembershipSubscriptionPeriodEnum.name,
  description: MembershipSubscriptionPeriodEnum.description,
  members: MembershipSubscriptionPeriodEnum.members,
})

const getSubscriptionPriceId = (subType: MembershipSubscriptionPeriod) => {
  switch (subType) {
    case MembershipSubscriptionPeriod.MONTHLY:
      return process.env.STRIPE_MONTHLY_PRICE_ID
    case MembershipSubscriptionPeriod.ANNUALY:
      return process.env.STRIPE_ANNUAL_PRICE_ID
    case MembershipSubscriptionPeriod.STUDENT_ANNUALLY:
      return process.env.STRIPE_STUDENT_ANNUAL_PRICE_ID
  }
}

const setPaymentMethod = async (
  userId: number,
  db: PrismaClient,
  customerId: string,
  paymentMethodId: string,
) => {
  const customer = await stripe.customers.retrieve(customerId)

  if (!customer) throw new Error('User has stripeCustomerId but unable to find customer in Stripe')

  const stripePaymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customer.id,
  })

  if (!stripePaymentMethod.card) throw new Error('Unable to retrieve payment method')

  await stripe.customers.update(customer.id, {
    invoice_settings: {
      default_payment_method: stripePaymentMethod.id,
    },
  })

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      lastFourCardNumbers: stripePaymentMethod.card.last4,
      cardBrand: stripePaymentMethod.card.brand,
    },
  })

  return stripePaymentMethod
}

const setPlan = async (
  userId: number,
  db: PrismaClient,
  stripeSubscriptionId: string,
  subscriptionPeriod: MembershipSubscriptionPeriod,
  cancelAtPeriodEnd: boolean,
) => {
  const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
  const subscriptionUpdated = await stripe.subscriptions.update(stripeSubscription.id, {
    payment_behavior: 'pending_if_incomplete',
    proration_behavior: 'always_invoice',
    items: [
      {
        id: stripeSubscription.items.data[0].id,
        price: getSubscriptionPriceId(subscriptionPeriod),
      },
    ],
  })
  if (subscriptionUpdated.pending_update) {
    // Payment failed
    throw new Error('Unable to update subscription, possible payment failure')
  }
  if (subscriptionUpdated.cancel_at_period_end !== cancelAtPeriodEnd) {
    // For unknown reasons we are unable to set the `cancel_at_period_end`
    // in the same call as `payment/proration_behavior` so we make a second call
    await stripe.subscriptions.update(stripeSubscription.id, {
      cancel_at_period_end: cancelAtPeriodEnd,
    })
  }
  // Update our records with the new subscription info
  return db.membershipSubscription.update({
    where: {
      userId,
    },
    data: {
      period: subscriptionPeriod,
      expiresAt: new Date(subscriptionUpdated.current_period_end * 1000 + 24 * 60 * 60 * 1000 * 2),
      nextBillingDate: subscriptionUpdated.cancel_at_period_end
        ? null
        : new Date(subscriptionUpdated.current_period_end * 1000),
      stripeSubscription: subscriptionUpdated as unknown as Prisma.InputJsonValue,
      cancelAtPeriodEnd,
    },
  })
}

const MembershipSubscriptionMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('purchaseMembershipSubscription', {
      type: 'MembershipSubscription',
      args: {
        period: nonNull(arg({ type: 'MembershipSubscriptionPeriod' })),
        paymentMethodId: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx) =>
        paymentErrorWrapper(async () => {
          const { userId } = ctx.request

          if (!userId) {
            throw new Error('You must be logged in to create a subscription')
          }

          const user = await ctx.db.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              membershipSubscription: true,
            },
          })

          if (!user) throw new Error('User not found')
          if (args.period === MembershipSubscriptionPeriod.STUDENT_ANNUALLY && !user.isStudent) {
            throw new Error(
              'You must have a student email address to get the student discount price',
            )
          }

          const customerId = await getOrCreateStripeCustomer(user, ctx.db)

          const stripePaymentMethod = await setPaymentMethod(
            userId,
            ctx.db,
            customerId,
            args.paymentMethodId,
          )
          if (!stripePaymentMethod.card) throw new Error('Received a non-card payment method')

          let subscriptionIsFullyExpired = false

          // If we have a subscription record but the subscription has ended
          // because the billing period dates need to change (also stripe just
          // won't let us re-activate a supscription that's full canceled)
          if (user.membershipSubscription) {
            const stripeSubscription = await stripe.subscriptions.retrieve(
              user.membershipSubscription.stripeSubscriptionId,
            )

            if (stripeSubscription.ended_at) {
              subscriptionIsFullyExpired = true
            }
          }

          if (!user.membershipSubscription || subscriptionIsFullyExpired) {
            // If we're in dev or stage, create subscription with a trial period
            // that expires 5 minutes from the current time in order to test
            // recurring payments
            const trialEnd =
              process.env.NODE_ENV === 'development' ||
              process.env.VERCEL_GIT_COMMIT_REF === 'staging'
                ? ~~(Date.now() / 1000 + 300)
                : undefined

            const stripeSubscription = await stripe.subscriptions.create({
              items: [
                {
                  price: getSubscriptionPriceId(args.period),
                  metadata: {
                    journalyUserId: userId,
                  },
                },
              ],
              customer: customerId,
              trial_end: trialEnd,
            })

            const membershipSubscriptionData = {
              period: args.period,
              // Give 2 days grace period
              expiresAt: new Date(
                stripeSubscription.current_period_end * 1000 + 24 * 60 * 60 * 1000 * 2,
              ),
              nextBillingDate: new Date(stripeSubscription.current_period_end * 1000),
              // We weren't smart enough to make TS know that Stripe.Response & InputJsonValue are comparable :'(
              stripeSubscription: stripeSubscription as unknown as Prisma.InputJsonValue,
              stripeSubscriptionId: stripeSubscription.id,
            }

            let membershipSubscription

            if (user.membershipSubscription) {
              membershipSubscription = await ctx.db.membershipSubscription.update({
                where: { userId },
                data: membershipSubscriptionData,
              })
            } else {
              membershipSubscription = await ctx.db.membershipSubscription.create({
                data: {
                  ...membershipSubscriptionData,
                  user: { connect: { id: userId } },
                },
              })
            }

            await sendPremiumWelcomeEmail({ user })

            return membershipSubscription
          } else {
            const membershipSubscription = await setPlan(
              userId,
              ctx.db,
              user.membershipSubscription.stripeSubscriptionId,
              args.period,
              false,
            )
            return membershipSubscription
          }
        }),
    })
    t.field('updateSubscriptionRenewal', {
      type: 'MembershipSubscription',
      args: {
        cancelAtPeriodEnd: nonNull(booleanArg()),
      },
      resolve: async (_parent, args, ctx) =>
        paymentErrorWrapper(async () => {
          const { userId } = ctx.request

          if (!userId) {
            throw new Error('You must be logged in to create a subscription')
          }

          const user = await ctx.db.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              membershipSubscription: true,
            },
          })

          if (!user) throw new Error('User not found')
          if (!user?.membershipSubscription?.stripeSubscriptionId) {
            throw new Error('User has no subscription to cancel')
          }

          const updatedSubscription = await stripe.subscriptions.update(
            user.membershipSubscription.stripeSubscriptionId,
            {
              cancel_at_period_end: args.cancelAtPeriodEnd,
            },
          )

          // simply update our equivalent of cancel_at_period_end and let expire at end of current period
          return await ctx.db.membershipSubscription.update({
            where: {
              userId,
            },
            data: {
              cancelAtPeriodEnd: args.cancelAtPeriodEnd,
              nextBillingDate: args.cancelAtPeriodEnd
                ? null
                : new Date(updatedSubscription.current_period_end * 1000),
            },
          })
        }),
    })
    t.field('updateSubscriptionPlan', {
      type: 'MembershipSubscription',
      args: {
        period: nonNull(arg({ type: 'MembershipSubscriptionPeriod' })),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to update a subscription')
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            membershipSubscription: true,
          },
        })

        if (!user) throw new Error('User not found')
        if (!user?.membershipSubscription?.stripeSubscriptionId) {
          throw new Error('User has no subscription to update')
        }

        return setPlan(
          userId,
          ctx.db,
          user.membershipSubscription.stripeSubscriptionId,
          args.period,
          false,
        )
      },
    })
    t.field('updateSubscriptionPaymentMethod', {
      type: 'MembershipSubscription',
      args: {
        paymentMethodId: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) =>
        paymentErrorWrapper(async () => {
          const { userId } = ctx.request

          if (!userId) {
            throw new Error('You must be logged in to update a payment method')
          }

          const user = await ctx.db.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              membershipSubscription: true,
            },
          })

          if (!user) throw new Error('User not found')
          if (!user?.membershipSubscription?.stripeSubscriptionId) {
            throw new Error('User has no subscription to update')
          }
          if (!user?.stripeCustomerId) {
            throw new Error('User has no stripeCustomerId')
          }

          await setPaymentMethod(userId, ctx.db, user.stripeCustomerId, args.paymentMethodId)
          return user.membershipSubscription
        }),
    })
  },
})

export default [
  MembershipSubscriptionType,
  MembershipSubscriptionPeriodEnumType,
  MembershipSubscriptionMutations,
]
