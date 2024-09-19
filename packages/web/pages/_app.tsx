import React from 'react'
import {AppProps} from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import {appWithTranslation} from 'next-i18next'

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

const JournalyApp = (props: AppProps) =>  {
    const { Component, pageProps } = props

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

export default appWithTranslation(JournalyApp)
