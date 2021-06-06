import Card from './Card';
import { useState, ChangeEvent } from "react";
import { Avatar, Form, Input, Comment, Button, Col, Row } from 'antd';
import styles from "../../styles/Message.module.css";

export interface SendMessageProps {
    author: string;
}

export function SendMessage(props: SendMessageProps): JSX.Element {
    const [message, setMessage] = useState("");

    const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

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
                        actions={[<Button type="primary">Send</Button>]}
                    />
                </Card>
            </Col>
            <Col span={24} />
        </Row>
    );
}
