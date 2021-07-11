import TagList from '../components/TagList';
import { Meta } from '@storybook/react';

export default {
  title: 'TagList',
  component: TagList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <TagList
    tags={['Blockchain', 'Machine Learning', 'Finance', 'Management']}
  />
);
