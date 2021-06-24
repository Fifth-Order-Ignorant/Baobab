import { Comment, Tooltip, Avatar } from 'antd';
import Card from './Card';
import React, { useState } from 'react';
import styles from '../../styles/Post.module.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { SendPost } from './SendPost';

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
  /**
   *  The current post id.
   */
  postId: number;
}

export interface PostPropsWithSend extends PostProps {
  /**
   * Function that sends posts.
   */
  sendPost: (content: string, postId: number) => Promise<void>;
}

/**
 * Renders the post component.
 */
export function Post(props: PostPropsWithSend): JSX.Element {

  // create a state for saving messages and open message states
  const [replyOpen, setReplyOpen] = useState(false);

  // setup time
  const currentDate: Date = new Date(props.timestamp);
  const postTime: string = moment(currentDate).fromNow();

  // get actions
  const actions = [<span onClick={() => { setReplyOpen(true) }}>Reply to</span>];

  return (
    <Card>
      <div>
        <Comment
          className={styles.postComment}
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
        {replyOpen &&
          <div className={styles.replyMenu}>
            <SendPost
              author={"You!"}
              sendPost={async (content: string) => { await props.sendPost(content, props.postId) }}
            />
          </div>
        }
      </div>
    </Card>
  );
}
