import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'antd';
import React from 'react';
import Navbar from '../src/components/Navbar';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Layout.Header style={{ background: '#fff' }}>
        <Navbar />
      </Layout.Header>
      <Layout.Content>
        <Component {...pageProps} />
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  );
}

export default MyApp;
