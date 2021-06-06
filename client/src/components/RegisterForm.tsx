import { Button, Form, Input } from 'antd';
import { RegisterRequest, RegisterRequestSchema } from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

function RegisterForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(RegisterRequestSchema),
  });

  const onSubmit = (data: RegisterRequest) =>
    axios.post('/api/user/register', data);

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
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
