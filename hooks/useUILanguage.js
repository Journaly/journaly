import React from 'react'
import { I18nContext } from 'next-i18next'

import { UiLanguage as UILanguage } from '../generated/graphql'

const langCodeToUILangMap = {
  en: UILanguage.English,
  de: UILanguage.German,
}


const useUILanguage = () => {
  const { i18n: { language } } = React.useContext(I18nContext)

  return langCodeToUILangMap[language] || 'en'
}

export default useUILanguage
