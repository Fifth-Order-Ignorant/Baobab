import { createContext } from 'react';
import { SessionPayload } from 'baobab-common';

export type AuthState = {
  jwt: string;
  payload: SessionPayload | null;
};

export const AuthContext = createContext<{ authState: AuthState }>({
  authState: {
    jwt: '',
    payload: null,
  },
});
