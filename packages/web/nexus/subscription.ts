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

const getSubscriptionPriceId = (subType: MembershipSubscriptionType) => {
  switch(subType) {
    case MembershipSubscriptionType.MONTHLY:
      return 'price_1ISRgvB8OEjVdGPaQr7ZANW8'
    case MembershipSubscriptionType.QUARTERLY:
      return 'price_1ISRgvB8OEjVdGPaeOx4m255'
    case MembershipSubscriptionType.ANNUALY:
      return 'price_1ISRgvB8OEjVdGPam1PTr6hE'
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

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) throw new Error("User not found")

        let customerId

        if (!user.stripeCustomerId) {
          const customer = (await stripeConfig.customers.create({
            payment_method: args.token,
            description: `${user.handle} (${user.id})`,
            email: user.email,
            metadata: {
              id: user.id,
              handle: user.handle,
            },
          }))
          console.log(customer)
          // TODO update stripeCustomerId on User
          customerId = customer.id
        } else {
          customerId = user.stripeCustomerId
        }

        const charge = await stripeConfig.subscriptions.create({
          items: [{
            price: getSubscriptionPriceId(args.type),
            metadata: {
              journalyUserId: userId,
            },
          }],
          default_payment_method: args.token,
          customer: customerId,
        })

        const subData = {
          type: args.type,
          user: {
            connect: {
              id: userId,
            }
          },
          expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        }

        // TODO: Log failure and get proper alarms set up
        const subscription = await ctx.db.membershipSubscription.upsert({
          create: subData,
          update: subData,
          where: {
            userId,
          },
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
