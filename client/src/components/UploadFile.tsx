import React, { useContext, useState } from 'react';
import * as mime from 'mime';
import { Button, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { useForm } from 'react-hook-form';
import {
  SubmissionCreateRequest,
  ResourceCreatedResponse,
  ErrorResponse,
} from 'baobab-common';
import axios from 'axios';
import { AuthContext } from 'src/providers/AuthProvider';

type Id = {
  /**
   * The ID of the assignment.
   */
  assignmentId: number;
};
/**
 * Renders component displaying a button so the user can upload
 * a submission file for their project.
 */

function UploadFile(info: Id): JSX.Element {
  const [file, setFile] = useState<string | Blob | RcFile>();
  const [status, setStatus] = useState('default');
  const authState = useContext(AuthContext);

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<SubmissionCreateRequest>({});

  const onSubmit = async () => {
    let id;
    try {
      await axios

        .put<ResourceCreatedResponse>('/api/submission/create', {
          assignmentId: info.assignmentId,
        })
        .then((returned) => (id = returned.data.id));
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof SubmissionCreateRequest, {
          message: error.message,
        });
      }
    }
    if (file) {
      const data = new FormData();
      data.append('fileup', file);
      try {
        await axios.post(('/api/submission/fileup/' + id) as string, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setStatus('default');
      } catch (error) {
        const { errors } = error.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof SubmissionCreateRequest, {
            message: error.message,
          });
        }
      }
    }
  };

  return (
    <div>
      {authState && (
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item>
            <h4>Upload Your Submission</h4>
          </Form.Item>
          <Form.Item>
            <Upload
              maxCount={1}
              beforeUpload={(options) => (
                setFile(options), setStatus('file'), false
              )}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={status != 'file'}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
export default UploadFile;
