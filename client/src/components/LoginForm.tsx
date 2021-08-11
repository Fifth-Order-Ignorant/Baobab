import { Button, Form, Input } from 'antd';
import { ErrorResponse, LoginRequest, LoginRequestSchema } from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import styles from '../../styles/Form.module.css';

type LoginFormProps = {
  /**
   * Function to run on successful submission of form.
   */
  onSuccess: () => void;
};

/**
 * Form used for logging into an existing account.
 */
function LoginForm({ onSuccess }: LoginFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginRequest>({
    resolver: yupResolver(LoginRequestSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await axios.post('/api/auth/login', data);
      onSuccess();
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof LoginRequest, {
          message: error.message,
        });
      }
    }
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item
        label="Email"
        name="email"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Input {...register('email')} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
      >
        <Input.Password {...register('password')} />
      </Form.Item>

      <Form.Item className={styles.submit} wrapperCol={{ offset: 19, span: 5 }}>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
