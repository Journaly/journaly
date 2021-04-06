import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import nProgress from 'nprogress'
import Button, { ButtonVariant } from '@/components/Button'
import FormError from '@/components/FormError'
import { useTranslation } from '@/config/i18n'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import { usePurchaseMembershipSubscriptionMutation,
  MembershipSubscriptionPeriod,
  UserWithSubscriptionFragmentFragment as UserType,
  useCancelMembershipSubscriptionMutation,
} from '@/generated/graphql'
import Select from '@/components/Select'
import theme from '@/theme'
import { formatLongDate } from '@/utils'

type FormValues = {
  period: MembershipSubscriptionPeriod
}

type SubscriptionFormProps = {
  user: UserType
}

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const SubscriptionForm = ({ user }: SubscriptionFormProps) => {
  const { t } = useTranslation('settings')
  const [stripeError, setStripeError] = useState<StripeError>()
  const stripe = useStripe()
  const elements = useElements()
  let subscriptionPlan: string | undefined
  // (period) => string
  if (user?.membershipSubscription?.period === MembershipSubscriptionPeriod.Monthly) {
    subscriptionPlan = '1 Month - £12'
  } else if (user?.membershipSubscription?.period === MembershipSubscriptionPeriod.Quarterly) {
    subscriptionPlan = '3 Months - £30'
  } else if (user?.membershipSubscription?.period === MembershipSubscriptionPeriod.Annualy) {
    subscriptionPlan = '1 Year - £100'
  }
  const isCancelling = user.membershipSubscription?.cancelAtPeriodEnd
  const [showPaymentForm, setShowPaymentForm] = useState(!user.isPremiumUser)

  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: 'Monthly - £12' },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: '3 Months - £30' },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: '1 Year - £100' },
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

  const [cancelMembershipSubscription] = useCancelMembershipSubscriptionMutation({
    onCompleted: () => {
      // TODO: bust the cache for the User
      toast.success(t('You have cancelled your subscription'))
    },
    onError: () => {
      toast.error(t('There was a problem cancelling your subscription'))
    },
  })

  const SubscriptionStatusBadge = () => {
    return (
      <>
        <span className="badge">
          {user.isPremiumUser ? 'premium user' : 'free user'}
        </span>
        <style jsx>{`
          .badge {
            padding: 10px;
            border-radius: 5px;
            text-transform: uppercase;
            font-size: ${theme.typography.paragraphSM}
            font-weight: 600;
            background-color: ${!user.isPremiumUser ? theme.colors.gray100 : theme.colors.greenLight};
            color: ${!user.isPremiumUser ? theme.colors.gray600 : theme.colors.greenDark};
          }
        `}</style>
      </>
    )
  }

  const errorInput = Object.values(errors)[0]
  return (
    <>
      <SettingsForm
        onSubmit={handleSubmit(handleSubscribeSubmit)}
        errorInputName={Object.keys(errors)[0] || ''}
      >
        {(stripeError || errorInput) && <FormError error={stripeError?.message || errorInput?.message as string}/>}
        <p style={{ marginBottom: '20px' }}>{t('subscription.copy')}</p>
        <p style={{ marginBottom: '20px' }}><strong>Subscription status:</strong> <SubscriptionStatusBadge /></p>
        {user.isPremiumUser && (
          <>
            <p style={{ marginBottom: '20px' }}><strong>Current Plan:</strong> {subscriptionPlan}</p>
            {isCancelling ? (
              <>
                <p style={{ marginBottom: '20px' }}>Your subscription will end on <strong style={{ color: theme.colors.red }}>{formatLongDate(user?.membershipSubscription?.expiresAt)}</strong></p>
                {/* Add mutation for this */}
                <Button variant={ButtonVariant.Link}>Reactivate subscription</Button>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '20px' }}><strong>Next billing date:</strong> Your subscription will renew on <strong>{formatLongDate(user?.membershipSubscription?.expiresAt)}</strong></p>
              </>
            )}
          </>
        )}
        {showPaymentForm && (
          <SettingsFieldset legend=''>
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
        )}
        {!user?.membershipSubscription?.cancelAtPeriodEnd && (
          <>
            <Button
              onClick={() => {
                setShowPaymentForm(true)
              }}
              variant={ButtonVariant.Link}
            >
              Change Plan
            </Button>
            <Button
              onClick={() => {
                cancelMembershipSubscription()
              }}
              variant={ButtonVariant.Link}
              style={{
                color: theme.colors.red,
                marginLeft: '10px',
              }}
            >
              Cancel Subscription
            </Button>
          </>
        )}
      </SettingsForm>
      <style jsx>{`
        .membership-renewal-info-container {
          display: flex;
          flex-direction: column;
        }
        :global(fieldset > legend) {
          display: none;
        }
      `}</style>
    </>
  )
}

const Checkout = ({ user }: SubscriptionFormProps) => (
  <Elements stripe={stripeLib}>
    <SubscriptionForm user={user} />
  </Elements>
)

export default Checkout
