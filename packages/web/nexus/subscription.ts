import { MembershipSubscriptionType } from '@journaly/j-db-client'
import {
  arg,
  extendType,
  objectType,
} from '@nexus/schema'

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
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

       return ctx.db.membershipSubscription.create({
          data: {
            type: args.type,
            price: calculateSubPrice(args.type),
            user: {
              connect: {
                id: userId,
              }
            },
            expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
          }
        })
      }
    })
  }
})

export default [
  MembershipSubscription,
  MembershipSubscriptionMutations
]
