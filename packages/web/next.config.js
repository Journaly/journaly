let config = {
  target: 'serverless',
  productionBrowserSourceMaps: true,
  api: {
    // Disable body parser for API routes so stripe can do its validation magic
    bodyParser: false,
  },
}

if (process.env.ANALYZE === '1') {
  config = require('@next/bundle-analyzer')({ enabled: true })(config)
}

module.exports = config
