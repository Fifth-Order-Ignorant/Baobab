import React, { useState } from "react"
import * as mime from 'mime';
import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import { useForm } from "react-hook-form";
import {
    SubmissionCreateRequest,
    ResourceCreatedResponse,

    ErrorResponse
} from 'baobab-common';
import axios from 'axios';

type Ids = {
    userId: number;
    assignmentId: number;
}

function UploadFile(info: Ids): JSX.Element {
    const [file, setFile] = useState<string | Blob | RcFile>();

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
      } = useForm<SubmissionCreateRequest>({
      });

    const onSubmit = async() => {
        let id;
        try {
            await axios
            .post('/api/submission/create', {"userId": info.userId, "assignmentId": info.assignmentId})
            .then(
                returned => id = (returned.data as ResourceCreatedResponse).id
            );
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
            } catch (error) {
              const { errors } = error.response.data as ErrorResponse;
      
              for (const error of errors) {
                setError(error.path as keyof SubmissionCreateRequest, {
                  message: error.message,
                });
              }
            }
          }
    }
      
    return(
    <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item>
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
        <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Submit
              </Button>
        </Form.Item>
    </Form>
    )
}
export default UploadFile


