import { MessageList } from '../components/MessageList';
import { Meta } from '@storybook/react';

export default {
  title: 'MessageList',
  component: MessageList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <MessageList messagePropsList={[{author: "John Deer", timestamp: "2021-04-23T18:25:43.511Z", messageID: 0, content: "Hello world!"}, {author: "John Deer", timestamp: "2021-04-23T18:25:43.511Z", messageID: 0, content: "Hello world!"}]} />;