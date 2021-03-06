import UploadFile from '../components/UploadFile';
import { Meta } from '@storybook/react';

export default {
  title: 'UploadFile',
  component: UploadFile,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => <UploadFile assignmentId={0} />;
