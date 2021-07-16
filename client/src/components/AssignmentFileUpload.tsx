import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as mime from 'mime';
import axios from 'axios';

export interface AssignmentFileUploadProps {
  //uploadFile: (data: FormData) => Promise<R>;
}

/**
 * Renders the component that uploads the assignment
 * @param props Contains the function that handles the request
 */
export function AssignmentFileUpload() {
  return (
    <Upload
      maxCount={1}
      showUploadList={true}
      customRequest={(options) => {
        const data = new FormData();
        data.append('attachment', options.file);
        console.log(options);
        axios
          .post('/api/assignment/fileup', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((value) => {
            options.onSuccess?.(value.data, value.request);
          })
          .catch((reason) => {
            if (axios.isAxiosError(reason)) {
              options.onError?.(reason, reason.response?.data);
            }
          });
      }}
      accept={`${mime.getType('jpg')},
                     ${mime.getType('png')},
                     ${mime.getType('pdf')},
                     ${mime.getType('mp3')},
                     ${mime.getType('mp4')}`}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}
