import Navbar from '../components/Navbar';
import { Meta } from '@storybook/react';

export default {
  title: 'Navbar',
  component: Navbar,
} as Meta;

export const Basic = (): JSX.Element => <Navbar />;
