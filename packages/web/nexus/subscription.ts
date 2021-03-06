import { MembershipSubscriptionType } from '@journaly/j-db-client'
import {
  arg,
  extendType,
  objectType,
  stringArg,
} from '@nexus/schema'
import stripeConfig from './utils/stripe'

const MembershipSubscription = objectType({
  name: 'MembershipSubscription',
  definition(t) {
    t.model.id()
    t.model.price()
    t.model.type()
    t.model.userId()
    t.model.expiresAt()
  }
})

const MembershipSubscriptionTransaction = objectType({
  name: 'MembershipSubscriptionTransaction',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.chargeCents()
    t.model.createdAt()
  }
})

const calculateSubPrice = (subType: MembershipSubscriptionType) => {
  switch(subType) {
    case MembershipSubscriptionType.MONTHLY:
      return 1000
    case MembershipSubscriptionType.QUARTERLY:
      return 2700
    case MembershipSubscriptionType.SEMIANNUALY:
      return 5000
    case MembershipSubscriptionType.ANNUALY:
      return 1000
  }
}

const MembershipSubscriptionMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createMembershipSubscription', {
      type: 'MembershipSubscription',
      args: {
        type: arg({ type: 'MembershipSubscriptionType', required: true }),
        token: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error("You must be logged in to create a subscription")
        }
        
        const charge = await stripeConfig.paymentIntents.create({
          amount: calculateSubPrice(args.type),
          currency: 'USD',
          confirm: true,
          payment_method: args.token,
        }).catch(err => {
          console.log(err)
          throw new Error(err.message)
        })

        const subscription = await ctx.db.membershipSubscription.create({
          data: {
            type: args.type,
            price: charge.amount,
            user: {
              connect: {
                id: userId,
              }
            },
            expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
          }
        })

        await ctx.db.membershipSubscriptionTransaction.create({
          data: {
            chargeCents: subscription.price,
            user: {
              connect: {
                id: userId,
              }
            },
          }
        })

        return subscription
      },
    })
  },
})

export default [
  MembershipSubscription,
  MembershipSubscriptionMutations
]
