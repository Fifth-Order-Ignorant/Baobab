import { Submission } from '../components/Submission';
import { Meta } from '@storybook/react';

export default {
  title: 'Submission',
  component: Submission,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <Submission
    filename={"cscc01_test_submission.txt"}
    name={"Jim Jim"}
    id={0}
    assignmentId={0}
    timestamp={(new Date()).toString()}
    feedback={"Good work! A 10% improvement from your last test!"}
    mark={10}
    outOf={100}
  />
);
