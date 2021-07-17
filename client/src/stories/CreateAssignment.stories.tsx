import CreateAssignmentForm from '../components/CreateAssignmentForm';
import { Meta } from '@storybook/react';

export default {
  title: 'CreateAssignmentForm',
  component: CreateAssignmentForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <CreateAssignmentForm />;
