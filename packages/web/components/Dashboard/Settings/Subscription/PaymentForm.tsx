import React, { useState } from 'react'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { usePurchaseMembershipSubscriptionMutation,
  MembershipSubscriptionPeriod,
} from '@/generated/graphql'
import Select from '@/components/Select'
import Button from '@/components/Button'
import { useTranslation } from '@/config/i18n'

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const PaymentForm = () => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const stripe = useStripe()
  const elements = useElements()

  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: 'Monthly - £12' },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: '3 Months - £30' },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: '1 Year - £100' },
  ]

  const [selectedOption, setSelectedOption] = useState<MembershipSubscriptionPeriod>(
    MembershipSubscriptionPeriod.Monthly,
  )

  const [purchaseMembershipSubscription, { loading }] = usePurchaseMembershipSubscriptionMutation({
    onCompleted: () => {
      // TODO: bust the cache for the User
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
    <div>
      <Select
        onChange={(value) => {setSelectedOption(value)}}
        options={subscriptionOptions}
        value={selectedOption}
        placeholder="Which subscription would you like?"
      />
      {stripeError && <p>{stripeError.message}</p>}
      <div className="card-field-container">
        <CardElement/>
      </div>
      <Button
        type="submit"
        loading={loading}
        style={{
          marginTop: '15px',
        }}
        onClick={handleSubmitPaymentForm}
      >
        {t('subscription.subscribeCta')}
      </Button>
      <style jsx>{`
        .card-field-container {
          margin: 20px 0;
        }
      `}</style>
    </div>
  )
}

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <PaymentForm />
  </Elements>
)

export default Checkout
