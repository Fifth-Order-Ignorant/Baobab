import ChangeNameForm from '../components/ChangeNameForm';
import { Meta } from '@storybook/react';

export default {
  title: 'ChangeNameForm',
  component: ChangeNameForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <ChangeNameForm />;
