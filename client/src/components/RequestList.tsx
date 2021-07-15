import { Post } from './Post';
import { List, Spin } from 'antd';
import { PostResponse } from 'baobab-common';
import axios from 'axios';
import React from 'react';
import { RoleRequestResponse } from 'baobab-common';
import { RequestComponent } from './RequestComponent';

export interface PostListProps {
  /**
   *  List of posts
   */
  postPropsList: RoleRequestResponse[];
  /**
   * Whether more posts are loading.
   */
  isLoading: boolean;
}

/**
 * Renders a list of posts.
 */
export function RequestList(props: PostListProps): JSX.Element {
  return (
    <List
      dataSource={props.postPropsList}
      renderItem={(item) => (
        <li style={{marginTop: '24px', marginBottom: '24px' }}>
            <RequestComponent id={item.userId} description={item.description} role={item.role} requestId={item.requestId}/>
        </li>
      )}
    >
      {props.isLoading && <Spin />}
    </List>
  );
}
