import { Form, Button, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
  ErrorResponse,
  EditJobRequest,
  EditJobRequestSchema,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

type Job = {
  /**
   * Job string.
   */
  job: string;
  /**
   * Whether the job can be edited.
   */
  canEdit: boolean;
};
/**
 * Renders the textbox for editing the job, and displays it.
 */
function ChangeJobForm(job: Job): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditJobRequest>({
    resolver: yupResolver(EditJobRequestSchema),
  });

  const onSubmit = async (data: EditJobRequest) => {
    data.jobTitle = (document.getElementById('job') as HTMLInputElement).value;
    setInfo(data.jobTitle);
    try {
      await axios.patch('/api/profile/editjob', data);
      changeState();
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        setError(error.path as keyof EditJobRequest, {
          message: error.message,
        });
      }
    }
  };

  const GetInfo = () => {
    axios
      .get('/api/profile/myprofile')
      .then((response) => {
        let string = response.data[2];
        if (string == '') {
          string = 'no job listed';
        }
        setInfo(string);
      })
      .catch((error) => {
        const { errors } = error.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof EditJobRequest, {
            message: error.message,
          });
        }
      });
  };

  const [state, setState] = useState('default');
  const [info, setInfo] = useState('');

  const changeState = () => {
    console.log(state);
    if (state == 'default' && job.canEdit) {
      setState('edit');
    } else if (state == 'edit') {
      setState('default');
    }
  };

  useEffect(() => {
    setInfo(job.job);
  }, [job]);

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <p onClick={() => changeState()}>
          {state === 'default' && <h3>{info}</h3>}
        </p>
        {state === 'edit' && (
          <Form.Item
            name="job"
            validateStatus={errors.jobTitle ? 'error' : ''}
            help={errors.jobTitle?.message}
          >
            <Input defaultValue={info} id="job" {...register('jobTitle')} />
          </Form.Item>
        )}
        {state === 'edit' && (
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Change Job
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
export default ChangeJobForm;
