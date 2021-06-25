import PostFeed from '../src/components/PostFeed';
import { SendPost } from '../src/components/SendPost';
import { Typography, Row, Col } from 'antd';
import { PostRequest } from 'baobab-common';
import axios from 'axios';

import styles from '../styles/Post.module.css';

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element {
  // declare variables for pagination
  let i = 0;
  const c = 5;

  /**
   * Returns a list of post list props to feed into the PostList component
   * @returns Post list props.
   */
  const getPosts = async () => {
    // TODO: Make start = c * i to make it more efficient

    const res = await axios.get('/api/post/pagination', {
      params: {
        start: 0,
        end: c * (i + 1),
      },
    });

    const newPosts = res.data;
    if (newPosts.length !== 0) {
      i++;
    }
    return newPosts;
  };

  /**
   * Sends a post from the signed in user.
   * @param content The contents of the post as a string.
   */
  const sendPost = async (
    content: string,
    parentPostId: number,
  ): Promise<void> => {
    const pr: PostRequest = { content: content, parentID: parentPostId };
    await axios.post('/api/post/create', pr);
  };

  return (
    <div className={styles.feed}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Feed</h2>
          </Typography>
          <SendPost
            author={'You!'}
            sendPost={async (content: string) => {
              await sendPost(content, -1);
            }}
          />
          <PostFeed onLoad={getPosts} sendPost={sendPost} />
        </Col>
      </Row>
    </div>
  );
}
