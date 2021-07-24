import React from 'react';
import { Table, Typography } from 'antd';

export interface Submission {
    id: number,
    name: string,
    timestamp: string,
    mark: number,
    feedback: string,
}

export interface SubmissionListProps {
    outOf: number,
    submissions: Submission[],
}

/**
 * Renders the submissions.
 */
export function SubmissionList(props: SubmissionListProps): JSX.Element {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Assignment',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => <Typography.Link href={`/api/submission/file/${id}`}>Download</Typography.Link>
        },
        {
            title: 'Submitted On',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: `Mark (out of ${props.outOf})`,
            dataIndex: 'mark',
            key: 'timestamp',
        },
        {
            title: 'Feedback',
            dataIndex: 'feedback',
            key: 'feedback',
        }
    ]
    return <Table dataSource={props.submissions} columns={columns} />;
}
