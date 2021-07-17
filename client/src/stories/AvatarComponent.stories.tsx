import { Meta } from '@storybook/react';
import AvatarComponent from '../components/AvatarComponent';

export default {
  title: 'AvatarComponent',
  component: AvatarComponent,
} as Meta;

export const Basic = (): JSX.Element => (
  <div style={{ marginTop: 100 }}>
    <AvatarComponent id={0} />
  </div>
);
