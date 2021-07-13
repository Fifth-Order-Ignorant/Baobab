import TagList from '../components/TagList';
import { Meta } from '@storybook/react';
import Tags from '../constants/Tags';

export default {
  title: 'TagList',
  component: TagList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <TagList
    tags={Tags}
  />
);
