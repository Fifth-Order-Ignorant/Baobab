import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Typography,
} from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  CreateAssignmentRequest,
  CreateAssignmentRequestSchema,
  ErrorResponse,
  ResourceCreatedResponse,
} from 'baobab-common';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { RcFile } from 'antd/lib/upload';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import * as mime from 'mime';
import styles from '../../styles/CreateAssignment.module.css';

/**
 * Assignment creation form.
 */
function CreateAssignmentForm(): JSX.Element {
  const [created, setCreated] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateAssignmentRequest>({
    resolver: yupResolver(CreateAssignmentRequestSchema),
  });

  const [file, setFile] = useState<RcFile>();

  const onSubmit: SubmitHandler<CreateAssignmentRequest> = async (data) => {
    try {
      const id = (
        await axios.post<ResourceCreatedResponse>(
          '/api/assignment/create',
          data,
        )
      ).data.id;

      if (file) {
        const fileData = new FormData();
        fileData.append('fileup', file);

        axios
          .post(`/api/assignment/fileup/${id}`, fileData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(() => setCreated(true))
          .catch(() => message.error('File uploading failed.'));
      } else {
        setCreated(true);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { errors } = e.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof CreateAssignmentRequest, {
            message: error.message,
          });
        }
      }
    }
  };

  return (
    <div className={styles.body}>
      {created ? (
        <Typography.Title>Assignment has been created.</Typography.Title>
      ) : (
        <Form onFinish={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Item
                label="Assignment Title"
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="maxMark"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Form.Item
                label="This assignment will be out of "
                validateStatus={errors.maxMark ? 'error' : ''}
                help={errors.maxMark?.message}
              >
                <InputNumber {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Item
                label="Content"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description?.message}
              >
                <Input.TextArea {...field} />
              </Form.Item>
            )}
          />

          <Form.Item>
            <Upload
              maxCount={1}
              accept={`${mime.getType('jpg')}, ${mime.getType('png')}, 
                   ${mime.getType('pdf')}, ${mime.getType('mp3')},
                   ${mime.getType('mp4')}`}
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default CreateAssignmentForm;
