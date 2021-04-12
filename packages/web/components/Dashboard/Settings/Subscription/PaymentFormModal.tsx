import React from 'react'
import Modal from '@/components/Modal'
import PaymentForm from './PaymentForm'

type PaymentFormModalProps = {
  onClose: () => void
  onSuccess: () => void
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({ onClose, onSuccess }) => {
  return (
    <Modal
      title="Payment Info"
      body={
        <div>
          <PaymentForm onSuccess={onSuccess} />
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
