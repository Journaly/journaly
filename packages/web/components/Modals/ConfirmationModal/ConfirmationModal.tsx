import React from 'react'
import { useTranslation } from 'next-i18next'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'

type Props = {
  onConfirm: () => void
  onCancel: () => void
  title: string
  body?: string
  show: boolean
}

const ConfirmationModal: React.FC<Props> = ({ title, body, onConfirm, onCancel, show }) => {
  const { t } = useTranslation('common')

  return show ? (
    <Modal
      title={title}
      body={body}
      footer={
        <>
          <Button variant={ButtonVariant.Primary} onClick={onConfirm}>
            {t('modal.confirm')}
          </Button>
          <Button variant={ButtonVariant.Secondary} onClick={onCancel}>
            {t('modal.cancel')}
          </Button>
        </>
      }
      onClose={onCancel}
    />
  ) : null
}

export default ConfirmationModal
