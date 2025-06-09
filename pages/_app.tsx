import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Kesaru's personal website and digital universe" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add more default meta tags as needed */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;