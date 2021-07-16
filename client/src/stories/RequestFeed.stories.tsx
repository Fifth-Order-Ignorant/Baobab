import RequestFeed from '../components/RequestFeed';
import { Meta } from '@storybook/react';
import { AuthContext } from '../providers/AuthProvider';

export default {
  title: 'RequestFeed',
  component: RequestFeed,
} as Meta;

let fetched = false;

export const Basic = (): JSX.Element => (
  <AuthContext.Provider
    value={{
      id: 0,
      fullName: 'John Doe',
      integrityHash: '',
      exp: 0,
    }}
  >
    <RequestFeed
      fetchRequests={async () => {
        if (!fetched) {
          fetched = true;
          return [
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
          ];
        } else {
          fetched = false;
          return [];
        }
      }}
    />
  </AuthContext.Provider>
);
