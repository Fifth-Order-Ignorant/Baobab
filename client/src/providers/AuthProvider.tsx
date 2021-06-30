import { SessionPayload } from 'baobab-common';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as jwt from 'jsonwebtoken';

type AuthState = SessionPayload | null;

export const AuthContext = createContext<AuthState>(null);

function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [token, setToken] = useState(Cookies.get('SESSION_JWT'));

  const [authState, setAuthState] = useState<AuthState>(null);

  const updateToken = () => {
    // todo: replace this with another library since it can return old cookie values
    const newToken = Cookies.get('SESSION_JWT');

    if (token !== newToken) {
      setToken(newToken);
    }
  };

  useEffect(() => {
    axios.interceptors.response.use(
      (value) => {
        updateToken();
        return value;
      },
      (error) => {
        updateToken();
        return Promise.reject(error);
      },
    );
  }, []);

  useEffect(() => {
    if (token) {
      const payload = jwt.decode(token) as SessionPayload;
      setAuthState(payload);
    } else {
      setAuthState(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
