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

const ConfirmationModal: React.FC<Props> = (props) => {
  const { t } = useTranslation('common')

  return props.show ? (
    <Modal
      title={props.title}
      body={props.body}
      footer={
        <>
          <Button variant={ButtonVariant.Primary} onClick={props.onConfirm}>
            {t('modal.confirm')}
          </Button>
          <Button variant={ButtonVariant.Secondary} onClick={props.onCancel}>
            {t('modal.cancel')}
          </Button>
        </>
      }
      onClose={props.onCancel}
    />
  ) : null
}

export default ConfirmationModal
