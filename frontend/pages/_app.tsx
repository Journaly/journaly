import App from 'next/app'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { initializeTracking, trackPageView } from '../lib/google-analytics'
import '../styles/reset.css'
import '../styles/globalStyles.css'
import { appWithTranslation } from '../config/i18n'

initializeTracking()
// Tracks all page views except the first page render
Router.events.on('routeChangeComplete', (url) => trackPageView(url))

class JournalyApp extends App {
  componentDidMount() {
    trackPageView(this.props.router.asPath)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Journaly</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default appWithTranslation(withRouter(JournalyApp))
