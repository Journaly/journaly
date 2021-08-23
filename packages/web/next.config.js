const CopyPlugin = require("copy-webpack-plugin")

let config = {
  target: 'serverless',
  future: {
    webpack5: false,
  },
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    // This is a workaround due to: https://github.com/prisma/prisma/issues/6564
    // Should be able to remove this when: https://github.com/prisma/prisma/pull/7931 is merged
    if (isServer) {
      config.externals.push('_http_common', 'bufferutil', 'utf-8-validate')
    }

    config.plugins.push(
      new CopyPlugin({
        patterns: [{ from: 'public/static/locales', to:  'public/static/locales' }],
      })
    )


    return config
  },
}

if (process.env.ANALYZE === '1') {
  config = require('@next/bundle-analyzer')({ enabled: true })(config)
}

module.exports = config
