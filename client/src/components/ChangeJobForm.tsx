import { Form, Button, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ErrorResponse, EditJobRequest, EditJobRequestSchema } from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

/**
 * Renders the textbox for editing the job, and displays it.
 */
function ChangeJobForm(): JSX.Element {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
      } = useForm<EditJobRequest>({
        resolver: yupResolver(EditJobRequestSchema),
      });
    
      const onSubmit = async (data: EditJobRequest) => {
        setInfo(data.jobTitle);
        console.log(data.jobTitle);
        try {
          await axios.post('/api/profile/editjob', data);
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
        axios.get('/api/profile/myprofile')
        .then((response) => {
          const returned = response.data as unknown as [
            string,
            string,
            string,
            string,
          ];
          var string = returned[2];
          if (string == "") {
            string = "no job listed";
          }
            setInfo(string);
        })
        .catch( error => {
            const { errors } = error.response.data as ErrorResponse;
    
          for (const error of errors) {
            setError(error.path as keyof EditJobRequest, {
              message: error.message,
            });
          }
        }
        )
        return info;
      };

    const [state, setState] = useState('default');
    const [info, setInfo] = useState('');

    const changeState = () => {
        console.log(state);
        if (state == 'default') {
            setState('edit');
        }
        else if (state == 'edit') {
            setState('done');
        }
    }

    useEffect(() => {
      GetInfo();
    }, []);

    return(
        <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item>
                <p onClick={()=>changeState()}>
                {
                  
                    state === 'default' && <h3>{info}</h3>
                }
                {
                  
                  state === 'done' && <h3>{info + " (reload to edit again)"}</h3>
              }
                </p>
                {
                    state === 'edit' && <Form.Item
                    name="job"
                    validateStatus={errors.jobTitle ? 'error' : ''}
                    help={errors.jobTitle?.message}
                  >
                    <Input defaultValue={info} {...register('jobTitle')}/>
                  </Form.Item>
                }
                {
                    state === 'edit' && <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        Change Job
                    </Button>
                }
            </Form.Item>
        </Form>
    )
} export default ChangeJobForm;