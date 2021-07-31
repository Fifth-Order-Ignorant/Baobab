import ChangeLinkForm from '../components/ChangeLinkForm';
import { Meta } from '@storybook/react';

export default {
  title: 'ChangeLinkForm',
  component: ChangeLinkForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <ChangeLinkForm
    links={[
      'https://www.ethanlam.ca/',
      'https://www.ethanlam.ca/',
      'https://www.ethanlam.ca/',
    ]}
    canEdit={true}
  />
);
