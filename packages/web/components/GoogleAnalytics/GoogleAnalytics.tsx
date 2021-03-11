import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

let _dataLayer = []

const gtag = (...args) => {
  const dataLayer = (
    (typeof window !== 'undefined' && window.dataLayer)
    || _dataLayer
  )

  dataLayer.push(args)
}

const GoogleAnalytics = () => {
  if (!process.env.NEXT_PUBLIC_GA_ID)
    return null

  useEffect(() => {
    window.dataLayer = window.dataLayer || _dataLayer

    gtag('js', new Date())
    gtag('config', process.env.NEXT_PUBLIC_GA_ID)

    Router.events.on('routeChangeComplete', (url) => {
      gtag('set', 'page', url)
      gtag('send', 'pageview')
    })
  }, [])

  return (
    <Head>
      <script 
        sync
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
    </Head>
  )
}

export { gtag }
export default GoogleAnalytics
