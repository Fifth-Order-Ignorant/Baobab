import PostFeed from '../src/components/PostFeed';
import { CreatePost } from '../src/components/CreatePost';
import { Typography, Row, Col } from 'antd';

import styles from '../styles/Post.module.css';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../src/providers/AuthProvider';

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element {
  const fetchPosts = async (page: number) => {
    const newPosts = await axios.get('/api/post/pagination', {
      params: {
        start: (page - 1) * 5,
        end: page * 5,
      },
    });
    return newPosts.data;
  };

  const authState = useContext(AuthContext);

  return (
    <div className={styles.feed}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Feed</h2>
          </Typography>
          {authState && <CreatePost author={'You!'} authorId={authState.id} />}
          <PostFeed fetchPosts={fetchPosts} />
        </Col>
      </Row>
    </div>
  );
}
