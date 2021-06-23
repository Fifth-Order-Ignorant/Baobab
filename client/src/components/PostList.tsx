import { Post, PostProps } from "./Post";
import { Col, Row } from "antd";

export interface PostListProps {
    /**
     *  List of posts
     */
    postPropsList: PostProps[];
    /**
     * Function that sends posts.
     */
     sendPost: (content: string, postId: number) => Promise<void>;
}

/**
 * Renders a list of posts.
 */
export function PostList(props: PostListProps): JSX.Element {
    return (
        <div>
            <Row gutter={[0, 24]}>
                {props.postPropsList.map((postProps) => (
                    <Col key={postProps.postId} span={24}>
                        <Post
                            author={postProps.author}
                            timestamp={postProps.timestamp}
                            content={postProps.content}
                            postId={postProps.postId}
                            sendPost={props.sendPost}
                        />
                    </Col>
                ))}
                <Col span={24} />
            </Row>
        </div>
    )
}