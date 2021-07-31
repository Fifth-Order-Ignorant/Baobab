import { RequestList } from '../components/RequestList';
import { Meta } from '@storybook/react';
import { AuthContext } from '../providers/AuthProvider';
import { Role } from 'baobab-server/src/entities/role.entity';

export default {
  title: 'RequestList',
  component: RequestList,
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
    <RequestList
      requestPropsList={[
        {
          requestId: 0,
          userId: 0,
          role: 'Entrepreneur',
          description: 'It would be fun.',
          name: 'John Doe',
        },
        {
          requestId: 0,
          userId: 0,
          role: 'Entrepreneur',
          description: 'It would be fun.',
          name: 'John Doe',
        },
      ]}
      isLoading={false}
    />
  </AuthContext.Provider>
);
