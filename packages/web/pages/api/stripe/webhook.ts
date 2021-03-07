import { PrismaClient } from '@journaly/j-db-client'

const handler = async (req: any, res: any) => {
  const db = new PrismaClient()
  const event = req.body

  // fetch user by stripeCustomerId
  // filter events for relevant ones
  // process each one seperately

  // handle cancellation and update user status

  try {
    await db.membershipSubscriptionTransaction.create({
      data: {
        chargeCents: charge.amount,
        user: {
          connect: {
            id: userId,
          }
        },
      }
    })
  } catch (err) {
    // TODO: get better logging
    console.log(err)
  }

  // TODO: update user status to premium

  console.log(event)
  res.status(200).json({
    received: true,
  })

  // TODO (@Lanny): do your thang! 🧹
  db.$disconnect()
}

export default handler
