import { Row, Col, Typography, List, Avatar } from 'antd';
import React, { useState } from 'react';
import styles from '../styles/ProfileList.module.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { UserOutlined } from '@ant-design/icons';
/**
 * Interface for the props that are required for each profile preview
 */
interface ProfilePreviewProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
  id: number;
  // avatar: string
  // ^ not implemented yet
}

/**
 * Renders the "Profiles" page, where you can see a feed of all the profiles in the system
 */
const Profiles = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [profileList, setProfileList] = useState<ProfilePreviewProps[]>([]);
  const fetchProfiles = async (page: number) => {
    const newProfiles = await axios.get('/api/user/pagination', {
      params: {
        start: (page - 1) * 10,
        end: page * 10,
      },
    });
    return newProfiles.data;
  };
  const loadMore = async (page: number) => {
    setLoading(true);

    const newProfiles = await fetchProfiles(page);

    if (newProfiles.length === 0) {
      setHasMore(false);
    } else {
      setProfileList(profileList.concat(newProfiles));
    }

    setLoading(false);
  };
  return (
    <div className={styles.mainContainer}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Profiles</h2>
          </Typography>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={!loading && hasMore}
          >
            <List
              itemLayout="horizontal"
              dataSource={profileList}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '10px',
              }}
              size="large"
              renderItem={(item) => (
                <a
                  href={'/profile/' + item.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`/api/user/picture/${item.id.toString()}`}
                          icon={<UserOutlined />}
                        />
                      }
                      title={item.firstName + ' ' + item.lastName}
                      description={item.jobTitle}
                    />
                  </List.Item>
                </a>
              )}
            />
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
};

export default Profiles;
