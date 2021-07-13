import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Avatar, Spin, Upload } from 'antd';
import styles from '../../styles/Profile.module.css';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as mime from 'mime';

type AvatarComponentProps = {
  /**
   * ID of user whose avatar to render.
   */
  id: number;
};

/**
 * Component for displaying a profile's avatar.
 */
function AvatarComponent({ id }: AvatarComponentProps): JSX.Element {
  const authState = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <style global jsx>{
        // must be global to prevent library classes like .ant-upload from being
        // mangled
        `
          .avatar-uploader > .ant-upload {
            width: 200px;
            height: 200px;
            margin: -100px 40px 40px 40px;
            border-radius: 50%;
          }
          .ant-upload.ant-upload-disabled {
            cursor: default;
          }
        `
      }</style>
      <Upload
        disabled={id !== authState?.id}
        listType="picture-card"
        maxCount={1}
        showUploadList={false}
        className="avatar-uploader"
        accept={`${mime.getType('jpg')},${mime.getType('png')}`}
        customRequest={(options) => {
          const data = new FormData();
          data.append('picture', options.file);
          setLoading(true);
          axios
            .post('/api/profile/picture', data, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((value) => {
              options.onSuccess?.(value.data, value.request);
            })
            .catch((reason) => {
              if (axios.isAxiosError(reason)) {
                options.onError?.(reason, reason.response?.data);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        {loading ? (
          <Spin />
        ) : (
          <Avatar
            size={200}
            className={styles.avatar}
            // ignore cache on own profile so picture changes reflect
            // immediately to not confuse the user
            src={`/api/user/picture/${id.toString()}${
              id === authState?.id ? `?cacheBreak=${new Date().getTime()}` : ''
            }`}
            icon={<UserOutlined />}
          />
        )}
      </Upload>
    </>
  );
}

export default AvatarComponent;
