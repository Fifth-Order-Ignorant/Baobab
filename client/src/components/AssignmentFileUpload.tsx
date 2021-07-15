import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as mime from 'mime';

export interface AssignmentFileUploadProps {
    uploadFile: (data: FormData) => Promise<R>; 
}

/**
 * Renders the component that uploads the assignment
 * @param props Contains the function that handles the request
 */
export function AssignmentFileUpload(props: AssignmentFileUploadProps) {
    return(
        <Upload
            maxCount={1}
            showUploadList={true}
            customRequest={(options) => {
                const data: FormData = new FormData();
                data.append('attachment', options.file);
                props.uploadFile(data).then((value) => {
                    options.onSuccess?(undefined);
                  });
            }
            }
            accept={`${mime.getType('jpg')},
                     ${mime.getType('png')},
                     ${mime.getType('pdf')},
                     ${mime.getType('mp3')},
                     ${mime.getType('mp4')}`}
        >
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    )
}
