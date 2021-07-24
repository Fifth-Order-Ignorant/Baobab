import { SubmissionList } from '../components/SubmissionList';
import { Meta } from '@storybook/react';

export default {
  title: 'SubmissionList',
  component: SubmissionList,
} as Meta;

const dataSource = [
    {
        name: "Jim Jim",
        filename: "cscc01_test_submission.txt",
        timestamp: (new Date()).toString(),
        feedback: "Good work! A 10% improvement from your last test!",
        mark: 10,
        id: 0,
    },
    {
        name: "Tim Tim",
        filename: "pdf.txt",
        timestamp: (new Date()).toString(),
        feedback: "Perfect!",
        mark: 100,
        id: 1,
    },
]

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <SubmissionList
    submissions={dataSource}
    outOf={100}
  />
);
