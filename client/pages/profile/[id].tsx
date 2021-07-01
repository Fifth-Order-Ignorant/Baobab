import { About } from '../../src/components/About';
import PostFeed from '../../src/components/PostFeed';
import { Avatar, Row, Col, Typography, Tabs } from 'antd';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PostResponse } from 'baobab-common';

/**
 * Renders the profile page for that given user.
 */
export default function Profile(): JSX.Element {

  const id = () => {
    const router = useRouter();
    return parseInt(router.query.id as unknown as string);
  }

  const fetchUserReplies = async (id: number, page: number) => {
    const newPosts = await axios.get('/api/post/userreplies', {
      params: {
        id: id,
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
                    <About id={id()} />
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity" key="activity">
                <div>
                  <Typography>
                    <h2>Recent Activity:</h2>
                  </Typography>
                  <PostRepliesFeedById id={id()} fetchPosts={fetchUserReplies} />
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

/**
 * Renders post replies based on the user id.
 * @param props Includes the id and fetchPosts function that takes in the id and page number.
 */
function PostRepliesFeedById(props: { id: number, fetchPosts: (id: number, page: number) => Promise<PostResponse[]> }): JSX.Element {
  return (
    <PostFeed fetchPosts={async (page: number) => { return await props.fetchPosts(props.id, page) }} />
  )
}