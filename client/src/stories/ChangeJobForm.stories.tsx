import ChangeJobForm from '../components/ChangeJobForm';
import { Meta } from '@storybook/react';

export default {
  title: 'ChangeJobForm',
  component: ChangeJobForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <ChangeJobForm job="Backend Developer" canEdit={true} />
);
