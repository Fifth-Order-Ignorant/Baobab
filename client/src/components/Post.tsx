import { Comment, Tooltip, Avatar } from 'antd';
import Card from './Card';
import styles from '../../styles/Post.module.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

/**
 * Required props for rendering a post.
 */
export interface PostProps {
  /**
   *  Author's name (first and last).
   */
  author: string;
  /**
   *  The time the post was sent
   */
  timestamp: string;
  /**
   *  Post content.
   */
  content: string;
}

/**
 * Renders the post component.
 */
export function Post(props: PostProps): JSX.Element {
  // setup time
  const currentDate: Date = new Date(props.timestamp);
  const postTime: string = moment(currentDate).fromNow();

  // get actions
  const actions = [<span>Reply to</span>];

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
