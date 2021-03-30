import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import nProgress from 'nprogress'
import Button from '@/components/Button'
import FormError from '@/components/FormError'
import { useTranslation } from '@/config/i18n'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import { useCreateMembershipSubscriptionMutation, MembershipSubscriptionPeriod } from '@/generated/graphql'
import Select from '@/components/Select'
// import { Option } from '@/components/Select/Select'

type FormValues = {
  period: MembershipSubscriptionPeriod
}

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const SubscriptionForm = () => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const stripe = useStripe()
  const elements = useElements()

  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: 'Monthly' },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: '3 Months' },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: '1 Year' },
  ]

  const [selectedOption, setSelectedOption] = useState(subscriptionOptions[0].displayName)

  const { handleSubmit, errors, formState } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const [createUserSubscription, { loading }] = useCreateMembershipSubscriptionMutation({
    onCompleted: () => {
      // TODO: bust the cache for the User
      toast.success(t('subscription.subscribeSuccessMessage'))
    },
    onError: () => {
      toast.error(t('subscription.subscribeFailureMessage'))
    },
  })

  const handleSubscribeSubmit = async (data: FormValues) => {
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
      console.log(paymentMethod)
      if (error) {
        setStripeError(error)
        nProgress.done()
        return
      }
  
      if (!loading && Object.keys(errors).length === 0 && paymentMethod) {
        createUserSubscription({
          variables: {
            // TODO: refactor to data.type
            period: MembershipSubscriptionPeriod.Monthly,
            token: paymentMethod.id,
          },
        })
      }
    }
    nProgress.done()
  }

  const errorInput = Object.values(errors)[0]

  return (
    <>
      <SettingsForm
        onSubmit={handleSubmit(handleSubscribeSubmit)}
        errorInputName={Object.keys(errors)[0] || ''}
      >
        {(stripeError || errorInput) && <FormError error={stripeError?.message || errorInput?.message as string}/>}
        <SettingsFieldset legend={t('subscription.legend')}>
          <p style={{ marginBottom: '20px' }}>{t('subscription.copy')}</p>
          <Select
            onChange={(value) => {setSelectedOption(value)}}
            options={subscriptionOptions}
            value={selectedOption.displayName}
            placeholder="Which subscription would you like?"
          />
          <div style={{
            marginBottom: '20px',
          }}>
            <CardElement/>
          </div>
          <Button
            type="submit"
            loading={loading || formState.isSubmitting}
            style={{
              marginTop: '15px',
            }}
          >{t('subscription.subscribeCta')}</Button>
        </SettingsFieldset>
      </SettingsForm>
    </>
  )
}

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <SubscriptionForm />
  </Elements>
)

export default Checkout
