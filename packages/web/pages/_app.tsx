import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import nexti18Next from '@/config/i18n'

import GoogleAnalytics from '@/components/GoogleAnalytics'

import '@/styles/reset.css'
import '@/styles/globalStyles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'reactjs-popup/dist/index.css'
import '@/styles/react-toastify-overrides.css'
import { ApolloProvider } from '@apollo/client'
import { initApolloClient } from '@/lib/apollo'

// Show loading progress on page loads
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())
class JournalyApp extends App {
  componentDidMount() {}

  render() {
    const { Component, pageProps } = this.props
    const client = initApolloClient(pageProps.apolloState)

    return (
      <ApolloProvider client={client}>
        <Head>
          <title>Journaly</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <GoogleAnalytics />
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    )
  }
}

export default nexti18Next.appWithTranslation(withRouter(JournalyApp))
