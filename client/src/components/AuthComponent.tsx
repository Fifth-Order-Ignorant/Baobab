import { Button, Modal, Space, Typography } from 'antd';
import { useContext, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import Link from 'next/link';

/**
 * Component for displaying authentication buttons or current user.
 */
function AuthComponent(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isRegisterModal, setIsRegisterModal] = useState(true);

  const authState = useContext(AuthContext);

  if (!authState) {
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
          {isRegisterModal ? (
            <RegisterForm onSuccess={() => setIsModalVisible(false)} />
          ) : (
            <LoginForm onSuccess={() => setIsModalVisible(false)} />
          )}
        </Modal>
      </>
    );
  } else {
    return (
      <Space>
        <Link href={'/profile/' + authState.id.toString()}>
          <a>
            <Typography.Text>{authState.fullName}</Typography.Text>
          </a>
        </Link>
        <Button onClick={async () => await axios.get('/api/auth/logout')}>
          Logout
        </Button>
      </Space>
    );
  }
}

export default AuthComponent;
