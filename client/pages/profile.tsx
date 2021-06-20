import { About } from '../src/components/About';
import { PostList } from '../src/components/PostList';
import samplePosts from '../src/constants/SamplePostList';
import { Avatar, Row, Col, Typography } from 'antd';
import styles from '../styles/Profile.module.css';

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {
  return (
    <div>
      <div className={styles.body}>
        <Row className={styles.header}>
          <Col>
            <Avatar size="large" className={styles.avatar} />
          </Col>
          <Col className={styles.about}>
            <About />
          </Col>
        </Row>
        <Row justify="center">
          <Col className={styles.activity} span={24}>
            <Typography>
              <h2>Recent Activity:</h2>
            </Typography>
            <PostList messagePropsList={samplePosts} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
