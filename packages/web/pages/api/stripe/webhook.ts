import { InputJsonValue, MembershipSubscriptionPeriod, PrismaClient } from '@journaly/j-db-client'
import Stripe from 'stripe'
import stripe, { logPaymentsError } from '@/nexus/utils/stripe'
import { getClient } from '@/nexus/utils'

const updateStripeSubscription = async (subscriptionId: string, db: PrismaClient) => {
  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId)
  let expiresAt = stripeSubscription.current_period_end * 1000

  // Apply a grace period of 2 days to 'active' subscriptions
  if (stripeSubscription.status === 'active') {
    expiresAt += 24 * 60 * 60 * 1000 * 2
  }
  
  await db.membershipSubscription.update({
    where: {
      stripeSubscriptionId: subscriptionId,
    },
    data: {
      expiresAt: new Date(expiresAt),
      stripeSubscription: stripeSubscription as unknown as InputJsonValue,
    },
  })
}

const convertStripePriceToMembershipPeriod = (priceId: string) => {
  switch(priceId) {
    case 'price_1IfUxzB8OEjVdGPaoVEVtPcY':
      return MembershipSubscriptionPeriod.MONTHLY
    case 'price_1IfUzeB8OEjVdGPapy59R8xs':
      return MembershipSubscriptionPeriod.QUARTERLY
    case 'price_1ISRgvB8OEjVdGPam1PTr6hE':
      return MembershipSubscriptionPeriod.ANNUALY
  }
  throw new Error("Price ID does not match one of our valid IDs")
}

const handler = async (req: any, res: any) => {
  const db = getClient()
  const sig = req.headers['stripe-signature']
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SIGNING_SECRET!);
  }
  catch (err) {
    logPaymentsError(
      err.message,
      err,
      req.body,
    )

    req.status(400).send(`Webhook Error: ${err.message}`);
    return
  }

  try {
    if (event.type === 'invoice.paid') {
      const stripeInvoice = event.data.object as Stripe.Invoice
      const subscriptionLine = stripeInvoice.lines.data.find((item: any) => item.type === 'subscription')
      let customerId: string = (typeof stripeInvoice.customer === 'string') ? stripeInvoice.customer : stripeInvoice.customer.id

      if (!subscriptionLine?.price) {
        throw new Error("Subscription line missing")
      }
      if (!subscriptionLine.subscription) {
        throw new Error("Subscription ID not present on subscriptionLine")
      }

      const userQuery = await db.user.findMany({
        where: {
          stripeCustomerId: customerId,
        },
        include: {
          membershipSubscription: true,
        }
      })

      if (userQuery.length !== 1) {
        throw new Error(`Problem with user query. Query length: ${userQuery.length}`)
      }
      const currentUser = userQuery[0]

      const membershipPeriod = convertStripePriceToMembershipPeriod(subscriptionLine.price.id)
      if (!membershipPeriod) throw new Error("Unable to resolve a period from invoice object")

      const invoice = await db.membershipSubscriptionInvoice.create({
        data: {
          stripeInvoiceId: stripeInvoice.id,
          stripeInvoiceData: stripeInvoice as unknown as InputJsonValue,
          membershipSubscriptionPeriod: membershipPeriod,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        }
      })

      for (const item of stripeInvoice.lines.data) {
        await db.membershipSubscriptionInvoiceItem.create({
          data: {
            amount: item.amount,
            currency: item.currency,
            description: item.description || '',
            proration: item.proration,
            invoice: {
              connect: {
                id: invoice.id,
              },
            },
            stripeInvoiceItemId: item.id,
            stripeInvoiceItemData: item as unknown as InputJsonValue,
          },
        })
      }

      await updateStripeSubscription(subscriptionLine.subscription, db)
    } else if (event.type === 'invoice.payment_failed') {
      /**
       * For now we'll just do nothing and allow the subscription to expire
       */
      const stripeInvoice = event.data.object as Stripe.Invoice
      const subscriptionLine = stripeInvoice.lines.data.find((item: any) => item.type === 'subscription')

      if (!subscriptionLine) {
        throw new Error("Subscription line missing")
      }
      if (subscriptionLine.type !== 'subscription') {
        throw new Error("First line item is not a subscription. Something seems wrong here...")
      }
      if (!subscriptionLine.subscription) {
        throw new Error("Subscription ID not present on subscriptionLine")
      }

      await updateStripeSubscription(subscriptionLine.subscription, db)
    }
    // handle creating a new membershipSubscriptionTransaction when upgrading/downgrading
  } catch (err) {
    logPaymentsError(
      err.message,
      err,
      event
    )
  }

  res.status(200).json({
    received: true,
  })
}

export default handler
