import { RequestComponent } from '../components/RequestComponent';
import { Meta } from '@storybook/react';
import { Role } from '../../../server/src/entities/role.entity';
import { AuthContext } from '../providers/AuthProvider';

export default {
  title: 'RequestComponent',
  component: RequestComponent,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
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
    <RequestComponent
      requestId={0}
      id={0}
      role={Role.ENTREPRENEUR}
      description={'It would be fun.'}
      name={'John Doe'}
    />
  </AuthContext.Provider>
);
