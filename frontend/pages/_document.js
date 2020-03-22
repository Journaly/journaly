import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
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
