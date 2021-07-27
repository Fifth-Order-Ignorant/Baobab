import React, { useState, useEffect } from 'react';
import { Table, TablePaginationConfig, Typography } from 'antd';

import {
  AssignmentSubmissionResponse,
  SubmissionPaginationResponse,
} from 'baobab-common';

export interface SubmissionTableProps {
  outOf: number;
  pageSize: number;
  fetchData: (page: number) => Promise<SubmissionPaginationResponse>;
}

const Download = (id: number) => {
  return (
    <Typography.Link href={`/api/submission/file/${id}`}>
      Download
    </Typography.Link>
  );
};

/**
 * Renders the submissions.
 */
export function SubmissionTable(props: SubmissionTableProps): JSX.Element {
  const [data, setData] = useState<AssignmentSubmissionResponse[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * Handles table changes in pagination
   * @param pagination page (note that the response gives index = page - 1)
   */
  const handleTableChange = async (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      fetch(pagination.current);
    }
  };

  /**
   * Fetch data and set states
   * NOTE: This assumes that fetchData will get the proper number of posts
   * @param page page #
   */
  const fetch = async (page: number) => {
    setLoading(true);
    const { data, total } = await props.fetchData(page - 1);
    setData(data);
    setCurrent(page);
    setTotal(total);
    setLoading(false);
  };

  useEffect(() => {
    fetch(current);
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Assignment',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => Download(id),
    },
    {
      title: 'Submitted On',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: `Mark (out of ${props.outOf})`,
      dataIndex: 'mark',
      key: 'mark',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={{
        current,
        total,
        pageSize: props.pageSize,
      }}
      onChange={handleTableChange}
    />
  );
}
