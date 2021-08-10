let config = {
  target: 'serverless',
  productionBrowserSourceMaps: true,
  webpack5: false,
}

if (process.env.ANALYZE === '1') {
  config = require('@next/bundle-analyzer')({ enabled: true })(config)
}

module.exports = config
