import React from 'react'
import { I18nContext } from 'react-i18next'

import { UiLanguage as UILanguage } from '@/generated/graphql'

export const langCodeToUILangMap: { [key: string]: UILanguage } = {
  en: UILanguage.English,
  de: UILanguage.German,
  es: UILanguage.Spanish,
  zh_CN: UILanguage.ChineseSimplified,
  zh_TW: UILanguage.ChineseTraditional,
  it: UILanguage.Italian,
  pt_BR: UILanguage.PortugueseBrazilian,
}

const useUILanguage = () => {
  const { i18n: { language } } = React.useContext(I18nContext)

  return langCodeToUILangMap[language] || UILanguage.English
}

export default useUILanguage
