import { Form, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import {
  ErrorResponse,
  EditNameRequest,
  EditNameRequestSchema,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

export interface Name {
  firstName: string;
  lastName: string;
}

function ChangeNameForm(): JSX.Element {
  const [state, setState] = useState('default');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditNameRequest>({
    resolver: yupResolver(EditNameRequestSchema),
  });

  const onSubmit = async (data: EditNameRequest) => {
    console.log(data);
    try {
      await axios.post('/api/profile/editname', data);
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof EditNameRequest, {
          message: error.message,
        });
      }
    }
  };

  const GetFirstName = () => {
    axios
      .get('/api/profile/myprofile')
      .then((response) => {
        const returned = response.data as unknown as [
          string,
          string,
          string,
          string,
        ];
        setFirstName(returned[0]);
      })
      .catch((error) => {
        const { errors } = error.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof EditNameRequest, {
            message: error.message,
          });
        }
      });
  };

  const GetLastName = () => {
    axios
      .get('/api/profile/myprofile')
      .then((response) => {
        console.log(response);
        const returned = response.data as unknown as [
          string,
          string,
          string,
          string,
        ];
        setLastName(returned[1]);
      })
      .catch((error) => {
        const { errors } = error.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof EditNameRequest, {
            message: error.message,
          });
        }
      });
  };

  const changeState = () => {
    console.log(state);
    if (state == 'default') {
      setState('edit');
    } else if (state == 'edit') {
      setState('default');
    }
  };

  useEffect(() => {
    GetFirstName();
    GetLastName();
  }, []);

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <p onClick={() => changeState()}>
          {state === 'default' && <h3>{firstName + ' ' + lastName}</h3>}
        </p>
        {state === 'edit' && (
          <Form.Item
            name="firstName"
            style={{ display: 'inline-block', width: '50%' }}
            validateStatus={errors.firstName ? 'error' : ''}
            help={errors.firstName?.message}
          >
            <Input
              size="large"
              defaultValue={firstName}
              {...register('firstName')}
            />
          </Form.Item>
        )}
        {state === 'edit' && (
          <Form.Item
            name="lastName"
            style={{ display: 'inline-block', width: '50%' }}
            validateStatus={errors.lastName ? 'error' : ''}
            help={errors.lastName?.message}
          >
            <Input
              size="large"
              defaultValue={lastName}
              {...register('lastName')}
            />
          </Form.Item>
        )}
        {state === 'edit' && (
          <Button type="primary" htmlType="submit" loading={isSubmitting} onSubmit={()=>changeState()}>
            Change Name
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
export default ChangeNameForm;