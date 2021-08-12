let config = {
  target: 'serverless',
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common', 'bufferutil', 'utf-8-validate')
    }
    return config
  },
}

if (process.env.ANALYZE === '1') {
  config = require('@next/bundle-analyzer')({ enabled: true })(config)
}

module.exports = config
