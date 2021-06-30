import PostFeed from '../src/components/PostFeed';
import { Tabs, Avatar, Row, Col, Typography } from 'antd';
import { About } from '../src/components/About';
import axios from 'axios';

import styles from '../styles/Profile.module.css';

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {

  // TODO: Replace id with profile id.
  const fetchUserReplies = async (page: number) => {
    const newPosts = await axios.get('/api/post/userreplies', {
      params: {
        id: 0,
        start: (page - 1) * 5,
        end: page * 5,
      },
    });
    return newPosts.data;
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
                    <About />
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity" key="activity">
                <div>
                  <Typography>
                    <h2>Recent Activity:</h2>
                  </Typography>
                  <PostFeed fetchPosts={fetchUserReplies} />
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
