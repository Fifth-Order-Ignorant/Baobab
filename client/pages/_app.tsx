import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import AuthProvider from '../src/providers/AuthProvider';
import axios from 'axios';
import { useEffect } from 'react';

// the navbar cannot be SSR'd since its contents are different depending on user
const Navbar = dynamic(() => import('../src/components/Navbar'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Layout.Header style={{ background: '#fff' }}>
          <Navbar />
        </Layout.Header>
        <Layout.Content>
          <Component {...pageProps} />
        </Layout.Content>
        <Layout.Footer />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
