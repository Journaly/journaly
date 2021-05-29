import { getClient } from '@/nexus/utils/db'
import stripe, { getOrCreateStripeCustomer } from '@/nexus/utils/stripe'
import { 
  Prisma,
  MembershipSubscriptionPeriod,
} from '@journaly/j-db-client'

const handler = async (userId: number, months: number | undefined) => {
  const db = await getClient()
  const user = await db.user.findUnique({
    where: { id: userId, }
  })

  if (!user) {
    throw new Error(`Unable to look up user with id ${userId}`)
  }

  const customerId = await getOrCreateStripeCustomer(user, db)
  const expiresAt = months
      ? new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)

  const stripeSubscription = await stripe.subscriptions.create({
    items: [{
      price: process.env.FREE_PRICE_ID!,
      metadata: {
        journalyUserId: user.id,
      },
    }],
    customer: customerId,
    cancel_at: months
      ? ~~(Date.now() / 1000 + months * 30 * 24 * 60 * 60)
      : undefined
  })

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      lastFourCardNumbers: 'NONE',
      cardBrand: 'visa',
    },
  })

  await db.membershipSubscription.create({
    data: {
      period: MembershipSubscriptionPeriod.MONTHLY,
      expiresAt: expiresAt,
      stripeSubscription: stripeSubscription as unknown as Prisma.InputJsonValue,
      stripeSubscriptionId: stripeSubscription.id,
      user: {
        connect: {
          id: userId,
        }
      }
    },
  })
}

const [userId, months] = process.argv.slice(2).map(x => parseInt(x))

handler(userId, months)
  .catch((e) => { throw e })
  .then(() => process.exit(0))
