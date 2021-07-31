import React, { useContext } from 'react';
import { AuthContext } from '../../src/providers/AuthProvider';
import { Col, Menu, Row, Typography } from 'antd';
import AuthComponent from './AuthComponent';
import Link from 'next/link';

/**
 * Navigation bar component.
 */
function Navbar(): JSX.Element {
  const authContext = useContext(AuthContext);
  const isMentor = authContext
    ? authContext.role.toString() === 'Mentor' : false;
  const isAdmin = authContext
    ? authContext.role.toString() === 'Admin' : false;
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
          <Menu.Item key="profiles">
            <Link href="/profiles/">Profiles</Link>
          </Menu.Item>
          <Menu.Item key="createTeam">
            <Link href="/createTeam/">Create Team</Link>
          </Menu.Item>
          {(isMentor || isAdmin) && (
            <Menu.Item key="createAssignment">
              <Link href="/createAssignment/">Create Assignment</Link>
            </Menu.Item>
          )}
          {isAdmin && (
            <Menu.Item key="adminRequest">
              <Link href="/adminRequest/">Admin Requests</Link>
            </Menu.Item>
          )}
        </Menu>
      </Col>
      <Col>
        <AuthComponent />
      </Col>
    </Row>
  );
}

export default Navbar;
