import App from 'next/app'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from '@/config/i18n'

import GoogleAnalytics from '@/components/GoogleAnalytics'

import '@/styles/reset.css'
import '@/styles/globalStyles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'reactjs-popup/dist/index.css'
import '@/styles/react-toastify-overrides.css'

// Show loading progress on page loads
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())

class JournalyApp extends App {
  componentDidMount() {}

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Journaly</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <GoogleAnalytics />
        <Component {...pageProps} />
        <ToastContainer />
      </>
    )
  }
}

export default appWithTranslation(withRouter(JournalyApp))
