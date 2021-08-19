import React from 'react'
import { I18nContext } from 'react-i18next'

import { UiLanguage as UILanguage } from '@/generated/graphql'

const langCodeToUILangMap: { [key: string]: UILanguage } = {
  en: UILanguage.English,
  de: UILanguage.German,
  es: UILanguage.Spanish,
}

const useUILanguage = () => {
  const {
    i18n: { language },
  } = React.useContext(I18nContext)

  return langCodeToUILangMap[language] || UILanguage.English
}

export default useUILanguage
