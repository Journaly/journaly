import { PrismaClient, MembershipSubscriptionPeriod } from '@journaly/j-db-client'
import stripe from '../../../nexus/utils/stripe'

const handler = async (req: any, res: any) => {
  const db = new PrismaClient()
  const event = req.body

  const updateStripeSubscription = async (subscriptionId: string, eventType: string) => {
    const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId)

    let expiresAt
    switch(eventType) {
      case 'PAYMENT_SUCCEEDED':
        expiresAt = new Date(stripeSubscription.current_period_end * 1000 + (24 * 60 * 60 * 1000 * 2))
        break
      case 'PAYMENT_FAILED':
        expiresAt = new Date(Date.now())
        break
    }
    
    // update existing subscription object (expiresAt) + a day or two
    await db.membershipSubscription.update({
      where: {
        stripeSubscriptionId: subscriptionId,
      },
      data: {
        expiresAt,
      },
    })
  }

  console.log(event)

    try {
      if (event.type === 'invoice.paid') {
        console.log(event)
        const invoice = event.data.object
        const subscriptionLine = invoice.lines.data[0]

        if (!subscriptionLine) {
          throw new Error("Subscription line missing")
        }
        
        if (subscriptionLine.type !== 'subscription') {
          throw new Error("First line item is not a subscription. Something seems wrong here...")
        }

        const userQuery = await db.user.findMany({
          where: {
            stripeCustomerId: invoice.customer,
          },
          include: {
            membershipSubscription: true,
          }
        })

        if (userQuery.length !== 1) throw new Error("Problem with user query")
        const currentUser = userQuery[0]

        const convertStripePriceToMembershipPeriod = (priceId: string) => {
          switch(priceId) {
            case 'price_1ISRgvB8OEjVdGPaQr7ZANW8':
              return MembershipSubscriptionPeriod.MONTHLY
            case 'price_1ISRgvB8OEjVdGPaeOx4m255':
              return MembershipSubscriptionPeriod.QUARTERLY
            case 'price_1ISRgvB8OEjVdGPam1PTr6hE':
              return MembershipSubscriptionPeriod.ANNUALY
          }
          return null
        }

        const membershipPeriod = convertStripePriceToMembershipPeriod(subscriptionLine.price.id)
        if (!membershipPeriod) throw new Error("Unable to resolve a period from invoice object")

        await db.membershipSubscriptionTransaction.create({
          data: {
            stripeInvoiceId: invoice.id,
            chargeCurrency: invoice.currency,
            chargeCents: invoice.amount_paid,
            stripeInvoiceData: JSON.stringify(invoice),
            membershipSubscriptionPeriod: membershipPeriod,
            user: {
              connect: {
                id: currentUser.id,
              },
            },
          }
        })

        updateStripeSubscription(subscriptionLine.subscription, 'PAYMENT_SUCCEEDED')
      } else if (event.type === 'invoice.payment_failed') {
        /**
         * For now we'll just do nothing and allow the subscription to expire
         */
        const invoice = event.data.object
        const subscriptionLine = invoice.lines.data[0]

        if (!subscriptionLine) {
          throw new Error("Subscription line missing")
        }
        if (subscriptionLine.type !== 'subscription') {
          throw new Error("First line item is not a subscription. Something seems wrong here...")
        }

        updateStripeSubscription(subscriptionLine.subscription, 'PAYMENT_FAILED')
      }
    } catch (err) {
      // TODO: get better logging
      console.log(err)
    }

  res.status(200).json({
    received: true,
  })

  // TODO (@Lanny): do your thang! 🧹
  db.$disconnect()
}

export default handler
