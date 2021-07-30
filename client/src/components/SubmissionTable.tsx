import React, { useState, useEffect, Key } from 'react';
import { Button, Form, Input, InputNumber, Table, TablePaginationConfig, Typography } from 'antd';

import {
  UploadFeedbackRequest,
  UploadFeedbackRequestSchema,
  AssignmentSubmissionResponse,
  SubmissionPaginationResponse,
  ErrorResponse,
} from 'baobab-common';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
  const [edit, setEdit] = useState(-1);
  const [mark, setMark] = useState<number>();
  const [feedback, setFeedback] = useState<string>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UploadFeedbackRequest>({resolver: yupResolver(UploadFeedbackRequestSchema)});

  const onSubmit: SubmitHandler<UploadFeedbackRequest>= async(prop) => {
    prop.id = edit;
    const newData = data;
     newData[edit].mark = prop.mark;
     newData[edit].feedback = prop.feedback;
     setData(newData);
     try {
       await axios.patch('/api/submission/feedback', prop)
       UpdateOpen(edit);
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          const { errors } = e.response.data as ErrorResponse;
  
          for (const error of errors) {
            setError(error.path as keyof UploadFeedbackRequest, {
              message: error.message,
            });
          }
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

  const UpdateOpen=(index: number) => {
    if (edit == -1) {
    setEdit(index);
    }
    else if (edit == index) {
      setEdit(-1);
    }
    else {
      setEdit(edit);
    }
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
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
      editable: true,
    },
    {
      title: 'Submit',
      dataIndex: 'submit',
      key: 'submit',
      render: (submit: string, info: AssignmentSubmissionResponse, index: number) => {
        return(<Button onClick={()=> UpdateOpen(index)} disabled={edit!=-1}>
        Edit
      </Button>)
      },
    },
  ];
  return (
    <div>
    {edit != -1 && <Form onFinish={handleSubmit(onSubmit)}>
      
     <Controller
      name={"id"}
      control={control}
      defaultValue={edit}
      render={({field}) => (
      <Form.Item
      validateStatus={errors.mark ? 'error' : ''}
      help={errors.mark?.message}
      >
    {false && <InputNumber size={"small"} {...field}
      />}
      </Form.Item>
      )}
      />
      <h4>Feedback</h4>
      <Controller
      name={"mark"}
      control={control}
      defaultValue={data[edit].mark || 0}
      render={({field}) => (
      <Form.Item
      label={"New Mark"}
      validateStatus={errors.mark ? 'error' : ''}
      help={errors.mark?.message}
      >
    <InputNumber min={0} max={props.outOf} id={'mark'} {...field}
      />
      </Form.Item>
      )}
      />
      <Controller
      name={"feedback"}
      defaultValue={data[edit].feedback}
      control={control}
      render={({field}) => <Form.Item
      label={"Feedback:"}
        validateStatus={errors.feedback ? 'error' : ''}
        help={errors.feedback?.message}
      >
        <Input.TextArea {...field} />
      </Form.Item>
      }/>
      <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Update
      </Button>
            </Form.Item>
    </Form>}
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
    </div>
  );
}
