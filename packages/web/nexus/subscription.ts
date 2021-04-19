import { MembershipSubscriptionPeriod, InputJsonValue, PrismaClient } from '@journaly/j-db-client'
import {
  arg,
  booleanArg,
  extendType,
  objectType,
  stringArg,
} from '@nexus/schema'
import stripe, { paymentErrorWrapper } from '@/nexus/utils/stripe'

const MembershipSubscription = objectType({
  name: 'MembershipSubscription',
  definition(t) {
    t.model.id()
    t.model.period()
    t.model.userId()
    t.model.expiresAt()
    t.model.cancelAtPeriodEnd()
    t.model.lastFourCardNumbers()
    t.model.cardBrand()
    t.boolean('isActive', {
      resolve: async (parent, _args, _ctx, _info) => {
        if (parent.expiresAt && parent.expiresAt < new Date(Date.now())) return false
        return true
      }
    })
  }
})

const getSubscriptionPriceId = (subType: MembershipSubscriptionPeriod) => {
  switch(subType) {
    case MembershipSubscriptionPeriod.MONTHLY:
      return process.env.STRIPE_MONTHLY_PRICE_ID
    case MembershipSubscriptionPeriod.QUARTERLY:
      return process.env.STRIPE_QUARTERLY_PRICE_ID
    case MembershipSubscriptionPeriod.ANNUALY:
      return process.env.STRIPE_ANNUAL_PRICE_ID
  }
}

const setPaymentMethod = async (
  userId: number,
  db: PrismaClient,
  customerId: string,
  paymentMethodId: string,
) => {
  const customer = await stripe.customers.retrieve(customerId)
  
  if (!customer) throw new Error("User has stripeCustomerId but unable to find customer in Stripe")

  const stripePaymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customer.id,
  })
  if (!stripePaymentMethod.card) throw new Error("Unable to retrieve payment method")

  await stripe.customers.update(customer.id, {
    invoice_settings: {
      default_payment_method: stripePaymentMethod.id,
    },
  })

  return db.membershipSubscription.update({
    where: {
      userId,
    },
    data: {
      lastFourCardNumbers: stripePaymentMethod.card.last4,
      cardBrand: stripePaymentMethod.card.brand,
    },
  })
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
    items: [{
      id: stripeSubscription.items.data[0].id,
      price: getSubscriptionPriceId(subscriptionPeriod),
    }],
  })
  if (subscriptionUpdated.pending_update) {
    // Payment failed
    throw new Error("Unable to update subscription, possible payment failure")
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
      expiresAt: new Date(subscriptionUpdated.current_period_end * 1000 + (24 * 60 * 60 * 1000 * 2)),
      stripeSubscription: subscriptionUpdated as unknown as InputJsonValue,
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
        period: arg({ type: 'MembershipSubscriptionPeriod', required: true }),
        paymentMethodId: stringArg({ required: true }),
      },
      resolve: (_parent, args, ctx) => paymentErrorWrapper(async () => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error("You must be logged in to create a subscription")
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            membershipSubscription: true,
          }
        })

        if (!user) throw new Error("User not found")

        if (!user.stripeCustomerId) {
          const customer = await stripe.customers.create({
            payment_method: args.paymentMethodId,
            description: `${user.handle} (${user.id})`,
            email: user.email,
            metadata: {
              journalyUserId: user.id,
              handle: user.handle,
            },
          })
          await ctx.db.user.update({
            where: {
              id: userId,
            },
            data: {
              stripeCustomerId: customer.id,
            },
          })

          const stripeSubscription = await stripe.subscriptions.create({
            items: [{
              price: getSubscriptionPriceId(args.period),
              metadata: {
                journalyUserId: userId,
              },
            }],
            default_payment_method: args.paymentMethodId,
            customer: customer.id,
            trial_end: process.env.NODE_ENV === 'development' ? 1619947505 : undefined,
          })

          const stripePaymentMethod = await stripe.paymentMethods.retrieve(args.paymentMethodId)
          if (!stripePaymentMethod.card) throw new Error("Unable to retrieve payment method")
  
          const subData = {
            period: args.period,
            // Give 2 days grace period
            expiresAt: new Date(stripeSubscription.current_period_end * 1000 + (24 * 60 * 60 * 1000 * 2)),
            // We weren't smart enough to make TS know that Stripe.Response & InputJsonValue are comparable :'(
            stripeSubscription: stripeSubscription as unknown as InputJsonValue,
            stripeSubscriptionId: stripeSubscription.id,
            lastFourCardNumbers: stripePaymentMethod.card.last4,
            cardBrand: stripePaymentMethod.card.brand,
          }
  
          // TODO: Log failure and get proper alarms set up
          return ctx.db.membershipSubscription.upsert({
            create: {
              ...subData,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
            update: subData,
            where: {
              userId,
            },
          })
        } else {
          if (!user.membershipSubscription) throw new Error("User has stripeCustomerId but no membershipSubscription")
          
          await setPaymentMethod(userId, ctx.db, user.stripeCustomerId, args.paymentMethodId)
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
        cancelAtPeriodEnd: booleanArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => paymentErrorWrapper(async () => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error("You must be logged in to create a subscription")
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            membershipSubscription: true,
          }
        })

        if (!user) throw new Error("User not found")
        if (!user?.membershipSubscription?.stripeSubscriptionId) {
          throw new Error("User has no subscription to cancel")
        }

        await stripe.subscriptions.update(user.membershipSubscription.stripeSubscriptionId, {
          cancel_at_period_end: args.cancelAtPeriodEnd,
        })

        // simply update our equivalent of cancel_at_period_end and let expire at end of current period
        return await ctx.db.membershipSubscription.update({
          where: {
            userId,
          },
          data: {
            cancelAtPeriodEnd: args.cancelAtPeriodEnd,
          }
        })
      }),
    })
    t.field('updateSubscriptionPlan', {
      type: 'MembershipSubscription',
      args: {
        period: arg({ type: 'MembershipSubscriptionPeriod', required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error("You must be logged in to update a subscription")
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            membershipSubscription: true,
          }
        })

        if (!user) throw new Error("User not found")
        if (!user?.membershipSubscription?.stripeSubscriptionId) {
          throw new Error("User has no subscription to update")
        }

        return setPlan(
          userId,
          ctx.db,
          user.membershipSubscription.stripeSubscriptionId,
          args.period,
          false,
        )
      }
    })
    t.field('updateSubscriptionPaymentMethod', {
      type: 'MembershipSubscription',
      args: {
        paymentMethodId: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => paymentErrorWrapper(async () => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error("You must be logged in to update a payment method")
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            membershipSubscription: true,
          }
        })

        if (!user) throw new Error("User not found")
        if (!user?.membershipSubscription?.stripeSubscriptionId) {
          throw new Error("User has no subscription to update")
        }

        const membershipSubscription = await setPaymentMethod(
          userId,
          ctx.db,
          user.membershipSubscription.stripeSubscriptionId,
          args.paymentMethodId,
        )
        return membershipSubscription
      }),
    })
  }
})

export default [
  MembershipSubscription,
  MembershipSubscriptionMutations,
]
