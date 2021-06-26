import { About } from '../../src/components/About';
import { PostList } from '../../src/components/PostList';
import sampleMessages from '../../src/constants/SamplePostList';
import { Avatar, Row, Col, Typography, Tabs } from 'antd';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';
import samplePosts from '../../src/constants/SamplePostList';

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {
  const id = () => {
      const router = useRouter();
      return parseInt(router.query.id as unknown as string);
  }

  return (
    <div>
      <div className={styles.body}>
        <Row>
          <Col span={2} />
          <Col span={4}>
            <Avatar className={styles.avatar} />
          </Col>
          <Col span={1} />
          <Col className={styles.tabContents} span={13}>
            <Tabs defaultActiveKey="profile" type="card">
              <Tabs.TabPane tab="Profile" key="profile">
                <Row>
                  <Col>
                    <About id={ id()} />
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity" key="activity">
                <div>
                  <Typography>
                    <h2>Recent Activity:</h2>
                  </Typography>
                  <PostList postPropsList={samplePosts} />
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={2} />
        </Row>
      </div>
    </div>
  );
}