import LoginForm from '../components/LoginForm';
import { Meta } from '@storybook/react';

export default {
  title: 'LoginForm',
  component: LoginForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <LoginForm onSuccess={() => {}} />;
