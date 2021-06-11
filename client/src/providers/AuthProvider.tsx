import { SessionPayload } from 'baobab-common';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

type AuthState = {
  jwt: string;
  payload: SessionPayload | null;
};

const initialState: AuthState = {
  jwt: '',
  payload: null,
};

export const AuthContext = createContext(initialState);

function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    const token = Cookies.get('SESSION_JWT');

    const payload =
      token == undefined ? null : (jwt.decode(token) as SessionPayload);

    setAuthState({
      jwt: token == undefined ? '' : token,
      payload: payload,
    });

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
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
