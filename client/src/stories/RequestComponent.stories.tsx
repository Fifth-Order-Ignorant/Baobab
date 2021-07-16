import { RequestComponent } from '../components/RequestComponent';
import { Meta } from '@storybook/react';
import { Role } from '../../../server/src/entities/role.entity';

export default {
  title: 'RequestComponent',
  component: RequestComponent,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <RequestComponent
    requestId={0}
    id={0}
    role={Role.ENTREPRENEUR}
    description={'It would be fun.'}
  />
);
