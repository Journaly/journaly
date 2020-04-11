import App from 'next/app'
import Head from 'next/head'
import '../styles/reset.css'
import '../styles/globalStyles.css'
import { appWithTranslation } from '../config/i18n'

class JournalyApp extends App {
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

export default appWithTranslation(JournalyApp)
