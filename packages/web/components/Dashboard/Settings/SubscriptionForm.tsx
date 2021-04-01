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
import { usePurchaseMembershipSubscriptionMutation,
  MembershipSubscriptionPeriod,
  UserWithSubscriptionFragmentFragment as UserType,
} from '@/generated/graphql'
import Select from '@/components/Select'
import parseISO from 'date-fns/parseISO'

type FormValues = {
  period: MembershipSubscriptionPeriod
}

type SubscriptionFormProps = {
  user: UserType
}

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const SubscriptionForm = ({ user }: SubscriptionFormProps) => {
  console.log(user)
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const stripe = useStripe()
  const elements = useElements()
  let subscriptionStatus
  if (!user.membershipSubscription) {
    subscriptionStatus = 'Free user'
  } else if (parseISO(user.membershipSubscription.expiresAt) < new Date()) {
    subscriptionStatus = 'Journaly Premium user'
  } else {
    subscriptionStatus = 'Free user - Premium Membership Expired'
  }

  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: 'Monthly' },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: '3 Months' },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: '1 Year' },
  ]

  const [selectedOption, setSelectedOption] = useState<MembershipSubscriptionPeriod>(MembershipSubscriptionPeriod.Monthly)

  const { handleSubmit, errors, formState } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const [purchaseMembershipSubscription, { loading }] = usePurchaseMembershipSubscriptionMutation({
    onCompleted: () => {
      // TODO: bust the cache for the User
      toast.success(t('subscription.subscribeSuccessMessage'))
    },
    onError: () => {
      toast.error(t('subscription.subscribeFailureMessage'))
    },
  })

  const handleSubscribeSubmit = async () => {
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
          <p>Current subscription status: {subscriptionStatus}</p>
          <Select
            onChange={(value) => {setSelectedOption(value)}}
            options={subscriptionOptions}
            value={selectedOption}
            placeholder="Which subscription would you like?"
          />
          <div style={{
            marginTop: '20px',
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

const Checkout = ({ user }: SubscriptionFormProps) => (
  <Elements stripe={stripeLib}>
    <SubscriptionForm user={user} />
  </Elements>
)

export default Checkout
