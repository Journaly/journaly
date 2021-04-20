const { i18n } = require('./next-i18next.config')

let config = {
  target: 'serverless',
  productionBrowserSourceMaps: true,
  i18n,
}

if (process.env.ANALYZE === '1') {
  config = require('@next/bundle-analyzer')({ enabled: true })(config)
}

module.exports = config
