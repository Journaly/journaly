const NextI18Next = require('next-i18next').default

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  // Other languages will be added here once there are translations for them, e.g. ['es', 'de']
  otherLanguages: ['de'],
  fallbackLng: process.env.NODE_ENV === 'production' ? 'en' : 'dev',
  detection: {
    order: ['navigator', 'cookie'],
  },
})
