import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Button, { ButtonVariant } from '@/components/Button'
import { useConfirmationModal } from '@/components/Modals/ConfirmationModal'
import { useTranslation } from 'next-i18next'
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
import FeatureComparisonTable from '@/components/FeatureComparisonTable'

type SubscriptionFormProps = {
  user: UserType
  onSuccess: () => void
}

const SubscriptionForm = ({ user, onSuccess }: SubscriptionFormProps) => {
  const { t } = useTranslation('settings')

  let subscriptionPlan: string | undefined
  const convertSubscriptionPeriodToPrice = (subscriptionPlan: MembershipSubscriptionPeriod) => {
    switch (subscriptionPlan) {
      case MembershipSubscriptionPeriod.Monthly:
        return t('subscription.monthlyPrice')
      case MembershipSubscriptionPeriod.Annualy:
        return t('subscription.annualPrice')
      case MembershipSubscriptionPeriod.StudentAnnually:
        return t('subscription.studentPrice')
    }
  }
  if (user.membershipSubscription) {
    subscriptionPlan = convertSubscriptionPeriodToPrice(user.membershipSubscription.period)
  }

  const isCancelling = user.membershipSubscription?.cancelAtPeriodEnd
  const [showPaymentForm, setShowPaymentForm] = useState(!user.membershipSubscription?.isActive)
  const [showPaymentFormModal, setShowPaymentFormModal] = useState(false)

  const [updateSubscriptionRenewal] = useUpdateSubscriptionRenewalMutation({
    onCompleted: () => {
      onSuccess()
      toast.success(t('subscription.cancellationSuccess'))
    },
    onError: () => {
      toast.error(t('subscription.cancellationError'))
    },
  })

  const [CancelSubscriptionConfirmationModal, confirmCancellation] = useConfirmationModal({
    title: t('subscription.cancelSubscriptionConfirmationTitle'),
    body: t('subscription.cancelSubscriptionConfirmationBody'),
  })

  const handleCancelSubscription = async () => {
    if (!(await confirmCancellation())) return

    updateSubscriptionRenewal({
      variables: {
        cancelAtPeriodEnd: true,
      },
    })
  }

  const SubscriptionStatusBadge = () => {
    return (
      <>
        <span className="badge">
          {t(`subscription.${user.membershipSubscription?.isActive ? 'premiumUser' : 'freeUser'}`)}
        </span>
        <style jsx>{`
          .badge {
            padding: 10px;
            border-radius: 5px;
            text-transform: uppercase;
            font-size: ${theme.typography.paragraphSM}
            font-weight: 600;
            background-color: ${
              !user.membershipSubscription?.isActive
                ? theme.colors.gray100
                : theme.colors.greenLight
            };
            color: ${
              !user.membershipSubscription?.isActive ? theme.colors.gray600 : theme.colors.greenDark
            };
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      {showPaymentFormModal && (
        <PaymentFormModal
          onClose={() => setShowPaymentFormModal(false)}
          onSuccess={onSuccess}
          isStudent={user.isStudent}
          emailAddressVerified={user.emailAddressVerified}
        />
      )}
      <div className="page-container">
        <h1>{t('subscription.title')}</h1>
        <p className="subscription-copy" style={{ marginBottom: '20px' }}>
          {t('subscription.premiumGeneralCopy')}
        </p>
        <div className="feature-table-container">
          <FeatureComparisonTable />
        </div>
        <p className="subscription-copy" style={{ marginBottom: '20px' }}>
          {t('subscription.premiumFeatureCopy')}
        </p>
        <p className="subscription-status">
          <strong>{t('subscription.subscriptionStatus')}</strong> <SubscriptionStatusBadge />
        </p>
        {user.membershipSubscription?.isActive && (
          <div className="plan-details-container">
            <p>
              <strong>{t('subscription.currentPlan')}</strong> {subscriptionPlan}
            </p>
            {user.lastFourCardNumbers && (
              <CardOnFile last4={user.lastFourCardNumbers} onSuccess={onSuccess} />
            )}
            {isCancelling ? (
              <>
                <p>
                  {t('subscription.subscriptionEndsOn')}
                  <strong style={{ color: theme.colors.red }}>
                    {' '}
                    {formatLongDate(user?.membershipSubscription?.expiresAt)}
                  </strong>
                </p>
                <Button
                  variant={ButtonVariant.Link}
                  onClick={() => {
                    updateSubscriptionRenewal({
                      variables: {
                        cancelAtPeriodEnd: false,
                      },
                    })
                  }}
                >
                  {t('subscription.reactivateSubscription')}
                </Button>
              </>
            ) : (
              <>
                <p className="subscription-copy">
                  <strong>{t('subscription.nextBillingDate')}</strong>{' '}
                  {t('subscription.subscriptionRenewsOn')}
                  <strong> {formatLongDate(user?.membershipSubscription?.expiresAt)}</strong>
                </p>
              </>
            )}
          </div>
        )}
        {showPaymentForm && (
          <PaymentForm
            onSuccess={onSuccess}
            isStudent={user.isStudent}
            emailAddressVerified={user.emailAddressVerified}
          />
        )}
        {user.membershipSubscription?.isActive &&
          !user?.membershipSubscription?.cancelAtPeriodEnd &&
          !showPaymentForm && (
            <div className="current-plan-actions">
              <Button
                onClick={() => {
                  setShowPaymentForm(true)
                }}
                variant={ButtonVariant.Link}
              >
                {t('subscription.changePlan')}
              </Button>
              <Button
                onClick={handleCancelSubscription}
                variant={ButtonVariant.Link}
                style={{
                  color: theme.colors.red,
                  marginLeft: '10px',
                }}
              >
                {t('subscription.cancelSubscription')}
              </Button>
            </div>
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

        h1 {
          text-align: center;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 20px;
        }

        .membership-renewal-info-container {
          display: flex;
          flex-direction: column;
        }

        .subscription-copy {
          margin-bottom: 20px;
          text-align: center;
        }

        .subscription-status {
          margin-bottom: 15px;
          text-align: center;
        }

        .feature-table-container {
          display: flex;
          justify-content: center;
          margin: 35px 0;
        }
        .current-plan-actions {
          display: flex;
          justify-content: center;
        }
        .plan-details-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default SubscriptionForm
