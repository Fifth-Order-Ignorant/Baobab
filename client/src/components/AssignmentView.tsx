import { AssignmentResponse } from 'baobab-common';
import { Descriptions, Typography } from 'antd';

type AssignmentViewProps = {
  /**
   * Data of assignment to be displayed.
   */
  assignment: AssignmentResponse;
};

/**
 * Component for displaying an individual assignment.
 */
function AssignmentView({ assignment }: AssignmentViewProps): JSX.Element {
  return (
    <Descriptions title={assignment.name} bordered column={2}>
      <Descriptions.Item label="Max Mark" span={assignment.filename ? 1 : 2}>
        {assignment.maxMark}
      </Descriptions.Item>
      {assignment.filename && (
        <Descriptions.Item label="File">
          <Typography.Link href={`/api/assignment/file/${assignment.id}`}>
            {assignment.filename}
          </Typography.Link>
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Description" span={2}>
        {assignment.description}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default AssignmentView;
