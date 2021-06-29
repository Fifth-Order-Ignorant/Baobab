import { Post, PostProps } from './Post';
import { List, Spin } from 'antd';

export interface PostListProps {
  /**
   *  List of posts
   */
  postPropsList: PostProps[];
  /**
   * Whether more posts are loading.
   */
  isLoading: boolean;
}

/**
 * Renders a list of posts.
 */
export function PostList(props: PostListProps): JSX.Element {
  return (
    <List
      dataSource={props.postPropsList}
      renderItem={(item) => (
        <li style={{ marginBottom: '24px' }}>
          <Post {...item} />
        </li>
      )}
    >
      {props.isLoading && <Spin />}
    </List>
  );
}
