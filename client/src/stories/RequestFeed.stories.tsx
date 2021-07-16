import RequestFeed from '../components/RequestFeed';
import { Meta } from '@storybook/react';

export default {
  title: 'RequestFeed',
  component: RequestFeed,
} as Meta;

let fetched = false;

export const Basic = (): JSX.Element => (
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
          },
        ];
      }
      return [];
    }}
  />
);
