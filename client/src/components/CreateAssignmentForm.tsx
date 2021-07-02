import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, InputNumber, Typography } from "antd";
import React, { useState } from "react";
import {
    CreateAssignmentRequest,
    CreateAssignmentRequestSchema,
    ErrorResponse,
  } from 'baobab-common';
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "/styles/CreateAssignment.module.css";

function CreateAssignmentForm(): JSX.Element {

    const [state, setState] = useState('default');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateAssignmentRequest>({
        resolver: yupResolver(CreateAssignmentRequestSchema),
    })

    const onSubmit = async (data: CreateAssignmentRequest) => {
        data.description = document.getElementById("content")?.innerHTML;
        try {
          setState('done');
          await axios.post('/api/assignment/create', data);
        } catch (error) {
          const { errors } = error.response.data as ErrorResponse;
    
          for (const error of errors) {
            setError(error.path as keyof CreateAssignmentRequest, {
              message: error.message,
            });
          }
        }
      };

    return (
        <div>
            <div className={styles.body}>
                <Form onFinish={handleSubmit(onSubmit)} color="White">
                    {
                        state === 'done' && <Typography>
                            <h2>Assignment has been created.</h2>
                        </Typography>
                    }
                    {
                        state === 'default' && <Form.Item
                        label="Assignment Title"
                        name="title"
                        validateStatus={errors.name ? 'error': ''}
                        help={errors.name?.message}
                        >
                            <Input {...register('name')}/>
                        </Form.Item>
                    }
                    {
                        state === 'default' && <Form.Item
                        label="This assignment will be out of "
                        name="maxMark"
                        validateStatus={errors.maxMark ? 'error': ''}
                        help={errors.maxMark?.message}
                        >
                            <InputNumber defaultValue={1} min={1} {...register('maxMark')}/>
                        </Form.Item>
                    }
                    {
                        state === 'default' && <Form.Item
                        label="Content"
                        name="content"
                        validateStatus={errors.description ? 'error': ''}
                        help={errors.description?.message}
                        >
                            <Input.TextArea id="content" rows={3} {...register('description')}/>
                        </Form.Item>
                    }
                    {state === 'default' && <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            Create Assignment
                        </Button>
                    </Form.Item>}
                </Form>
            </div>
        </div>
    );
} export default CreateAssignmentForm;