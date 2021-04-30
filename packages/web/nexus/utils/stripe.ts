import Stripe from 'stripe'

import {
  User,
  PrismaClient,
} from '@journaly/j-db-client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
})

const logPaymentsError = (
  message: string,
  error?: Error | undefined | null,
  event?: any
) => {
  console.error(
    'PAYMENTS ERROR:',
    JSON.stringify({
      errorType: 'PAYMENTS_ERROR',
      errorMessage: message,
      stack: error ? error.stack : new Error().stack,
      event,
    }),
    'PAYMENTS ERROR END'
  )
}

type MaybePromise<T> = T | Promise<T>
type PaymentErrorWrapperType = <T>(fn: () => MaybePromise<T>) => MaybePromise<T>

const paymentErrorWrapper: PaymentErrorWrapperType = async (fn) => {
  try {
    return await fn()
  } catch (err) {
    logPaymentsError(
      err.message,
      err,
    )

    throw err
  }
}

const getOrCreateStripeCustomer = async (
  user: User,
  db: PrismaClient
): Promise<string> => {
  if (user.stripeCustomerId) {
    return user.stripeCustomerId
  }

  const customer = await stripe.customers.create({
    description: `${user.handle} (${user.id})`,
    email: user.email,
    metadata: {
      journalyUserId: user.id,
      handle: user.handle,
    },
  })

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      stripeCustomerId: customer.id,
    },
  })

  return customer.id
}

export default stripe
export {
  logPaymentsError,
  paymentErrorWrapper,
  getOrCreateStripeCustomer,
}
