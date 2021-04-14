import React, { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  usePurchaseMembershipSubscriptionMutation,
  useUpdateSubscriptionPaymentMethodMutation,
  MembershipSubscriptionPeriod,
} from '@/generated/graphql'
import Button from '@/components/Button'
import SubscriptionPlanSelect from './SubscriptionPlanSelect'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

type PaymentFormProps = {
  onSuccess: () => void
  isUpdatingCard?: boolean
}

const PaymentForm = ({ onSuccess, isUpdatingCard = false }: PaymentFormProps) => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
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
    onError: () => {
      toast.error(t('subscription.subscribeFailureMessage'))
    },
  })

  const [updatePaymentMethod] = useUpdateSubscriptionPaymentMethodMutation({
    onCompleted: () => {
      onSuccess()
      toast.success(t('subscription.updateCardSuccess'))
    },
    onError: () => {
      toast.error(t('subscription.updateCardError'))
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
  
      if (isUpdatingCard) {
        if (!loading && !stripeError && paymentMethod) {
          updatePaymentMethod({
            variables: {
              paymentMethodId: paymentMethod.id,
            }
          })
        }
      } else {
        if (!loading && !stripeError && paymentMethod) {
          purchaseMembershipSubscription({
            variables: {
              period: selectedOption,
              paymentMethodId: paymentMethod.id,
            },
          })
        }
      }
    }
    nProgress.done()
  }

  return (
    <form onSubmit={handleSubmitPaymentForm} className="payments-form">
      <SubscriptionPlanSelect
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {stripeError && <p className="error">{stripeError.message}</p>}
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
      <Button
        type="submit"
        loading={loading}
      >
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
