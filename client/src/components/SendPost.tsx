import Card from './Card';
import { useState, ChangeEvent } from "react";
import { Avatar, Form, Input, Comment, Button, Col, Row } from 'antd';
import styles from "../../styles/Post.module.css";

/**
 * Interface for the SendPost props.
 */
export interface SendPostProps {
    /**
     * Post sender.
     */
    author: string;
    /**
     * Function that allows the user to send a post.
     */
     sendPost: (content: string) => Promise<void>;
}

/**
 * Renders a component that allows the user to send a post to the feed.
 */
export function SendPost(props: SendPostProps): JSX.Element {
    const [post, setPost] = useState("");

    /**
     * Updates post based on the message input.
     * @param event Textarea event which has the text contents inside.
     */
    const onPostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(event.target.value);
    };

    /**
     * Calls the passed in sendPost function.
     */
    const sendPost = async () => {
        await props.sendPost(post);
    }

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <Card>
                    <Comment
                        className={styles.postComment}
                        author={props.author}
                        avatar={<Avatar />}
                        content={
                            <Form.Item>
                                <Input.TextArea rows={4} onChange={onPostChange} value={post} />
                            </Form.Item>
                        }
                        actions={[
                        <Button type="primary" onClick={sendPost}>
                            Send
                        </Button>
                        ]}
                    />
                </Card>
            </Col>
            <Col span={24} />
        </Row>
    );
}
