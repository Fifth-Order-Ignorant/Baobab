import AuthComponent from '../components/AuthComponent';
import { Meta } from '@storybook/react';
import { AuthContext } from '../providers/AuthProvider';

export default {
  title: 'AuthComponent',
  component: AuthComponent,
} as Meta;

export const LoggedOut = (): JSX.Element => <AuthComponent />;

export const LoggedIn = (): JSX.Element => (
  <AuthContext.Provider
    value={{
      jwt: 'jwt',
      payload: { id: 0, fullName: 'John Doe', integrityHash: '', exp: 0 },
    }}
  >
    <AuthComponent />
  </AuthContext.Provider>
);
