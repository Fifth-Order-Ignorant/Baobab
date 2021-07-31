import { Row, Col, Typography, List } from 'antd';
import React, { useState } from 'react';
import styles from '../styles/ProfileList.module.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Link from 'next/link';

/**
 * Interface for the props that are required for each assignment preview
 */
interface AssignmentPreviewProps {
  name: string;
  description: string;
  id: number;
  maxMark: string;
}

/**
 * Renders the "Assignments" page, where you can see a feed of all the assignments in the system
 */
const Assignments = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [assignmentList, setAssignmentList] = useState<
    AssignmentPreviewProps[]
  >([]);
  const fetchAssignments = async (page: number) => {
    const newAssignments = await axios.get('/api/assignment/pagination', {
      params: {
        start: (page - 1) * 10,
        end: page * 10,
      },
    });
    return newAssignments.data;
  };
  const loadMore = async (page: number) => {
    setLoading(true);

    const newAssignments = await fetchAssignments(page);

    if (newAssignments.length === 0) {
      setHasMore(false);
    } else {
      setAssignmentList(assignmentList.concat(newAssignments));
    }

    setLoading(false);
  };
  return (
    <div className={styles.mainContainer}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Assignments</h2>
          </Typography>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={!loading && hasMore}
          >
            <List
              itemLayout="horizontal"
              dataSource={assignmentList}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '10px 25px 10px 10px',
              }}
              size="large"
              renderItem={(item) => (
                <Link href={'/assignment/' + item.id}>
                  <a>
                    <List.Item
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <List.Item.Meta
                        title={item.name}
                        description={item.description}
                      />
                      {'-/' + item.maxMark}
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

export default Assignments;
