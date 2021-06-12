import { Button, Select, Input, Form, Typography } from 'antd';
import {
  RoleRequest,
  RoleRequestSchema,
  ErrorResponse,
} from 'baobab-common';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import axios from 'axios';
import styles from "/styles/RoleRequest.module.css";

/**
 * Renders a textbox from input
 */
const { TextArea } = Input;

/**
 * Renders the entire form including dropdown and textarea to request role changes.
 */
function RoleRequestForm(): JSX.Element {

  const [state, setState] = useState('form');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RoleRequest>({
    resolver: yupResolver(RoleRequestSchema),
  });

  const onSubmit = async (data: RoleRequest) => {
    try {
      console.log(data);
      setState("done");
      await axios.post('/api/request/role', data);
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof RoleRequest, {
          message: error.message,
        });
      }
    }
  };

  return (
      <div>
        <div className={styles.body}>
          <div className={styles.header}>
<Form onFinish={handleSubmit(onSubmit)} color="White">
  <Typography>
    <h2>Fill out the following form to request a new role</h2>
  </Typography>

{state === 'form' && <Form.Item
label="Role"
name="role"
validateStatus={errors.role ? 'error' : ''}
help={errors.role?.message}
>
<Controller
render={({field}) => (
<Select {...field}>
  <Select.Option value="default">default</Select.Option>
  <Select.Option value="entrepeneur">entrepeneur</Select.Option>
  <Select.Option value="investor representative">investor representative</Select.Option>
  <Select.Option value="service provider representative">service provider representative</Select.Option>
</Select>
)}
name="role"
control={control}
/>
</Form.Item>}

{state === 'form' && <Form.Item
label="Reason"
name="description"
validateStatus={errors.description ? 'error' : ''}
help={errors.description?.message}
>
  <TextArea {...register('description')}/>
</Form.Item>}

{state === 'form' && <Form.Item>
  <Button type="primary" htmlType="submit" loading={isSubmitting}>
    <a>
      Submit
    </a>
  </Button>
</Form.Item>}
{state === 'done' && <h2>Request has been submitted.</h2>}

</Form>
          </div>
        </div>
      </div>
    );
  }
  
  export default RoleRequestForm;