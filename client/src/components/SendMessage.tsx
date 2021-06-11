import Card from './Card';
import { useState, ChangeEvent } from "react";
import { Avatar, Form, Input, Comment, Button, Col, Row } from 'antd';
import styles from "../../styles/Message.module.css";

/**
 * Interface for the SendMessage props.
 */
export interface SendMessageProps {
    author: string;
    sendMessage: () => Promise<void>;
}

/**
 * Renders a component that allows the user to send a message to the feed.
 * @param props Props that include the following:
 *      - author: The author's first and last name.
 */
export function SendMessage(props: SendMessageProps): JSX.Element {
    const [message, setMessage] = useState("");

    const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const sendMessage = async () => {
        await props.sendMessage(message);
    }

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <Card>
                    <Comment
                        className={styles.messageComment}
                        author={props.author}
                        avatar={<Avatar />}
                        content={
                            <Form.Item>
                                <Input.TextArea rows={4} onChange={onMessageChange} value={message} />
                            </Form.Item>
                        }
                        actions={[
                        <Button type="primary" onClick={sendMessage}>
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
