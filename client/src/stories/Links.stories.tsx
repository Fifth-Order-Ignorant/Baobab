import Links from '../components/Links';
import { Meta } from '@storybook/react';

export default {
  title: 'Links',
  component: Links,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <Links id={0} />
);
