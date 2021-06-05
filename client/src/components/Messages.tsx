import { Message, MessageProps } from "./Message";
import { Col, Row } from "antd";

/**
 * Interface for Messages props which includes a list of MessageProps.
 */
export interface MessagesProps {
    messagePropsList: MessagePropsWithID[];
}

/**
 * Message Props that include the message ID.
 */
export interface MessagePropsWithID extends MessageProps {
    messageID: number;
}

/**
 * Renders a list of messages
 * @param messagesProps Props that include the following:
 *      - authorName: Author's name (first and last).
 *      - postTime: How long a message was sent.
 *      - content: Message content.
 *      - messageID: Number that identifies the message.
 */
export function Messages(messagesProps: MessagesProps): JSX.Element {
    return (
        <Row gutter={[0, 36]}>
            {messagesProps.messagePropsList.map((messageProps) => (
                <Col key={messageProps.messageID} span={24}>
                    <Message
                        author={messageProps.author}
                        postTime={messageProps.postTime}
                        content={messageProps.content}
                    />
                </Col>
            ))}
        </Row>
    )
}