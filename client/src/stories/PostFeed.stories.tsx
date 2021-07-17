import PostFeed from '../components/PostFeed';
import { Meta } from '@storybook/react';

export default {
  title: 'PostFeed',
  component: PostFeed,
} as Meta;

export const Basic = (): JSX.Element => (
  <PostFeed
    fetchPosts={async () => {
      return [
        {
          author: 'John Deer',
          timestamp: '2021-04-23T18:25:43.511Z',
          postId: 0,
          content: 'Hello world!',
          authorId: 0,
          tags: ['Tech', 'Fun'],
        },
        {
          author: 'John Deer',
          timestamp: '2021-04-23T18:25:43.511Z',
          postId: 1,
          content: 'Goodbye world!',
          authorId: 0,
          tags: ['Opportunity', 'Fun'],
        },
      ];
    }}
  />
);
