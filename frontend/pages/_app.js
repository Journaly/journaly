import Head from 'next/head'
import Router from 'next/router'

import '../styles/reset.css'
import '../styles/globalStyles.css'
import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Journaly</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
