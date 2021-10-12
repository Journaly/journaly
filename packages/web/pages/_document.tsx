import { ReactNode } from 'react'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document'

import { i18n } from '@/config/i18n'

interface CustomProps {
  language: string
}

class MyDocument extends Document<DocumentProps & { children?: ReactNode } & CustomProps> {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context)

    const additionalProps = {
      language: i18n.language,
    }

    return { ...initialProps, ...additionalProps }
  }

  render() {
    const { language } = this.props

    return (
      <Html lang={language}>
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,600,700&display=swap"
            rel="stylesheet"
          />
          {/* Favicons */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="alternate icon" href="/favicon.png" />
        </Head>
        <body className="block-transitions-on-page-load">
          <Main />
          <div id="modal-root" />
          <div id="popover-root" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
