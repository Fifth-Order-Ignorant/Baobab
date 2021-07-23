import { Meta } from '@storybook/react';
import AssignmentView from '../components/AssignmentView';

export default {
  title: 'AssignmentView',
  component: AssignmentView,
} as Meta;

export const Basic = (): JSX.Element => (
  <AssignmentView
    assignment={{
      id: 0,
      filename: null,
      maxMark: 50,
      name: 'Assignment 1',
      description: 'Assignment description here.',
    }}
  />
);
