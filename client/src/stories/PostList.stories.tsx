import { PostList } from '../components/PostList';
import { Meta } from '@storybook/react';

export default {
  title: 'PostList',
  component: PostList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <PostList messagePropsList={[{author: "John Deer", timestamp: "2021-04-23T18:25:43.511Z", messageId: 0, content: "Hello world!"}, {author: "John Deer", timestamp: "2021-04-23T18:25:43.511Z", messageId: 0, content: "Hello world!"}]} />;