import { SendPost } from '../components/SendPost';
import { Meta } from '@storybook/react';

export default {
  title: 'SendMessage',
  component: SendPost,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <SendPost author={'John Deer'} sendMessage={async() => {}} />;