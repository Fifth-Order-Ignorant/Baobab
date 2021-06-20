import { Post, PostProps } from "./Post";
import { Col, Row } from "antd";

export interface PostListProps {
    /**
     *  List of messages
     */
    messagePropsList: PostListPropsWithId[];
}

export interface PostListPropsWithId extends PostProps {
    /**
     *  The messageId.
     */
    messageId: number;
}

/**
 * Renders a list of posts
 */
export function PostList(props: PostListProps): JSX.Element {
    return (
        <div>
            <Row gutter={[0, 24]}>
                {props.messagePropsList.map((messageProps) => (
                    <Col key={messageProps.messageId} span={24}>
                        <Post
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