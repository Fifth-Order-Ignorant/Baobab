import { About } from '../../src/components/About';
import { PostList } from '../../src/components/PostList';
import sampleMessages from '../../src/constants/SamplePostList';
import { Avatar, Row, Col, Typography } from 'antd';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {
  const id = () => {
      const router = useRouter();
      console.log(router.query.id);
      return router.query.id;
  }

  return (
    <div>
      <div className={styles.body}>
        <Row className={styles.header}>
          <Col>
            <Avatar size="large" className={styles.avatar} />
          </Col>
          <Col className={styles.about}>
            <About/>
          </Col>
        </Row>
        <Row justify="center">
          <Col className={styles.activity} span={24}>
            <Typography>
              <h2>Recent Activity:</h2>
            </Typography>
            <PostList postPropsList={sampleMessages}  />
          </Col>
        </Row>
      </div>
    </div>
  );
}