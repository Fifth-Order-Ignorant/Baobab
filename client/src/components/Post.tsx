import { Comment, Tooltip, Avatar, Button } from 'antd';
import Card from './Card';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Post.module.css';
import moment from 'moment';
import { ReplyPost } from './SendPost';
import { PostList } from './PostList';
import { PostResponse, REPLY_LIMIT } from 'baobab-common';

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
  const [actions, setActions] = useState(
    props.depth < REPLY_LIMIT
      ? new Map<string, JSX.Element>([
          [
            'reply',
            <span
              key="reply"
              onClick={() => {
                setReplyOpen(true);
              }}
            >
              Reply to
            </span>,
          ],
        ])
      : new Map<string, JSX.Element>(),
  );

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

  // fetch first batch of replies so we know if there are any replies
  // (and whether to display the "show replies" button or not)
  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, []);

  useEffect(() => {
    if (!actions.has('showReplies') && replies.length > 0) {
      actions.set(
        'showReplies',
        <span
          key="showReplies"
          onClick={() => setShowReplies((prevState) => !prevState)}
        >
          Show Replies
        </span>,
      );
      setActions(new Map(actions));
    }
  }, [replies.length]);

  const [loading, setLoading] = useState(false);

  const [hasMoreReplies, setHasMoreReplies] = useState(true);

  const [showReplies, setShowReplies] = useState(false);

  return (
    <Card>
      <div>
        <Comment
          className={styles.postComment}
          actions={Array.from(actions.values())}
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
