import React, { useState } from 'react'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  usePurchaseMembershipSubscriptionMutation,
  MembershipSubscriptionPeriod,
} from '@/generated/graphql'
import Button from '@/components/Button'
import SubscriptionPlanSelect from './SubscriptionPlanSelect'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

type PaymentFormProps = {
  onSuccess?: () => void
}

const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const stripe = useStripe()
  const elements = useElements()
  const [selectedOption, setSelectedOption] = useState<MembershipSubscriptionPeriod>(
    MembershipSubscriptionPeriod.Monthly,
  )

  const [purchaseMembershipSubscription, { loading }] = usePurchaseMembershipSubscriptionMutation({
    onCompleted: () => {
      // TODO: bust the cache for the User
      onSuccess && onSuccess()
      toast.success(t('subscription.subscribeSuccessMessage'))
    },
    onError: () => {
      toast.error(t('subscription.subscribeFailureMessage'))
    },
  })

  const handleSubmitPaymentForm = async () => {
    nProgress.start()
    // 1. Create payment method via stripe
    //    Token comes back here if successful
    if (elements && stripe) {
      const card = elements.getElement(CardElement)

      if (!card) {
        // TODO: figure out actual user messages
        throw new Error("Card element not found")
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })
      if (error) {
        setStripeError(error)
        nProgress.done()
        return
      }
  
      if (!loading && !stripeError && paymentMethod) {
        purchaseMembershipSubscription({
          variables: {
            period: selectedOption,
            token: paymentMethod.id,
          },
        })
      }
    }
    nProgress.done()
  }

  return (
    <Elements stripe={stripeLib}>
      <form onSubmit={handleSubmitPaymentForm} className="payments-form">
        <SubscriptionPlanSelect
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        {stripeError && <p>{stripeError.message}</p>}
        <div className="card-field-container">
          <CardElement/>
        </div>
        <Button
          type="submit"
          loading={loading}
        >
          {t('subscription.subscribeCta')}
        </Button>
        <style jsx>{`
          .card-field-container {
            margin: 20px 0;
            border: 1px solid ${theme.colors.gray300};
            padding: 10px;
            border-radius: 5px;
          }

          .payments-form :global(button) {
            margin-top: 15px;
          }
        `}</style>
      </form>
    </Elements>
  )
}

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <PaymentForm />
  </Elements>
)

export default Checkout
