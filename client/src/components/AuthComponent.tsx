import { Button, Form, Modal, Space, Typography } from 'antd';
import { useContext, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

function AuthComponent(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isRegisterModal, setIsRegisterModal] = useState(true);

  const { authState } = useContext(AuthContext);

  if (authState.jwt === '') {
    return (
      <>
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
        <Modal
          title={isRegisterModal ? 'Register' : 'Login'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form.Provider
            onFormFinish={() => {
              setIsModalVisible(false);
            }}
          >
            {isRegisterModal ? <RegisterForm /> : <LoginForm />}
          </Form.Provider>
        </Modal>
      </>
    );
  } else {
    return (
      <Space>
        <Typography.Text>{authState.payload?.fullName}</Typography.Text>
        <Button onClick={() => axios.get('/api/auth/logout')}>Logout</Button>
      </Space>
    );
  }
}

export default AuthComponent;
