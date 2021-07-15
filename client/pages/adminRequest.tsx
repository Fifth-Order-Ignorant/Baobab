import RequestFeed from '../src/components/RequestFeed';
import { Typography, Row, Col } from 'antd';

import styles from '../styles/Post.module.css';
import axios from 'axios';
import { useContext} from 'react';
import { AuthContext } from '../src/providers/AuthProvider';

/**
 * Renders the page for admins to review role requests.
 */
export default function adminRequest(): JSX.Element {
  const fetchRequests = async (page: number) => {
    const newRequests = await axios.get('/api/request/pagination', {
      params: {
        start: (page - 1) * 5,
        end: page * 5,
      },
    });
    return newRequests.data;
  };

  return (
    <div className={styles.feed}>
      <Row justify="center" align="middle">
        <Col flex="auto" span={16}>
          <Typography>
            <h2>Requests</h2>
          </Typography>
          <RequestFeed fetchRequests={fetchRequests}/>
        </Col>
      </Row>
    </div>
  );
}