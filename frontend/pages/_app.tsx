import App from 'next/app'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'
import { initializeTracking, trackPageView } from '../lib/google-analytics'
import '../styles/reset.css'
import '../styles/globalStyles.css'
import { appWithTranslation } from '../config/i18n'
import { ApplicationStateProvider } from '../state/ApplicationStateProvider'

initializeTracking()

// Show loading progress on page loads
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', (url) => {
  // Tracks all page views except the first page render
  trackPageView(url)
  NProgress.done()
})

class JournalyApp extends App {
  componentDidMount() {
    // Track initial page view
    // All others are handled by the `routeChangeComplete` event handler
    trackPageView(this.props.router.asPath)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Journaly</title>
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <ApplicationStateProvider>
          <Component {...pageProps} />
        </ApplicationStateProvider>
      </>
    )
  }
}

export default appWithTranslation(withRouter(JournalyApp))
