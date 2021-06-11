import { About } from '../src/components/About';
import { MessageList } from '../src/components/MessageList';
import sampleMessages from '../src/constants/SampleMessageList';
import { Avatar, Row, Col, Typography } from 'antd';
import styles from '../styles/Profile.module.css';
import sampleProfile from '../src/constants/SampleProfile';

/**
 * Renders the profile page.
 */
export default function Profile(): JSX.Element {
  return (
    <div>
      <div className={styles.body}>
        <Row className={styles.header}>
          <Col>
            <Avatar size="large" className={styles.avatar} />
          </Col>
          <Col className={styles.about}>
            <About
              name={sampleProfile.name}
              role={sampleProfile.role}
              aboutMe={sampleProfile.aboutMe}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col className={styles.activity} span={24}>
            <Typography>
              <h2>Recent Activity:</h2>
            </Typography>
            <MessageList messagePropsList={sampleMessages} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
