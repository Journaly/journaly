import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from '@/components/Button'
import FormError from '@/components/FormError'
import { useTranslation } from '@/config/i18n'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import nProgress from 'nprogress'

type FormValues = {
  type: UserSubscriptionType
  price: number
}

const stripeLib = loadStripe(process.env.STRIPE_PUBLIC_KEY!)

const SubscriptionForm: React.FC = () => {
  const { t } = useTranslation('settings.subscription')
  const [customError, setCustomError] = useState()
  const [customLoading, setCustomLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const { handleSubmit, register, getValues, errors } = useForm<FormValues>({
    mode: 'onSubmit',
  })

  const [createUserSubscription, { loading }] = useCreateUserSubscriptionMutation({
    onCompleted: () => {
      toast.success('subscribeSuccessMessage')
    },
    onError: () => {
      toast.error(t('subscribeFailureMessage'))
    },
  })

  const handleSubscribeSubmit = async (data: FormValues) => {
    setCustomLoading(true)
    nProgress.start()
    // 3. Create payment method via stripe
    // Token comes back here if successful
    if (elements) {
      const { error, paymentMethod } = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })
      // 4. Handle any errors from sttipe
      if (error) {
        setCustomError(error)
      }
    }
    // 5. Send token from #3 to serverside logic
    // 6. Change the page to view the order?
    // 7. Turn loader off
    setCustomLoading(false)
    if (!loading && Object.keys(errors).length === 0) {
      createUserSubscription({
        variables: {
          type: data.type,
          price: data.price,
        },
      })
    }
    nProgress.done()
  }

  return (
    <SettingsForm
      onSubmit={handleSubmit(handleSubscribeSubmit)}
      errorInputName={Object.keys(errors)[0] || ''}
    >
      {(customError || errorInput) && <FormError error={customError.message || errorInput.message as string}/>}
      <SettingsFieldset legend={t('legend')}>
        <CardElement />
        <Button
          type="submit"
          loading={loading}
        >{t('subscribeCta')}</Button>
      </SettingsFieldset>
    </SettingsForm>
  )
}

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <SubscriptionForm />
  </Elements>
)

export default Checkout
