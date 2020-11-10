import React from 'react'
import { useTranslation } from '../../../config/i18n'
import Button, { ButtonVariant } from '../../../elements/Button'
import Modal from '../../Modal'

type Props = {
  onDelete: () => void
  onCancel: () => void
  show: boolean
}

const DeletePostModal: React.FC<Props> = ({ onDelete, onCancel, show }: Props) => {
  const { t } = useTranslation('post')

  const handleDelete = (): void => {
    onDelete()
  }

  const handleClose = (): void => {
    onCancel()
  }

  return show ? (
    <Modal
      title={t('deleteModal.title')}
      footer={
        <>
          <Button variant={ButtonVariant.Destructive} onClick={handleDelete}>
            {t('deleteModal.delete')}
          </Button>
          <Button variant={ButtonVariant.Secondary} onClick={handleClose}>
            {t('deleteModal.cancel')}
          </Button>
        </>
      }
      body={t('deleteModal.body')}
      onClose={handleClose}
    />
  ) : null
}

export default DeletePostModal
