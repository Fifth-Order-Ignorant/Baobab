import SubmissionTable from 'src/components/SubmissionTable';
import { Meta } from '@storybook/react';

export default {
  title: 'SubmissionTable',
  component: SubmissionTable,
} as Meta;

const dataSource = [
  {
    name: 'Jim Jim',
    assignmentId: 0,
    timestamp: Date().toString(),
    feedback: 'Good work! A 10% improvement from your last test!',
    mark: 10,
    id: 0,
  },
  {
    name: 'Tim Tim',
    assignmentId: 0,
    timestamp: Date().toString(),
    feedback: 'Perfect!',
    mark: 100,
    id: 1,
  },
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
  <SubmissionTable
    fetchData={async () => {
      return { data: dataSource, total: 2 };
    }}
    pageSize={2}
    outOf={100}
  />
);
