import { Comment, Tooltip, Avatar } from 'antd';
import Card from './Card';
import styles from "../../styles/Message.module.css";
import moment from 'moment';

/**
 * Required props for rendering a message.
 */
export interface MessageProps {
  /**
   *  Author's name (first and last).
  */
  author: string;
  /**
   *  How long a message was sent.
  */
  timestamp: string;
  /**
   *  Message content.
  */
  content: string;
}

/**
 * Renders the message component.
 * The following parameters are passed as props:
 */
export function Message(
  props: MessageProps
): JSX.Element {

  // setup time
  const currentDate: Date = new Date(props.timestamp);
  const postTime: string = moment(currentDate).fromNow();

  // get actions
  const actions = [
    <span>Reply to</span>
  ]

  return (
    <Card>
      <Comment
        className={styles.messageComment}
        actions={actions}
        author={props.author}
        content={props.content}
        avatar={<Avatar />}
        datetime={
          <Tooltip title={postTime}>
            <span>{postTime}</span>
          </Tooltip>
        }
      />
    </Card>
  );
}
