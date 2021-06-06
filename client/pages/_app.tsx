import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AuthContext, AuthState } from '../src/contexts/AuthContext';
import axios from 'axios';
import { SessionPayload } from 'baobab-common';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// the navbar cannot be SSR'd since its contents are different depending on user
const Navbar = dynamic(() => import('../src/components/Navbar'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [authState, setAuthState] = useState<AuthState>({
    jwt: '',
    payload: null,
  });

  // todo: possibly refactor into custom context provider
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use((value) => {
      const token = Cookies.get('SESSION_JWT');

      if (token !== authState.jwt) {
        const payload =
          token == undefined ? null : (jwt.decode(token) as SessionPayload);

        setAuthState({
          jwt: token == undefined ? '' : token,
          payload: payload,
        });
      }

      return value;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState }}>
      <Layout>
        <Layout.Header style={{ background: '#fff' }}>
          <Navbar />
        </Layout.Header>
        <Layout.Content>
          <Component {...pageProps} />
        </Layout.Content>
        <Layout.Footer />
      </Layout>
    </AuthContext.Provider>
  );
}

export default MyApp;
