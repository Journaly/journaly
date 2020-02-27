import "../globalStyles.css";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Journaly</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
