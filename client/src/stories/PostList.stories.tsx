import { PostList } from '../components/PostList';
import { Meta } from '@storybook/react';

export default {
  title: 'PostList',
  component: PostList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <PostList
    postPropsList={[
      {
        author: 'John Deer',
        timestamp: '2021-04-23T18:25:43.511Z',
        postId: 0,
        content: 'Hello world!',
        authorId: 0,
      },
      {
        author: 'John Deer',
        timestamp: '2021-04-23T18:25:43.511Z',
        postId: 0,
        content: 'Hello world!',
        authorId: 0,
      },
    ]}
    isLoading={false}
    depth={0}
  />
);
