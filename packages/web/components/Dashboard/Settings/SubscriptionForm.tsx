import React from 'react'
import Button from '@/components/Button'
import { useTranslation } from '@/config/i18n'

const SubscriptionForm = () => {
  const { t } = useTranslation('settings.subscription')

  const handleSubscribe = () => {}

  return (
    <div>
      <Button>{t('subscribeCta')}</Button>
    </div>
  )
}

export default SubscriptionForm
