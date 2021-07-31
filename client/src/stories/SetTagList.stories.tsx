import SetTagList from '../components/SetTagList';
import Tags from '../constants/Tags';
import { Meta } from '@storybook/react';

export default {
  title: 'SetTagList',
  component: SetTagList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <SetTagList tags={Tags} onTagChange={(tags: string[]) => {}} />
);
