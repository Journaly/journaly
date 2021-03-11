import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

const gtag = (...args) => {
  if (typeof window === 'undefined')
    return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

const GoogleAnalytics = () => {
  if (!process.env.NEXT_PUBLIC_GA_ID)
    return null

  useEffect(() => {
    Router.events.on('routeChangeComplete', (url) => {
      gtag('set', 'page', url)
      gtag('send', 'pageview')
    })
  }, [])

  return (
    <Head>
      <script 
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `
        }}
      />
    </Head>
  )
}

export { gtag }
export default GoogleAnalytics
