import Card from './Card';
import React from 'react';
import { Col, Descriptions, Row, Typography } from 'antd';

/**
 * TODO: Replace this with AssignmentSubmissionResponse once FIF-114 is done
 */
export interface FutureSubmissionResponse {
    id: number;
    name: string;
    assignmentId: number;
    timestamp: string;
    mark: number;
    feedback: string;
    filename: string;
}

export interface SubmissionResponseWithAssignment extends FutureSubmissionResponse {
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
