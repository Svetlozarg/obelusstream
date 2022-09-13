import Layout from '../components/Layout';
import { AuthContextProvider } from '../context/AuthContext';
import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D2R5B7T686"
        ></Script>
        <Script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-D2R5B7T686');
        </Script>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
