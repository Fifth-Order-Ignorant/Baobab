import { Card, Typography } from 'antd';

/**
 * Required props for rendering a message.
 */
export interface MessageProps {
    author: String;
    postTime: String;
    content: String;
}

/**
 * Renders the message component.
 * The following parameters are passed as props:
 * @param author Author's name (first and last).
 * @param postTime How long a message was sent.
 * @param content Message content.
 */
export function Message(
  props: MessageProps
): JSX.Element {
  return (
  <Card>
    <p>
    <Typography.Text type="secondary">
      {props.author} made a post
      <span>
      &nbsp;&nbsp;{props.postTime}
      </span>
    </Typography.Text>
    </p>
    <p>{props.content}</p>
  </Card>
  );
}
