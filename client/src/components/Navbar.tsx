import { Button, Col, Menu, Row, Space, Typography } from 'antd';
import React from 'react';

function Navbar(): JSX.Element {
  return (
    <Row justify="space-between">
      <Col>
        <Typography.Text strong>Baobab</Typography.Text>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.Item>Social</Menu.Item>
          <Menu.Item>Education</Menu.Item>
          <Menu.Item>Discussion Board</Menu.Item>
          <Menu.Item>Messages</Menu.Item>
          <Menu.Item>Profiles</Menu.Item>
        </Menu>
      </Col>
      <Col>
        <Space>
          <Button type="primary">Register</Button>
          <Button>Login</Button>
        </Space>
      </Col>
    </Row>
  );
}

export default Navbar;
