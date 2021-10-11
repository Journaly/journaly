import React from 'react'
import { useTranslation } from '@/config/i18n'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'

type Props = {
  onAcknowledge: () => void
  onGoToPremium: () => void
  featureName?: string
  featureExplanation?: string
}

const PremiumFeatureModal: React.FC<Props> = ({
  featureName,
  featureExplanation,
  onAcknowledge,
  onGoToPremium,
}) => {
  const { t } = useTranslation('common')

  return (
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
  )
}

export default PremiumFeatureModal
