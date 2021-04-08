import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Button, { ButtonVariant } from '@/components/Button'
import { useConfirmationModal } from '@/components/Modals/ConfirmationModal'
import { useTranslation } from '@/config/i18n'
import {
  MembershipSubscriptionPeriod,
  UserWithSubscriptionFragmentFragment as UserType,
  useUpdateSubscriptionRenewalMutation,
} from '@/generated/graphql'
import theme from '@/theme'
import { formatLongDate } from '@/utils'
import CardOnFile from './CardOnFile'
import PaymentForm from './PaymentForm'
import PaymentFormModal from './PaymentFormModal'

type SubscriptionFormProps = {
  user: UserType
}

const SubscriptionForm = ({ user }: SubscriptionFormProps) => {
  const { t } = useTranslation('settings')
  let subscriptionPlan: string | undefined
  // (period) => string
  if (user?.membershipSubscription?.period === MembershipSubscriptionPeriod.Monthly) {
    subscriptionPlan = '1 Month / £12'
  } else if (user?.membershipSubscription?.period === MembershipSubscriptionPeriod.Quarterly) {
    subscriptionPlan = '3 Months / £30'
  } else if (user?.membershipSubscription?.period === MembershipSubscriptionPeriod.Annualy) {
    subscriptionPlan = '1 Year / £100'
  }
  const isCancelling = user.membershipSubscription?.cancelAtPeriodEnd
  const [showPaymentForm, setShowPaymentForm] = useState(!user.isPremiumUser)
  const [showPaymentFormModal, setShowPaymentFormModal] = useState(false)

  const [updateSubscriptionRenewal] = useUpdateSubscriptionRenewalMutation({
    onCompleted: () => {
      // TODO: bust the cache for the User
      toast.success(t('You have cancelled your subscription'))
    },
    onError: () => {
      toast.error(t('There was a problem cancelling your subscription'))
    },
  })

  const [CancelSubscriptionConfirmationModal, confirmCancellation] = useConfirmationModal({
    title: 'Cancel Your Journaly Premium Subscription',
    body: 'Are you sure you want to cancel your subscription?'
  })

  const handleCancelSubscription = async () => {
    if (!(await confirmCancellation())) return
    
    updateSubscriptionRenewal({
      variables: {
        cancelAtPeriodEnd: true,
      }
    })
  }

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
      {showPaymentFormModal && (
        <PaymentFormModal onClose={() => setShowPaymentFormModal(false)} />
      )}
      <div className="page-container">
        <p style={{ marginBottom: '20px' }}>{t('subscription.copy')}</p>
        <p style={{ marginBottom: '10px' }}><strong>Subscription status:</strong> <SubscriptionStatusBadge /></p>
        {user.isPremiumUser && (
          <>
            <p><strong>Current Plan:</strong> {subscriptionPlan}</p>
            {user.membershipSubscription?.lastFourCardNumbers && (
              <CardOnFile last4="1234" onUpdateCard={() => {}} />
            )}
            {isCancelling ? (
              <>
                <p>Your subscription will end on <strong style={{ color: theme.colors.red }}>{formatLongDate(user?.membershipSubscription?.expiresAt)}</strong></p>
                {/* Add mutation for this */}
                <Button
                  variant={ButtonVariant.Link}
                  onClick={() => {
                  updateSubscriptionRenewal({
                    variables: {
                      cancelAtPeriodEnd: false,
                    }
                  })
              }}>Reactivate subscription</Button>
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
        {!user?.membershipSubscription?.cancelAtPeriodEnd && !showPaymentForm && (
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
              onClick={handleCancelSubscription}
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
      </div>
      <CancelSubscriptionConfirmationModal />
      <style jsx>{`
        .page-container {
          width: 100%;
          padding: 25px;
          background-color: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }

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
