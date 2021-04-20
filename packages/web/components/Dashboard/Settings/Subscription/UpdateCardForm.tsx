import React, { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  useUpdateSubscriptionPaymentMethodMutation,
} from '@/generated/graphql'
import Button from '@/components/Button'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

type UpdateCardFormProps = {
  onSuccess: () => void
}

const UpdateCardForm = ({ onSuccess }: UpdateCardFormProps) => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const [resolverError, setResolverError] = useState<string>()
  const stripe = useStripe()
  const elements = useElements()

  const [updatePaymentMethod, { loading }] = useUpdateSubscriptionPaymentMethodMutation({
    onCompleted: () => {
      onSuccess()
      toast.success(t('subscription.updateCardSuccess'))
    },
    onError: (error) => {
      setResolverError(error.message)
      toast.error(t('subscription.updateCardError'))
    },
  })

  const handleSubmitUpdateCardForm = async (event: React.FormEvent<HTMLFormElement>) => {
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
  
      if (!loading && !stripeError && paymentMethod) {
        updatePaymentMethod({
          variables: {
            paymentMethodId: paymentMethod.id,
          }
        })
      }
      // TODO: Ideally this should happen only after the resolver gives a successful response
      card.clear()
    }
    nProgress.done()
  }

  return (
    <form onSubmit={handleSubmitUpdateCardForm} className="payments-form">
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

const Checkout = (props: UpdateCardFormProps) => {
  const stripeLib = useMemo(() => {
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)
  }, [])
  
  return (
    <Elements stripe={stripeLib}>
      <UpdateCardForm {...props} />
    </Elements>
  )
}

export default Checkout
