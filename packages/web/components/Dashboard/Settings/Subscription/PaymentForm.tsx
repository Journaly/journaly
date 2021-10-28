import React, { useState, useMemo } from 'react'
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

type PaymentFormProps = {
  onSuccess: () => void
  isStudent: boolean
  emailAddressVerified: boolean
}

const PaymentForm = ({ onSuccess, isStudent, emailAddressVerified }: PaymentFormProps) => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const [resolverError, setResolverError] = useState<string>()
  const stripe = useStripe()
  const elements = useElements()
  const [selectedOption, setSelectedOption] = useState<MembershipSubscriptionPeriod>(
    MembershipSubscriptionPeriod.Monthly,
  )

  const [purchaseMembershipSubscription, { loading }] = usePurchaseMembershipSubscriptionMutation({
    onCompleted: () => {
      onSuccess()
      toast.success(t('subscription.subscribeSuccessMessage'))
    },
    onError: (error) => {
      setResolverError(error.message)
      toast.error(t('subscription.subscribeFailureMessage'))
    },
  })

  const handleSubmitPaymentForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    nProgress.start()
    // 1. Create payment method via stripe
    //    Token comes back here if successful
    if (elements && stripe) {
      const card = elements.getElement(CardElement)

      if (!card) {
        throw new Error('Card element not found')
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })

      if (error) {
        setStripeError(error)
        nProgress.done()
        return
      } else {
        setStripeError(undefined)
      }

      if (!loading && paymentMethod) {
        await purchaseMembershipSubscription({
          variables: {
            period: selectedOption,
            paymentMethodId: paymentMethod.id,
          },
        })
        card.clear()
      }
    }
    nProgress.done()
  }

  const isStudentPendingEmailAddressVerification =
    selectedOption === MembershipSubscriptionPeriod.StudentAnnually && !emailAddressVerified

  return (
    <form onSubmit={handleSubmitPaymentForm} className="payments-form">
      <SubscriptionPlanSelect
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isStudent={isStudent}
      />
      {isStudentPendingEmailAddressVerification && (
        <p className="error">{t('subscription.studentEmailVerificationNeededMsg')}</p>
      )}
      {stripeError && <p className="error">{stripeError.message}</p>}
      {resolverError && <p className="error">{resolverError}</p>}
      <div className="card-field-container">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                fontWeight: 'lighter',
              },
            },
          }}
        />
      </div>
      <Button type="submit" loading={loading} disabled={isStudentPendingEmailAddressVerification}>
        {t('subscription.subscribeCta')}
      </Button>
      <style jsx>{`
        .card-field-container {
          margin: 20px 0;
          border: 1px solid ${theme.colors.gray700};
          padding: 14px;
          border-radius: 5px;
        }

        .error {
          color: ${theme.colors.red};
          margin-top: 20px;
        }

        .payments-form :global(button) {
          margin-top: 15px;
        }
      `}</style>
    </form>
  )
}

const Checkout = (props: PaymentFormProps) => {
  const stripeLib = useMemo(() => {
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)
  }, [])
  
  return (
    <Elements stripe={stripeLib}>
      <PaymentForm {...props} />
    </Elements>
  )
}

export default Checkout
