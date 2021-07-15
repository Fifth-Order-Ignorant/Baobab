import { Comment, Tooltip, Avatar, Button, List } from 'antd';
import Card from './Card';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Post.module.css';
import moment from 'moment';
import { ReplyPost } from './CreatePost';
import { PostList } from './PostList';
import { PostResponse, REPLY_LIMIT } from 'baobab-common';
import { AuthContext } from '../providers/AuthProvider';
import TagList from './TagList';
import SampleTags from '../constants/SampleTags';
// <TagList tags={SampleTags} />
import { UserOutlined } from '@ant-design/icons';
import { Request } from '../../../server/src/entities/request.entity';
import { Role } from '../../../server/src/entities/role.entity';
import { RequestStatus } from '../../../server/src/entities/requeststatus.entity';
import axios from 'axios';

/**
 * Required props for rendering a post.
 */
type RequestProps = {
  id: number;
  description: string;
  role: Role;
  status: RequestStatus;
}

/**
 * Renders the post component.
 */
export function RequestComponent(props: RequestProps): JSX.Element {

  const authState = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
        <List>
          <List.Item>
            {props.status === RequestStatus.PENDING && <Comment
              className={styles.postComment}
              actions={[
                <span
                  key="showReplies"
                  onClick={() => setShowReplies((prevState) => !prevState)}
                  style={{ display: 'none' }}
                >
                  Show Replies
                </span>,
                <span
                  key="reply"
                  style={{ display: 'none' }
                  }
                >
                  Reply to
                </span>,
              ]}
              author={firstName + " " + lastName}
              content={props.description}
              avatar={
                <Avatar
                  src={`/api/user/picture/${props.authorId.toString()}`}
                  icon={<UserOutlined />}
                />
              }
            />}
          </List.Item>
        </List>
      </div>
    </Card>
  );
}
