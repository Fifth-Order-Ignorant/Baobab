import { Col, Menu, Row, Typography } from 'antd';
import AuthComponent from './AuthComponent';

/**
 * Navigation bar component.
 */
function Navbar(): JSX.Element {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Typography.Text strong>Baobab</Typography.Text>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.Item key="social">Social</Menu.Item>
          <Menu.Item key="education">Education</Menu.Item>
          <Menu.Item key="discussionBoard">Discussion Board</Menu.Item>
          <Menu.Item key="posts">Posts</Menu.Item>
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
