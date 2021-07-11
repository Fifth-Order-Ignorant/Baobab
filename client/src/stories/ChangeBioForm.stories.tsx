import ChangeBioForm from '../components/ChangeBioForm';
import { Meta } from '@storybook/react';

export default {
  title: 'ChangeBioForm',
  component: ChangeBioForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <ChangeBioForm bio="Placeholder Bio" canEdit={true} />
);
