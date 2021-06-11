import { Button, Form, Input } from 'antd';
import {
  RegisterRequest,
  RegisterRequestSchema,
  ErrorResponse,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

function RegisterForm({ onSuccess }: { onSuccess: () => void }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterRequest>({
    resolver: yupResolver(RegisterRequestSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await axios.post('/api/user/register', data);
      await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password,
      });
      onSuccess();
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof RegisterRequest, {
          message: error.message,
        });
      }
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="First Name"
        name="firstName"
        validateStatus={errors.firstName ? 'error' : ''}
        help={errors.firstName?.message}
      >
        <Input {...register('firstName')} />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        validateStatus={errors.lastName ? 'error' : ''}
        help={errors.lastName?.message}
      >
        <Input {...register('lastName')} />
      </Form.Item>

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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
