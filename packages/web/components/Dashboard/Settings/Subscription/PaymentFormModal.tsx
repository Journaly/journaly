import React from 'react'
import Modal from '@/components/Modal'
import PaymentForm from './PaymentForm'
import { useTranslation } from '@/config/i18n'

type PaymentFormModalProps = {
  onClose: () => void
  onSuccess: () => void
  isStudent: boolean
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({ onClose, onSuccess, isStudent }) => {
  const { t } = useTranslation('settings')
  return (
    <Modal
      title={t('subscription.paymentInfo')}
      body={
        <div>
          <PaymentForm onSuccess={onSuccess} isStudent={isStudent} />
          <style jsx>{`
            div {
              width: 80vw;
              max-width: 435px;
            }
          `}</style>
        </div>
      }
      onClose={onClose}
    />
  )
}

export default PaymentFormModal
