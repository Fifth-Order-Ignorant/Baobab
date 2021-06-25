import { PostList } from '../src/components/PostList';
import samplePosts from '../src/constants/SamplePostList';
import { Tabs, Avatar, Row, Col, Typography } from 'antd';
import { About } from '../src/components/About';

import styles from '../styles/Profile.module.css';

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {
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
                    <About />
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
