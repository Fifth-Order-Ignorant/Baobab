import { CreatePost } from '../components/SendPost';
import { Meta } from '@storybook/react';

export default {
  title: 'CreatePost',
  component: CreatePost,
} as Meta;

export const Basic = (): JSX.Element => <CreatePost author={'John Deer'} />;
