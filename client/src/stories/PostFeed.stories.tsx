import PostFeed from '../components/PostFeed';
import { Meta } from '@storybook/react';

export default {
  title: 'PostFeed',
  component: PostFeed,
} as Meta;

let fetched = false;

export const Basic = (): JSX.Element => (
  <PostFeed
    fetchPosts={async () => {
      if (!fetched) {
        fetched = true;
        return [
          {
            author: 'John Deer',
            timestamp: '2021-04-23T18:25:43.511Z',
            postId: 0,
            content: 'Hello world!',
          },
        ];
      }
      return [];
    }}
  />
);
