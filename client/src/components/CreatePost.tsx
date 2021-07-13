import Card from './Card';
import React, { useState, ChangeEvent } from 'react';
import {
  Avatar,
  Form,
  Input,
  Comment,
  Button,
  List,
  message,
  Row,
  Col,
} from 'antd';
import styles from '../../styles/Post.module.css';
import { PostRequest } from 'baobab-common';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import SetTagList from './SetTagList';

/**
 * Interface for the SendPost props.
 */
interface SendPostProps extends CreatePostProps {
  /**
   * Function that allows the user to send a post.
   */
  sendPost: (content: string, tags: string[]) => Promise<void>;
}

/**
 * Renders a component that allows the user to send a post to the feed.
 */
function SendPost(props: SendPostProps): JSX.Element {
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  /**
   * Updates post based on the post input.
   * @param event Textarea event which has the text contents inside.
   */
  const onPostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  /**
   * Calls the passed in sendPost function.
   */
  const sendPost = async () => {
    setLoading(true);

    await props.sendPost(post, tags);

    setLoading(false);
    setPost('');
  };

  return (
    <div>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card>
            <List>
              <List.Item>
                <Col span={24}>
                  <Comment
                    className={styles.postComment}
                    author={props.author}
                    avatar={
                      <Avatar
                        src={`/api/user/picture/${props.authorId.toString()}`}
                        icon={<UserOutlined />}
                      />
                    }
                    content={
                      <Form.Item>
                        <Input.TextArea
                          rows={4}
                          onChange={onPostChange}
                          value={post}
                        />
                      </Form.Item>
                    }
                    actions={[
                      <Button
                        key="send"
                        type="primary"
                        onClick={sendPost}
                        loading={loading}
                      >
                        Send
                      </Button>,
                    ]}
                  />
                </Col>
              </List.Item>
              <List.Item>
                <Col span={24}>
                  <SetTagList onTagChange={setTags} />
                </Col>
              </List.Item>
            </List>
          </Card>
        </Col>
        <Col span={24} />
      </Row>
    </div>
  );
}

interface CreatePostProps {
  /**
   * Post sender.
   */
  author: string;
  /**
   * Post sender ID.
   */
  authorId: number;
}

const sendPost = async (
  content: string,
  parentPostId: number,
  tags: string[],
): Promise<void> => {
  const pr: PostRequest = {
    content: content,
    parentId: parentPostId,
    tags: tags,
  };
  try {
    await axios.post('/api/post/create', pr);
  } catch (e) {
    // typescript good practice: https://github.com/axios/axios#typescript
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          message.error('Request made with invalid session.');
      }
    }
  }
};

/**
 * Renders a component that allows the user to send an original post.
 */
export function CreatePost(props: CreatePostProps): JSX.Element {
  return (
    <SendPost
      author={props.author}
      authorId={props.authorId}
      sendPost={(content, tags) => sendPost(content, -1, tags)}
    />
  );
}

interface ReplyPostProps extends CreatePostProps {
  /**
   * ID of parent post.
   */
  parent: number;
  tags: string[];
}

/**
 * Renders a component that allows the user to send a reply post.
 */
export function ReplyPost(props: ReplyPostProps): JSX.Element {
  return (
    <SendPost
      author={props.author}
      authorId={props.authorId}
      sendPost={(content, tags) => sendPost(content, props.parent, tags)}
    />
  );
}
