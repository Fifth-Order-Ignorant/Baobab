import { Row, Col, Typography, List, Avatar } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ProfileList.module.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

interface ProfilePreviewProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
  id: number;
  // avatar: string
  // ^ not implemented yet
}

const Profiles = () => {
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
    console.log(newProfiles.data);
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
                <Link href={'/profile/' + item.id}>
                  <a>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={item.firstName + ' ' + item.lastName}
                        description={item.jobTitle}
                      />
                    </List.Item>
                  </a>
                </Link>
              )}
            />
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
};

export default Profiles;
