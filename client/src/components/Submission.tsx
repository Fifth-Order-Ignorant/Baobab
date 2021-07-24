import Card from './Card';
import React from 'react';
import { Descriptions, Typography } from 'antd';
import { AssignmentSubmissionResponse } from 'baobab-common';

export interface SubmissionResponseWithAssignment extends AssignmentSubmissionResponse {
    outOf: number;
}

/**
 * Renders the submission component.
 */
export function Submission(props: SubmissionResponseWithAssignment): JSX.Element {
    return (
        <Card>
            <div>
                <Descriptions title={props.name} layout="vertical" size="small" bordered>
                    <Descriptions.Item label="Assignment">
                        <Typography.Link>
                            {props.filename}
                        </Typography.Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Submitted on">{props.timestamp}</Descriptions.Item>
                    <Descriptions.Item label="Mark">{props.mark}/{props.outOf}</Descriptions.Item>
                    <Descriptions.Item label="Feedback">{props.feedback}</Descriptions.Item>
                </Descriptions>
            </div>
        </Card>
    );
}
