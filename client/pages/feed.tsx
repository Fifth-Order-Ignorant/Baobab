import PostFeed from '../src/components/PostFeed';
import { SendPost } from '../src/components/SendPost';
import { Typography, Row, Col } from 'antd';
import { MessageRequest } from 'baobab-common';
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
   * Returns a list of post list props to feed into the MessageList component
   * @returns Post list props.
   */
  const getPosts = async () => {
    // TODO: Make start = c * i to make it more efficient
    const res = await axios.post('/api/message/pagination', {
      start: 0,
      end: c * (i + 1),
    });
    const newMessages = res.data;
    if (newMessages.length !== 0) {
      i++;
    }
    return newMessages;
  };

  /**
   * Sends a post from the signed in user.
   * @param content The contents of the post as a string.
   */
  const sendPost = async (content: string): Promise<void> => {
    const mr: MessageRequest = { content: content, parentID: -1 };
    await axios.post('/api/message/create', mr);
  };

  return (
    <div className={styles.feed}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Feed</h2>
          </Typography>
          <SendPost author={'You!'} sendPost={sendPost} />
          <PostFeed onLoad={getPosts} initMessages={[]} />
        </Col>
      </Row>
    </div>
  );
}
