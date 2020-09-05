import React from 'react'
import { I18nContext as ctx } from 'next-i18next'

import { UiLanguage as UILanguage } from '../generated/graphql'

const langCodeToUILangMap = {
  en: UILanguage.English,
  de: UILanguage.German,
}


const useUILanguage = () => {
  const { i18n: { language } } = React.useContext(ctx)

  return langCodeToUILangMap[language] || UILanguage.English
}

export default useUILanguage
