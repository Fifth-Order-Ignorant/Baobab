import RoleRequestForm from '../components/RoleRequestForm';
import { Meta } from '@storybook/react';

export default {
  title: 'RoleRequestForm',
  component: RoleRequestForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <RoleRequestForm />;