import { PrismaClient } from '@journaly/j-db-client'

const handler = async (req: any, res: any) => {
  const db = new PrismaClient()
  const event = req.body

  // at some point could email customer after invoice.paid event
  // handle cancellation and update user status

    try {
      if (event.type === 'charge.succeeded') {
        console.log('CHARGE SUCCEEDED!')
        console.log(event)
        const userQuery = await db.user.findMany({
          where: {
            stripeCustomerId: event.data.object.customer,
          },
        })

        if (userQuery.length !== 1) throw new Error("Problem with user query")
        const currentUser = userQuery[0]

        const transaction = await db.membershipSubscriptionTransaction.create({
          data: {
            stripeChargeId: event.data.object.id,
            chargeCurrency: event.data.object.currency,
            chargeCents: event.data.object.amount,
            stripeChargeData: JSON.stringify(event.data.object),
            // TODO: how should we set membershipSubscriptionPeriod?
            membershipSubscriptionPeriod: 'MONTHLY',
            user: {
              connect: {
                id: currentUser.id,
              },
            },
          }
        })
        // update existing subscription object (expiresAt) + a day or two
        await db.membershipSubscription.update({
          where: {
            userId: transaction.userId,
          },
          data: {
            // TODO: how should we set expiresAt?
          },
        })
      } else if (event.type === 'invoice.paid') {
        console.log('INVOICE PAID')
      }else if (event.type === 'invoice.payment_failed') {
        // 
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
