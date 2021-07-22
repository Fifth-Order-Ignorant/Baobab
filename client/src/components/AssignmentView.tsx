import { AssignmentResponse } from 'baobab-common';
import { Descriptions, Typography } from 'antd';

type AssignmentViewProps = {
  assignment: AssignmentResponse;
};

function AssignmentView({ assignment }: AssignmentViewProps): JSX.Element {
  return (
    <Descriptions title={assignment.name} bordered column={2}>
      <Descriptions.Item label="Max Mark">
        {assignment.maxMark}
      </Descriptions.Item>
      <Descriptions.Item label="File">
        {assignment.filename && (
          <Typography.Link href={`/api/assignment/file/${assignment.id}`}>
            {assignment.filename}
          </Typography.Link>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Description" span={2}>
        {assignment.description}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default AssignmentView;
