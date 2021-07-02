import { Comment, Tooltip, Avatar, Button } from 'antd';
import Card from './Card';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Post.module.css';
import moment from 'moment';
import { ReplyPost } from './SendPost';
import { PostList } from './PostList';
import { PostResponse, REPLY_LIMIT } from 'baobab-common';
import { AuthContext } from '../providers/AuthProvider';

/**
 * Required props for rendering a post.
 */
export interface PostProps extends PostResponse {
  /**
   * Function for loading more replies.
   * @param page Reply batch number.
   */
  loadMoreReplies: (page: number) => Promise<PostResponse[]>;
  /**
   * Reply depth of post.
   */
  depth: number;
}

/**
 * Renders the post component.
 */
export function Post(props: PostProps): JSX.Element {
  // create a state for saving messages and open message states
  const [replyOpen, setReplyOpen] = useState(false);

  // setup time
  const currentDate: Date = new Date(props.timestamp);
  const postTime: string = moment(currentDate).fromNow();

  // get actions
  const [actions, setActions] = useState<JSX.Element[]>([]);

  const [batch, setBatch] = useState(0);

  const [replies, setReplies] = useState<PostResponse[]>([]);

  const loadMore = async () => {
    setLoading(true);

    const newReplies = await props.loadMoreReplies(batch);
    setBatch(batch + 1);

    if (newReplies.length === 0) {
      setHasMoreReplies(false);
    } else {
      setReplies(replies.concat(newReplies));
    }

    setLoading(false);
  };

  const authState = useContext(AuthContext);

  useEffect(() => {
    if (authState && props.depth < REPLY_LIMIT) {
      setActions(
        actions.concat(
          <span
            key="reply"
            onClick={() => {
              setReplyOpen(true);
            }}
          >
            Reply to
          </span>,
        ),
      );
    }

    // fetch first batch of replies so we know if there are any replies
    // (and whether to display the "show replies" button or not)
    (async () => {
      const initReplies = await props.loadMoreReplies(batch);
      setBatch(batch + 1);

      if (initReplies.length > 0) {
        setActions(
          actions.concat(
            <span
              key="showReplies"
              onClick={() => setShowReplies((prevState) => !prevState)}
            >
              Show Replies
            </span>,
          ),
        );

        setReplies(initReplies);
      }
    })();
  }, []);

  const [loading, setLoading] = useState(false);

  const [hasMoreReplies, setHasMoreReplies] = useState(true);

  const [showReplies, setShowReplies] = useState(false);

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
        {replyOpen && (
          <div className={styles.replyMenu}>
            <ReplyPost parent={props.postId} author={'You!'} />
          </div>
        )}
        {showReplies && (
          <>
            <PostList
              postPropsList={replies}
              isLoading={loading}
              depth={props.depth + 1}
            />
            <Button
              onClick={loadMore}
              loading={loading}
              disabled={!hasMoreReplies}
            >
              {hasMoreReplies ? (
                <span>Load More Replies</span>
              ) : (
                <span>No More Replies</span>
              )}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
