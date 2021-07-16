import { List, Spin } from 'antd';
import React from 'react';
import { RoleRequestResponse } from 'baobab-common';
import { RequestComponent } from './RequestComponent';

export interface RequestListProps {
  /**
   *  List of Requests.
   */
  requestPropsList: RoleRequestResponse[];
  /**
   * Whether more requests are loading.
   */
  isLoading: boolean;
}

/**
 * Renders a list of requests.
 */
export function RequestList(props: RequestListProps): JSX.Element {
  return (
    <List
      dataSource={props.requestPropsList}
      renderItem={(item) => (
        <li style={{ marginTop: '24px', marginBottom: '24px' }}>
          <RequestComponent
            id={item.userId}
            description={item.description}
            role={item.role}
            requestId={item.requestId}
          />
        </li>
      )}
    >
      {props.isLoading && <Spin />}
    </List>
  );
}
