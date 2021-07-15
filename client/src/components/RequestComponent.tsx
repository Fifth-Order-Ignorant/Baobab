import { Comment, Avatar, List } from 'antd';
import Card from './Card';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Post.module.css';
import { AuthContext } from '../providers/AuthProvider';
// <TagList tags={SampleTags} />
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
 * Required props for rendering a post.
 */
type RequestProps = {
  id: number;
  description: string;
  role: Role;
  requestId: number;
}

/**
 * Renders the post component.
 */
export function RequestComponent(props: RequestProps): JSX.Element {

  const authState = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [visible, setVisible] = useState(true);

  const {
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditRoleRequest>({
    resolver: yupResolver(EditRoleRequestSchema),
  });

  const submit = async (approved: boolean) => {
    const data = {"requestId": props.requestId, "isApproved": approved} as EditRoleRequest;
    console.log(data);
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

  const getInfo = () => {
    axios.post('/api/user/view', { userId: props.id }).then((response) => {
      setFirstName(response.data[0]);
      setLastName(response.data[1]);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);


  return (
    <Card>
      <div>
        {visible && <List>
          <List.Item>
            <Comment
              className={styles.postComment}
              actions={[
                <span>
                  <b>{props.role}</b>
                </span>,
                <span
                  key="accept"
                  onClick={()=>submit(true)}
                >
                  Accept
                </span>,
                <span
                  key="decline"
                  onClick={()=>submit(false)}
                >
                  Decline
                </span>,
              ]}
              author={firstName + " " + lastName}
              content={props.description}
              avatar={
                <Avatar
                  src={`/api/user/picture/${props.id.toString()}`}
                  icon={<UserOutlined />}
                />
              }
            />
          </List.Item>
        </List>}
      </div>
    </Card>
  );
}
