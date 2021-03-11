import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

const gtag = (...args: any[]) => {
  if (typeof window === 'undefined')
    return

  if (window.gtag) {
    window.gtag(...args)
  } else {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(args)
  }
}

const GoogleAnalytics = () => {
  if (!process.env.NEXT_PUBLIC_GA_ID)
    return null

  useEffect(() => {
    Router.events.on('routeChangeComplete', (url) => {
      gtag('set', 'page', url)
      gtag('event', 'page_view')
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
