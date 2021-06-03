import { Button, Col, Menu, Modal, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function Navbar(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isRegisterModal, setIsRegisterModal] = useState(true);

  return (
    <>
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
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setIsRegisterModal(true);
                setIsModalVisible(true);
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => {
                setIsRegisterModal(false);
                setIsModalVisible(true);
              }}
            >
              Login
            </Button>
          </Space>
        </Col>
      </Row>
      <Modal
        title={isRegisterModal ? 'Register' : 'Login'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {isRegisterModal ? <RegisterForm /> : <LoginForm />}
      </Modal>
    </>
  );
}

export default Navbar;
