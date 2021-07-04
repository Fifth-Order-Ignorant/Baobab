import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import styles from '../../styles/CreateTeam.module.css';
import {
  CreateTeamRequest,
  CreateTeamRequestSchema,
  ErrorResponse,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

function CreateTeamForm(): JSX.Element {
  const [state, setState] = useState('form');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateTeamRequest>({
    resolver: yupResolver(CreateTeamRequestSchema),
  });

  const onSubmit = async (data: CreateTeamRequest) => {
    try {
      await axios.post('/api/team/create', data)
      .then( _ => {
        setState('done');
      })
    }
    catch (error) {
      const { errors } = error.response.data as ErrorResponse;
      console.log(error);
      
      for (const error of errors) {
        setError(error.path as keyof CreateTeamRequest, {
          message: error.message,
        });
      }
      setState('form');
    } 

  };

  return (
    <div className={styles.body}>
      <Form onFinish={handleSubmit(onSubmit)} color="White">
        {state === 'form' && (
          <Form.Item
            label="Name of your team"
            name="name"
            validateStatus={errors.teamName ? 'error' : ''}
            help={errors.teamName?.message}
          >
            <Input {...register('teamName')} />
          </Form.Item>
        )}
        {state === 'done' && <h2>Team has been created.</h2>}
        {state === 'form' && (
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Create Team
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}
export default CreateTeamForm;
