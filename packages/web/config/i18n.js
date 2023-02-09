const path = require('path')
const NextI18Next = require('next-i18next').default

// Hack because of vercel funkiness with loading files of the FS
const getLocalePath = () =>
  (typeof window === 'undefined' && process.env.NODE_ENV === 'production')
    ? path.resolve(process.cwd(), '.next/server/chunks/public/static/locales')
    : path.resolve('./public/static/locales')

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  // Other languages will be added here once there are translations for them, e.g. ['es', 'de']
  otherLanguages: ['de', 'es', 'zh_CN', 'zh_TW', 'it'],
  // The "dev" fallback language will show the translation key, indicating there is a missing translation
  fallbackLng: process.env.NODE_ENV === 'production' ? 'en' : 'dev',
  // Help nexti18next figure out how to load in a serverless env
  localePath: getLocalePath(),
  ns: [
    'common',
    'post',
    'profile',
    'settings',
    'authentication',
    'comment',
    'my-feed',
    'my-posts',
    'post-author-card',
  ],
  defaultNS: 'common',
})
