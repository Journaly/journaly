import React, { useCallback } from 'react'
import { I18nContext, useTranslation, i18n } from 'next-i18next'

import Select from '@/components/Select'

const uiLanguageOptions = [
  { value: 'en', displayName: 'English' },
  { value: 'de', displayName: 'Deutsch' },
  { value: 'es', displayName: 'Español' },
  { value: 'zh_CN', displayName: '中文 (Simplified)' },
  { value: 'zh_TW', displayName: '中文 (Traditional)' },
  { value: 'it', displayName: 'Italiano' },
  { value: 'pt_BR', displayName: 'Português Brasileiro' },
]

const UILanguageSelect = () => {
  const { t } = useTranslation('settings')
  const {
    i18n: { language },
  } = React.useContext(I18nContext)

  const handleChangeLanguage = useCallback((lang: string) => {
    document.cookie = `j-lang=${lang};path=/`
    document.location.reload()
  }, [])

  return (
    <Select
      placeholder={t('profile.uiLanguage.placeholder')}
      options={uiLanguageOptions}
      value={language}
      onChange={handleChangeLanguage}
    />
  )
}
export default UILanguageSelect
