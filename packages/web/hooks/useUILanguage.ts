import React from 'react'
import { useRouter } from 'next/router'

import { UiLanguage as UILanguage } from '@/generated/graphql'

const langCodeToUILangMap: { [key: string]: UILanguage } = {
  en: UILanguage.English,
  de: UILanguage.German,
}


const useUILanguage = () => {
  const language = useRouter().locale
  return langCodeToUILangMap[language] || UILanguage.English
}

export default useUILanguage
