import { About } from '../../src/components/About';
import { Links } from '../../src/components/Links';
import PostFeed from '../../src/components/PostFeed';
import { Row, Col, Typography, Tabs } from 'antd';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PostResponse } from 'baobab-common';
import AvatarComponent from '../../src/components/AvatarComponent';

/**
 * Renders the profile page for that given user.
 */
export default function Profile(): JSX.Element {
  const { id } = useRouter().query;

  const fetchUserPosts = async (id: number, page: number) => {
    const newPosts = await axios.get('/api/post/userposts', {
      params: {
        id: id,
        start: (page - 1) * 5,
        end: page * 5,
      },
    });
    return newPosts.data;
  };

  return (
    <div>
      <div className={styles.body}>
        <Row>
          <Col span={2} />
          <Col span={4}>
            <Row>
              {id && <AvatarComponent id={parseInt(id as string, 10)} />}
            </Row>
            <Row justify="start">
              <div style={{ paddingLeft: '40px', paddingBottom: '20px' }}>
                <Links id={parseInt(id as string, 10)} />
              </div>
            </Row>
          </Col>
          <Col span={1} />
          <Col className={styles.tabContents} span={13}>
            <Tabs defaultActiveKey="profile" type="card">
              <Tabs.TabPane tab="Profile" key="profile">
                <Row>
                  <Col>{id && <About id={parseInt(id as string, 10)} />}</Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity" key="activity">
                <div>
                  <Typography>
                    <h2>Recent Activity:</h2>
                  </Typography>
                  {id && (
                    <PostRepliesFeedById
                      id={parseInt(id as string, 10)}
                      fetchPosts={fetchUserPosts}
                    />
                  )}
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
function PostRepliesFeedById(props: {
  id: number;
  fetchPosts: (id: number, page: number) => Promise<PostResponse[]>;
}): JSX.Element {
  return (
    <PostFeed
      fetchPosts={async (page: number) => {
        return await props.fetchPosts(props.id, page);
      }}
    />
  );
}
