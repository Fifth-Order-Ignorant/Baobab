import React, { useState, useEffect, Key } from 'react';
import { Button, Form, Input, InputNumber, Table, TablePaginationConfig, Typography } from 'antd';

import {
  UploadFeedbackRequest,
  UploadFeedbackRequestSchema,
  AssignmentSubmissionResponse,
  SubmissionPaginationResponse,
  ErrorResponse,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

export interface SubmissionTableProps {
  outOf: number;
  pageSize: number;
  fetchData: (page: number) => Promise<SubmissionPaginationResponse>;
}

/**
 * Renders the submissions.
 */
export function SubmissionTable(props: SubmissionTableProps): JSX.Element {
  const [data, setData] = useState<AssignmentSubmissionResponse[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<Array<boolean>>(new Array(data.length));
  const [edit, setEdit] = useState(-1);

  const {
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UploadFeedbackRequest>({resolver: yupResolver(UploadFeedbackRequestSchema)});

  const Update= async(subId: number, index: number) => {
    let newMark = document
    .getElementById('mark' + index)
    ?.getAttribute('aria-valuenow') as unknown as number;
    let newFeedback = document.getElementById("feedback" + 0)?.innerHTML as string;
     const newData = data;
     newData[index].mark = newMark;
     newData[index].feedback = newFeedback;
     setData(newData);
     try {
       await axios.patch('/api/submission/feedback', {id: subId, feedback: newFeedback, mark: newMark})
       UpdateOpen(index, false);
      } catch (error) {
      const { errors } = error.response.data as ErrorResponse;
      for (const error of errors) {
        console.log(error);
        setError(error.path as keyof UploadFeedbackRequest, {
          message: error.message,
        });
      }
    }
  }

  const Download = (id: number) => {
    return (
      <Typography.Link href={`/api/submission/file/${id}`}>
        Download
      </Typography.Link>
    );
  };

  const UpdateOpen=(index: number, set: boolean) => {
    let newArray = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      newArray[i] = false;
    }
    if (edit == -1) {
    newArray[index] = true;
    setOpen(newArray);
    setEdit(index);
    }
    else if (edit == index) {
      setOpen(newArray);
      setEdit(-1);
    }
    else {
      setEdit(edit);
    }
  }
  
  const EditMark=(maxMark: number, index: number) => {
    return(
      <Form.Item
      name={"mark"}
      validateStatus={errors.mark ? 'error' : ''}
      help={errors.mark?.message}
      >
    <InputNumber
      id={"mark" + index}
      key={"mark"+index}
      defaultValue={data[index].mark || 0}
      min={0}
      max={maxMark}
      />
      </Form.Item>
    )
  }

  const EditFeedback=(index: number) => {
    return(
      <Form.Item
      name={"feedback"}
      validateStatus={errors.feedback ? 'error' : ''}
      help={errors.feedback?.message}
      >
    <Input.TextArea
      id={"feedback" + index}
      key={"feedback"+index}
      defaultValue={data[index].feedback}
      />
      </Form.Item>
    )
  }

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
    let newArray = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      newArray[i] = false;
    }
    setOpen(newArray);
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
      editable: true,
      render: (mark: number, info: AssignmentSubmissionResponse, index: number) => {
        return open[index] ? (
          EditMark(mark, index)
        ):(
          mark
        )
      },
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
      editable: true,
      render: (feedback: string, info: AssignmentSubmissionResponse, index: number) => {
        return open[index] ? (
          EditFeedback(index)
        ):(
          feedback
        )
      },
    },
    {
      title: 'Submit',
      dataIndex: 'submit',
      key: 'submit',
      render: (submit: string, info: AssignmentSubmissionResponse, index: number) => {
        return open[index] ? (
          <Button onClick={()=> Update(info.id, index)}>
        Update
      </Button>
        ):(
      <Button onClick={()=> UpdateOpen(index, true)}>
        Edit
      </Button>
        )
      },
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
