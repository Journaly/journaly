import React from 'react'
import { I18nContext } from 'react-i18next'
import { useTranslation, i18n } from '@/config/i18n'

import Select from '@/components/Select'

const uiLanguageOptions = [
  { value: 'en', displayName: 'English' },
  { value: 'de', displayName: 'Deutsch' },
  { value: 'es', displayName: 'Español' },
]

const UILanguageSelect = () => {
  const { t } = useTranslation('settings')
  const {
    i18n: { language },
  } = React.useContext(I18nContext)
  return (
    <Select
      placeholder={t('profile.uiLanguage.placeholder')}
      options={uiLanguageOptions}
      value={language}
      onChange={(value) => i18n.changeLanguage(value)}
    />
  )
}
export default UILanguageSelect
