const path = require('path')

const getLocalePath = () => {
  if (typeof window === 'undefined') {
    // Hack because of vercel funkiness with loading files of the FS
    if (process.env.NODE_ENV === 'production') {
      return path.join(process.cwd(), 'public', 'static', 'locales')
    } else {
      return path.resolve('./public/static/locales')
    }
  } else {
    return '/static/locales'
  }
}

module.exports = {
  i18n: {
    // The "dev" fallback language will show the translation key, indicating there is a missing translation
    defaultLocale: process.env.NODE_ENV === 'production' ? 'en-US' : 'dev',
    // These are all the locales that we support in the application.
    // Other languages will be added here once there are translations for them.
    locales: ['en-US', 'de', 'es', 'zh_CN', 'zh_TW', 'it', 'pt_BR', 'dev'],
    // Help nexti18next figure out how to load in a serverless env
  },
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
    'marketing',
  ],
  defaultNS: 'common',
}
