import React from 'react'
import { I18nContext } from 'react-i18next'
import { i18n } from '@/config/i18n'

import Select from '@/components/Select'

const uiLanguageOptions = [
  { value: 'en', displayName: 'English' },
  { value: 'de', displayName: 'Deutsch' },
  { value: 'es', displayName: 'Español' },
]

const UILanguageSelect = () => {
  const {
    i18n: { language },
  } = React.useContext(I18nContext)
  return (
    <Select
      options={uiLanguageOptions}
      value={language}
      onChange={(value) => i18n.changeLanguage(value)}
    />
  )
}
export default UILanguageSelect
