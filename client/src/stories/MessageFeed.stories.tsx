import MessageFeed from '../components/MessageFeed';
import { Meta } from '@storybook/react';

export default {
  title: 'MessageFeed',
  component: MessageFeed,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <MessageFeed onLoad={async() => {return [{author: "John Deer", timestamp: "2021-04-23T18:25:43.511Z", messageID: 0, content: "Hello world!"}]}} initMessages={[]} />;