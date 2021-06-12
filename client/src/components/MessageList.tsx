import { Message, MessageProps } from "./Message";
import { Col, Row } from "antd";

export interface MessageListProps {
    /**
     *  List of messages
     */
    messagePropsList: MessagePropsWithID[];
}

export interface MessagePropsWithID extends MessageProps {
    /**
     *  The messageID.
     */
    messageID: number;
}

/**
 * Renders a list of messages
 */
export function MessageList(props: MessageListProps): JSX.Element {
    return (
        <div>
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