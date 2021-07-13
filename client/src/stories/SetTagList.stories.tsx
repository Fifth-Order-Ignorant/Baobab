import SetTagList from '../components/SetTagList';
import { Meta } from '@storybook/react';

export default {
    title: 'SetTagList',
    component: SetTagList,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Basic = (): JSX.Element => (
    <SetTagList onTagChange={(tags: string[]) => { }}
    />
);
