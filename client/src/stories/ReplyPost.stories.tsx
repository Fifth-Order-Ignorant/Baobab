import { ReplyPost } from '../components/SendPost';
import { Meta } from '@storybook/react';

export default {
  title: 'ReplyPost',
  component: ReplyPost,
} as Meta;

export const Basic = (): JSX.Element => (
  <ReplyPost author={'John Deer'} parent={0} />
);