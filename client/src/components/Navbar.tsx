import { Button, Col, Menu, Modal, Row, Space, Typography } from 'antd';
import AuthComponent from './AuthComponent';

function Navbar(): JSX.Element {
  return (
    <Row justify="space-between">
      <Col>
        <Typography.Text strong>Baobab</Typography.Text>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.Item key="social">Social</Menu.Item>
          <Menu.Item key="education">Education</Menu.Item>
          <Menu.Item key="discussionBoard">Discussion Board</Menu.Item>
          <Menu.Item key="messages">Messages</Menu.Item>
          <Menu.Item key="profiles">Profiles</Menu.Item>
        </Menu>
      </Col>
      <Col>
        <AuthComponent />
      </Col>
    </Row>
  );
}

export default Navbar;
