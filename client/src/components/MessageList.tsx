import { Message, MessageProps } from "./Message";
import { Col, Row, Typography } from "antd";

/**
 * Interface for Messages props which includes a list of MessageProps.
 */
export interface MessageListProps {
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
export function MessageList(props: MessageListProps): JSX.Element {
    return (
        <div>
            <Typography>
                <h2>Feed</h2>
            </Typography>
            <Row gutter={[0, 24]}>
                {props.messagePropsList.map((messageProps) => (
                    <Col key={messageProps.messageID} span={24}>
                        <Message
                            author={messageProps.author}
                            timestamp={messageProps.timestamp}
                            content={messageProps.content}
                        />
                    </Col>
                ))}
                <Col span={24} />
            </Row>
        </div>
    )
}