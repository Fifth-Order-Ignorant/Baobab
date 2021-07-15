import { Col, Menu, Row, Typography } from 'antd';
import AuthComponent from './AuthComponent';
import Link from 'next/link';

/**
 * Navigation bar component.
 */
function Navbar(): JSX.Element {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Link href="/">
          <a>
            <Typography.Text strong>Baobab</Typography.Text>
          </a>
        </Link>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.Item key="social">
            <Link href="/feed/">Social</Link>
          </Menu.Item>
          <Menu.Item key="education">
            <Link href="/assignments/">Education</Link>
          </Menu.Item>
          <Menu.Item key="discussionBoard">Discussion Board</Menu.Item>
          <Menu.Item key="posts">Posts</Menu.Item>
          <Menu.Item key="profiles">
            <Link href="/profiles/">Profiles</Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col>
        <AuthComponent />
      </Col>
    </Row>
  );
}

export default Navbar;
