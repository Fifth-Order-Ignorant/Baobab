import { SendMessage } from '../components/SendMessage';
import { Meta } from '@storybook/react';

export default {
  title: 'SendMessage',
  component: SendMessage,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <SendMessage author={'John Deer'} sendMessage={async() => {}} />;