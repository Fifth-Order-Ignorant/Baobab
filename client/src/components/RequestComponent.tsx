import { Comment, Avatar, List } from 'antd';
import Card from './Card';
import React, { useContext, useState } from 'react';
import styles from '../../styles/Request.module.css';
import { AuthContext } from '../providers/AuthProvider';
import { UserOutlined } from '@ant-design/icons';
import { Role } from '../../../server/src/entities/role.entity';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ErrorResponse,
  EditRoleRequest,
  EditRoleRequestSchema,
} from 'baobab-common';
import { useForm } from 'react-hook-form';

/**
 * Required props for rendering a request.
 */
type RequestProps = {
  /**
   * Id of the user.
   */
  id: number;
  /**
   * Description of why they want the role.
   */
  description: string;
  /**
   * The new role they want.
   */
  role: Role;
  /**
   * The id of the request.
   */
  requestId: number;
  /**
   * Name of user.
   */
  name: string;
};

/**
 * Renders the request component.
 */
export function RequestComponent(props: RequestProps): JSX.Element {
  const authState = useContext(AuthContext);
  const [visible, setVisible] = useState(true);

  const { setError } = useForm<EditRoleRequest>({
    resolver: yupResolver(EditRoleRequestSchema),
  });

  const submit = async (approved: boolean) => {
    const data = {
      requestId: props.requestId,
      isApproved: approved,
    } as EditRoleRequest;
    try {
      await axios.patch('/api/request/approve', data);
      setVisible(false);
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof EditRoleRequest, {
          message: error.message,
        });
      }
    }
  };

  return (
    <div>
      {authState && visible && (<Card>
      <div>
        
          <List>
            <List.Item>
              <Comment
                className={styles.postComment}
                actions={[
                  <span key="role">
                    <b>{props.role}</b>
                  </span>,
                  <span key="accept" onClick={() => submit(true)}>
                    Accept
                  </span>,
                  <span key="decline" onClick={() => submit(false)}>
                    Decline
                  </span>,
                ]}
                author={props.name}
                content={props.description}
                avatar={
                  <Avatar
                    src={`/api/user/picture/${props.id.toString()}`}
                    icon={<UserOutlined />}
                  />
                }
              />
            </List.Item>
          </List>
        
      </div>
    </Card>)}
    </div>

  );
}
