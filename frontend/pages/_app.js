import Head from 'next/head'
import '../styles/reset.css'
import '../styles/globalStyles.css'

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
