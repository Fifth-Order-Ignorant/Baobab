import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, InputNumber, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  SingleAssignmentResponse,
  CreateAssignmentRequest,
  CreateAssignmentRequestSchema,
  ErrorResponse,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/CreateAssignment.module.css';
import * as mime from 'mime';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
/**
 * Renders form to upload assignment
 */
function CreateAssignmentForm(): JSX.Element {
  const [mark, setMark] = useState(1);

  const [state, setState] = useState('default');

  const [file, setFile] = useState<string | Blob | RcFile>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateAssignmentRequest>({
    resolver: yupResolver(CreateAssignmentRequestSchema),
  });

  const onSubmit = async (data: CreateAssignmentRequest) => {
    let id;
    data.maxMark = mark;
    data.description = document.getElementById('content')?.innerHTML as string;
    try {
      setState('done');
      await axios
        .post('/api/assignment/create', data)
        .then(
          (returned) => (id = (returned.data as SingleAssignmentResponse).id),
        );
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof CreateAssignmentRequest, {
          message: error.message,
        });
      }
    }
    if (file) {
      const data = new FormData();
      data.append('fileup', file);
      try {
        await axios.post(('/api/assignment/fileup/' + id) as string, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        const { errors } = error.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof CreateAssignmentRequest, {
            message: error.message,
          });
        }
      }
    }
  };
  useEffect(() => {
    setMark(
      document
        .getElementById('mark')
        ?.getAttribute('aria-valuenow') as unknown as number,
    );
  }, [setMark, mark]);

  return (
    <div>
      <div className={styles.body}>
        <Form onFinish={handleSubmit(onSubmit)} color="White">
          {state === 'done' && (
            <Typography>
              <h2>Assignment has been created.</h2>
            </Typography>
          )}
          {state === 'default' && (
            <Form.Item
              label="Assignment Title"
              name="title"
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name?.message}
            >
              <Input {...register('name')} />
            </Form.Item>
          )}
          {state === 'default' && (
            <Form.Item
              label="This assignment will be out of "
              name="maxMark"
              validateStatus={errors.maxMark ? 'error' : ''}
              help={errors.maxMark?.message}
            >
              <InputNumber
                id="mark"
                value={mark}
                min={1}
                {...register('maxMark')}
                onChange={setMark}
              />
            </Form.Item>
          )}
          {state === 'default' && (
            <Form.Item
              label="Content"
              name="content"
              validateStatus={errors.description ? 'error' : ''}
              help={errors.description?.message}
            >
              <Input.TextArea
                id="content"
                rows={3}
                {...register('description')}
              />
            </Form.Item>
          )}
          {state === 'default' && (
            <Form.Item
              label="File"
              name="file"
              validateStatus={errors.description ? 'error' : ''}
              help={errors.description?.message}
            >
              <Upload
                maxCount={1}
                beforeUpload={(options) => (setFile(options), false)}
                showUploadList={true}
                accept={`${mime.getType('jpg')},
                         ${mime.getType('png')},
                         ${mime.getType('pdf')},
                         ${mime.getType('mp3')},
                         ${mime.getType('mp4')}`}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          )}
          {state === 'default' && (
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Create Assignment
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
}
export default CreateAssignmentForm;
