import React from 'react'
import Modal from '@/components/Modal'
import UpdateCardForm from './UpdateCardForm'
import { useTranslation } from 'next-i18next'

type UpdateCardFormModalProps = {
  onClose: () => void
  onSuccess: () => void
}

const UpdateCardFormModal: React.FC<UpdateCardFormModalProps> = ({ onClose, onSuccess }) => {
  const { t } = useTranslation('settings')
  return (
    <Modal
      title={t('subscription.paymentInfo')}
      body={
        <div>
          <UpdateCardForm onSuccess={onSuccess} />
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

export default UpdateCardFormModal
