import { MembershipSubscriptionPeriod, InputJsonValue } from '@journaly/j-db-client'
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
    t.model.stripeSubscriptionId()
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
        // TODO: remove this || true
        if (!user.stripeCustomerId) {
          const customer = (await stripe.customers.create({
            payment_method: args.token,
            description: `${user.handle} (${user.id})`,
            email: user.email,
            metadata: {
              id: user.id,
              handle: user.handle,
            },
          }))
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
          const subscription = await ctx.db.membershipSubscription.upsert({
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
          return subscription
        } else {
          const customer = await stripe.customers.retrieve(user.stripeCustomerId)
          customerId = customer.id

          if (customer && user.membershipSubscription?.stripeSubscriptionId) {
            console.log('Customer is changing their subscription!')
            const stripeSubscription = (await stripe.subscriptions.retrieve(user.membershipSubscription?.stripeSubscriptionId))
            console.log(stripeSubscription)
            const subscriptionUpdated = await stripe.subscriptions.update(stripeSubscription.items.data[0].id, {
              cancel_at_period_end: false,
              payment_behavior: 'pending_if_incomplete',
              proration_behavior: 'always_invoice',
              items: [{
                id: stripeSubscription.items.data[0].id,
                price: getSubscriptionPriceId(args.period),
              }]
            })
            if (subscriptionUpdated.pending_update) {
              // Payment failed
              console.log('Payment failed!')
            }
            // Update our records with the new subscription info
            await ctx.db.membershipSubscription.update({
              where: {
                userId,
              },
              data: {
                period: args.period,
                expiresAt: new Date(subscriptionUpdated.current_period_end * 1000 + (24 * 60 * 60 * 1000 * 2)),
                stripeSubscription: subscriptionUpdated as unknown as InputJsonValue,
              },
            })
            return
          }
        }
        return
      },
    })
    t.field('cancelMembershipSubscription', {
      type: 'MembershipSubscription',
      args: {
        stripeSubscriptionId: stringArg({ required: true }),
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

        const stripeSubscriptionItems = await stripe.subscriptions.retrieve(args.stripeSubscriptionId)
        const stripeSubscription = stripeSubscriptionItems.items.data[0]

        if (user.membershipSubscription?.stripeSubscriptionId !== stripeSubscription.id) {
          throw new Error("User does not match stripe subscription")
        }

        const cancelledSubscription = await stripe.subscriptions.update(stripeSubscription.id, {
          cancel_at_period_end: true,
        })
        console.log('User is cancelling subscription')
        // leave our copy of membershipSubscription alone and let expire at end of current period
        const journalyMembershipSubscription = await ctx.db.membershipSubscription.findUnique({
          where: {
            stripeSubscriptionId: stripeSubscription.id
          }
        })
        if (journalyMembershipSubscription) return journalyMembershipSubscription.id
      }
    })
  }
})

export default [
  MembershipSubscription,
  MembershipSubscriptionMutations,
]
