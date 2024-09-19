import { NextPageContext } from 'next'
import { langCodeToUILangMap } from '@/hooks/useUILanguage'
import { UiLanguage } from '@/generated/graphql'
import i18nConfig from 'next-i18next'

export const getUiLanguage = (ctx: NextPageContext): UiLanguage => {
  let langCode
  if (ctx.req) {
    const i18n = ctx.req.i18n
    if (!i18n) {
      langCode = 'en'
    } else {
      const { allLanguages, defaultLanguage, fallbackLng } = i18n.options
      const fallback = fallbackLng || defaultLanguage

      if (!i18n.languages) {
        langCode = typeof fallback === 'string' ? fallback : null
      } else {
        langCode = i18n.languages.find((lang: string) => allLanguages.includes(lang)) || fallback
      }
    }
  } else {
    langCode = i18nConfig?.i18n?.language
  }

  return langCodeToUILangMap[langCode] || UiLanguage.English
}
