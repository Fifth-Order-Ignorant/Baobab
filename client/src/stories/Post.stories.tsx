import { Post } from '../components/Post';
import { Meta } from '@storybook/react';

export default {
  title: 'Post',
  component: Post,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <Post author={'John Deer'} timestamp={'2021-04-23T18:25:43.511Z'} content={'Hello world!'} />;