const { i18n } = require('./next-i18next.config')

const CopyPlugin = require("copy-webpack-plugin")

/**
 * @type {import('next').NextConfig}
 */
let config = {
  productionBrowserSourceMaps: true,
  i18n,
  webpack: (config, { isServer }) => {
    // This is a workaround due to: https://github.com/prisma/prisma/issues/6564
    // Should be able to remove this when: https://github.com/prisma/prisma/pull/7931 is merged
    if (isServer) {
      config.externals.push('_http_common', 'bufferutil', 'utf-8-validate')
    }

    // Copy translation files into build so we can find them again in vercel world
    config.plugins.push(
      new CopyPlugin({
        patterns: [{ from: 'public/static/locales', to: 'public/static/locales' }],
      }),
    )

    return config
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/my-feed',
        permanent: true,
      },
      {
        source: '/dashboard/my-feed',
        destination: '/my-feed',
        permanent: true,
      },
      {
        source: '/dashboard/my-posts',
        destination: '/my-posts',
        permanent: true,
      },
      {
        source: '/dashboard/settings/account',
        destination: '/settings/account',
        permanent: true,
      },
      {
        source: '/dashboard/settings/profile',
        destination: '/settings/profile',
        permanent: true,
      },
      {
        source: '/dashboard/settings/subscription',
        destination: '/settings/subscription',
        permanent: true,
      },
      {
        source: '/dashboard/settings/tutorials',
        destination: '/settings/tutorials',
        permanent: true,
      },
      {
        source: '/dashboard/login',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/dashboard/signup',
        destination: '/signup',
        permanent: true,
      },
      {
        source: '/dashboard/new-post',
        destination: '/new-post',
        permanent: true,
      },
      {
        source: '/dashboard/request-reset',
        destination: '/request-reset',
        permanent: true,
      },
      {
        source: '/dashboard/reset-password',
        destination: '/reset-password',
        permanent: true,
      },
    ]
  },
}

if (process.env.ANALYZE === '1') {
  config = require('@next/bundle-analyzer')({ enabled: true })(config)
}

module.exports = config
