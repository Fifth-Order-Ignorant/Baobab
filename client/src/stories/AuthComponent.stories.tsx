import AuthComponent from '../components/AuthComponent';
import { Meta } from '@storybook/react';
import { AuthContext } from '../providers/AuthProvider';
import { Role } from 'baobab-common';

export default {
  title: 'AuthComponent',
  component: AuthComponent,
} as Meta;

export const LoggedOut = (): JSX.Element => <AuthComponent />;

export const LoggedIn = (): JSX.Element => (
  <AuthContext.Provider
    value={{
      id: 0,
      fullName: 'John Doe',
      integrityHash: '',
      exp: 0,
      role: Role.DEFAULT,
      iat: 0,
    }}
  >
    <AuthComponent />
  </AuthContext.Provider>
);
