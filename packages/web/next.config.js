let config = {
  target: 'serverless',
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    // This is a workaround due to: https://github.com/prisma/prisma/issues/6564
    // Should be able to remove this when: https://github.com/prisma/prisma/pull/7931 is merged
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
