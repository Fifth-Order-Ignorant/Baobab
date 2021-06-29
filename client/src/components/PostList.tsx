import { Post } from './Post';
import { List, Spin } from 'antd';
import { PostResponse } from 'baobab-common';
import axios from 'axios';
import React from 'react';

export interface PostListProps {
  /**
   *  List of posts
   */
  postPropsList: PostResponse[];
  /**
   * Whether more posts are loading.
   */
  isLoading: boolean;
  /**
   * Reply depth of post list.
   */
  depth: number;
}

/**
 * Renders a list of posts.
 */
export function PostList(props: PostListProps): JSX.Element {
  return (
    <List
      style={props.depth > 0 ? { marginTop: '24px' } : {}}
      dataSource={props.postPropsList}
      renderItem={(item) => (
        <li style={{ marginBottom: '24px' }}>
          <Post
            depth={props.depth}
            {...item}
            loadMoreReplies={async (page) => {
              const res = await axios.get('/api/post/replies', {
                params: {
                  id: item.postId,
                  start: page * 5,
                  end: (page + 1) * 5,
                },
              });

              return res.data;
            }}
          />
        </li>
      )}
    >
      {props.isLoading && <Spin />}
    </List>
  );
}
