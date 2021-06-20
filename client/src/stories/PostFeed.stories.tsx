import PostFeed from '../components/PostFeed';
import { Meta } from '@storybook/react';

export default {
  title: 'PostFeed',
  component: PostFeed,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <PostFeed onLoad={async() => {return [{author: "John Deer", timestamp: "2021-04-23T18:25:43.511Z", postId: 0, content: "Hello world!"}]}} initPosts={[]} />;