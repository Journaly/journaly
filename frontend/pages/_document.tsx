import { ReactNode } from 'react'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document'
import { ServerResponse } from 'http'

interface CustomProps {
  language: string
}

interface CustomServerResponse extends ServerResponse {
  locals: {
    language: string
  }
}

class MyDocument extends Document<
  DocumentProps & { children?: ReactNode } & CustomProps
> {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context)

    // Locals comes from the i18n middleware in server/index.js
    const { language } = (context.res as CustomServerResponse).locals

    const additionalProps = {
      language,
    }

    return { ...initialProps, ...additionalProps }
  }

  render() {
    const { language } = this.props

    return (
      <Html lang={language}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
