import RegisterForm from '../components/RegisterForm';
import { Meta } from '@storybook/react';

export default {
  title: 'RegisterForm',
  component: RegisterForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <RegisterForm onSuccess={() => {}} />;
