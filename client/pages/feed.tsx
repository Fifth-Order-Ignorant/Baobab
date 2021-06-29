import PostFeed from '../src/components/PostFeed';
import { CreatePost } from '../src/components/SendPost';
import { Typography, Row, Col } from 'antd';

import styles from '../styles/Post.module.css';
import axios from 'axios';

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element {
  const fetchPosts = async (page: number) => {
    const newPosts = await axios.get('/api/user/pagination', {
      params: {
        start: (page - 1) * 5,
        end: page * 5,
      },
    });
    return newPosts.data;
  };

  return (
    <div className={styles.feed}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Feed</h2>
          </Typography>
          <CreatePost author={'You!'} />
          <PostFeed fetchPosts={fetchPosts} />
        </Col>
      </Row>
    </div>
  );
}
