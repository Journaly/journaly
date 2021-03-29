import { PrismaClient } from '@journaly/j-db-client'

const handler = async (req: any, res: any) => {
  const db = new PrismaClient()
  const event = req.body

  // fetch user by stripeCustomerId
  // filter events for relevant ones
  // process each one seperately

  // at some point could email customer after invoice.paid event

  // 

  // handle cancellation and update user status
    try {
      if (event.type === 'invoice.paid') {
        console.log('CHARGE CREATED!')
        console.log(event)
        await db.membershipSubscriptionTransaction.create({
          data: {
            stripeChargeId: event.data.object.id,
            chargeCurrency: event.data.object.currency,
            chargeCents: event.data.object.price,
            stripeChargeData: JSON.stringify(event.data.object),
            user: {
              connect: {
                id: userId,
              }
            },
          }
        })
        // update existing subscription object (expiresAt) + a day or two
      }
        // else if (event.type === 'customer.subscription.deleted') {
        //   console.log('SUBSCRIPTION DELETED!')
        //   console.log(event)
        //   const user = db.user.findUnique({
        //     where: {
        //       stripeCustomerId: event.data.object.customer,
        //     }
        //   })
        // }
    } catch (err) {
      // TODO: get better logging
      console.log(err)
    }

  // TODO: update user status to premium

  // console.log(event)
  res.status(200).json({
    received: true,
  })

  // TODO (@Lanny): do your thang! 🧹
  db.$disconnect()
}

export default handler
