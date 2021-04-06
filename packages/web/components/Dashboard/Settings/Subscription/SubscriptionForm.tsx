import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Button, { ButtonVariant } from '@/components/Button'
import { useTranslation } from '@/config/i18n'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import {
  MembershipSubscriptionPeriod,
  UserWithSubscriptionFragmentFragment as UserType,
  useCancelMembershipSubscriptionMutation,
} from '@/generated/graphql'
import theme from '@/theme'
import { formatLongDate } from '@/utils'
import PaymentForm from './PaymentForm'

type SubscriptionFormProps = {
  user: UserType
}

const SubscriptionForm = ({ user }: SubscriptionFormProps) => {
  const { t } = useTranslation('settings')
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

  return (
    <>
      <SettingsForm
        onSubmit={() => {}}
        errorInputName={''}
      >
        <p style={{ marginBottom: '20px' }}>{t('subscription.copy')}</p>
        <p style={{ marginBottom: '20px' }}><strong>Subscription status:</strong> <SubscriptionStatusBadge /></p>
        {user.isPremiumUser && (
          <>
            <p style={{ marginBottom: '20px' }}><strong>Current Plan:</strong> {subscriptionPlan}</p>
            {isCancelling ? (
              <>
                <p>Your subscription will end on <strong style={{ color: theme.colors.red }}>{formatLongDate(user?.membershipSubscription?.expiresAt)}</strong></p>
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
          <PaymentForm />
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

export default SubscriptionForm
