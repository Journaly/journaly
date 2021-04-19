import Stripe from 'stripe'

const stripeConfig = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
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
    })
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

export default stripeConfig
export {
  logPaymentsError,
  paymentErrorWrapper 
}
