import { CreatePost } from '../components/CreatePost';
import { Meta } from '@storybook/react';

export default {
  title: 'CreatePost',
  component: CreatePost,
} as Meta;

export const Basic = (): JSX.Element => (
  <CreatePost author={'John Deer'} authorId={0} />
);
