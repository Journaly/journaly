import { MembershipSubscriptionPeriod, InputJsonValue, MembershipSubscription as FooBar } from '@journaly/j-db-client'
import {
  arg,
  extendType,
  objectType,
  stringArg,
} from '@nexus/schema'
import stripe from './utils/stripe'

const MembershipSubscription = objectType({
  name: 'MembershipSubscription',
  definition(t) {
    t.model.id()
    t.model.period()
    t.model.userId()
    t.model.expiresAt()
    t.model.cancelAtPeriodEnd()
  }
})

const getSubscriptionPriceId = (subType: MembershipSubscriptionPeriod) => {
  switch(subType) {
    case MembershipSubscriptionPeriod.MONTHLY:
      return 'price_1ISRgvB8OEjVdGPaQr7ZANW8'
    case MembershipSubscriptionPeriod.QUARTERLY:
      return 'price_1ISRgvB8OEjVdGPaeOx4m255'
    case MembershipSubscriptionPeriod.ANNUALY:
      return 'price_1ISRgvB8OEjVdGPam1PTr6hE'
  }
}

const MembershipSubscriptionMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('purchaseMembershipSubscription', {
      type: 'MembershipSubscription',
      args: {
        period: arg({ type: 'MembershipSubscriptionPeriod', required: true }),
        token: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
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

        let customerId
        if (!user.stripeCustomerId) {
          const customer = await stripe.customers.create({
            payment_method: args.token,
            description: `${user.handle} (${user.id})`,
            email: user.email,
            metadata: {
              id: user.id,
              handle: user.handle,
            },
          })
          customerId = customer.id
          await ctx.db.user.update({
            where: {
              id: userId,
            },
            data: {
              stripeCustomerId: customerId,
            },
          })

          const stripeSubscription = await stripe.subscriptions.create({
            items: [{
              price: getSubscriptionPriceId(args.period),
              metadata: {
                journalyUserId: userId,
              },
            }],
            default_payment_method: args.token,
            customer: customerId,
          })
  
          const subData = {
            period: args.period,
            // Give 2 days grace period
            expiresAt: new Date(stripeSubscription.current_period_end * 1000 + (24 * 60 * 60 * 1000 * 2)),
            // We weren't smart enough to make TS know that Stripe.Response & InputJsonValue are comparable :'(
            stripeSubscription: stripeSubscription as unknown as InputJsonValue,
            stripeSubscriptionId: stripeSubscription.id,
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
          const customer = await stripe.customers.retrieve(user.stripeCustomerId)
          
          if (!customer) throw new Error("User has stripeCustomerId but unable to find customer in Stripe")
          if (!user.membershipSubscription) throw new Error("User has stripeCustomerId but no membershipSubscription")

          await stripe.paymentMethods.attach(args.token, {
            customer: customer.id,
          })

          // Update customer's default method in case they've entered a new card
          await stripe.customers.update(customer.id, {
            invoice_settings: {
              default_payment_method: args.token,
            },
          })
          const stripeSubscription = await stripe.subscriptions.retrieve(user.membershipSubscription.stripeSubscriptionId)
          const subscriptionUpdated = await stripe.subscriptions.update(stripeSubscription.id, {
            payment_behavior: 'pending_if_incomplete',
            proration_behavior: 'always_invoice',
            items: [{
              id: stripeSubscription.items.data[0].id,
              price: getSubscriptionPriceId(args.period),
            }],
          })
          if (subscriptionUpdated.pending_update) {
            // Payment failed
            throw new Error("Unable to update subscription, possible payment failure")
          }
          await stripe.subscriptions.update(stripeSubscription.id, {
            cancel_at_period_end: false,
          })
          // Update our records with the new subscription info
          return ctx.db.membershipSubscription.update({
            where: {
              userId,
            },
            data: {
              period: args.period,
              expiresAt: new Date(subscriptionUpdated.current_period_end * 1000 + (24 * 60 * 60 * 1000 * 2)),
              stripeSubscription: subscriptionUpdated as unknown as InputJsonValue,
            },
          })
        }
      },
    })
    t.field('cancelMembershipSubscription', {
      type: 'MembershipSubscription',
      resolve: async (_parent, _args, ctx) => {
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
          cancel_at_period_end: true,
        })

        // simply update our equivalent of cancel_at_period_end and let expire at end of current period
        return await ctx.db.membershipSubscription.update({
          where: {
            userId,
          },
          data: {
            cancelAtPeriodEnd: true,
          }
        })
      }
    })
  }
})

export default [
  MembershipSubscription,
  MembershipSubscriptionMutations,
]
