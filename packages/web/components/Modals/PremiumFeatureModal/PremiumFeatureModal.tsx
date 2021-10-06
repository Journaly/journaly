import React from 'react'
import { useTranslation } from '@/config/i18n'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'

type Props = {
  onAcknowledge: () => void
  onGoToPremium: () => void
  featureName?: string
  featureExplanation?: string
  show: boolean
}

const PremiumFeatureModal: React.FC<Props> = ({
  show,
  featureName,
  featureExplanation,
  onAcknowledge,
  onGoToPremium,
}) => {
  const { t } = useTranslation('common')

  return show ? (
    <Modal
      title="Premium Feature"
      body={`${featureName ? featureName : 'This'} ${
        featureExplanation ? featureExplanation : t('modal.generalPremiumFeatureExplanation')
      }`}
      footer={
        <>
          <Button variant={ButtonVariant.Primary} onClick={onAcknowledge}>
            {t('modal.acknowledge')}
          </Button>
          <Button variant={ButtonVariant.Primary} onClick={onGoToPremium}>
            {t('modal.goToPremium')}
          </Button>
        </>
      }
      onClose={onAcknowledge}
    />
  ) : null
}

export default PremiumFeatureModal
