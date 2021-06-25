import PostFeed from '../src/components/PostFeed';
import { CreatePost } from '../src/components/SendPost';
import { Typography, Row, Col } from 'antd';

import styles from '../styles/Post.module.css';

/**
 * Renders the feed page.
 */
export default function Feed(): JSX.Element {
  return (
    <div className={styles.feed}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Feed</h2>
          </Typography>
          <CreatePost author={'You!'} />
          <PostFeed />
        </Col>
      </Row>
    </div>
  );
}
