import { RequestList } from '../components/RequestList';
import { Meta } from '@storybook/react';

export default {
  title: 'RequestList',
  component: RequestList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <RequestList
    requestPropsList={[
      {
        requestId: 0,
        userId: 0,
        role: 'Entrepreneur',
        description: 'It would be fun.',
      },
      {
        requestId: 0,
        userId: 0,
        role: 'Entrepreneur',
        description: 'It would be fun.',
      },
    ]}
    isLoading={false}
  />
);
