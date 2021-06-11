import { Form, Button, Input } from 'antd';
import Card from "./Card";
import { useState } from 'react';
import { ErrorResponse, EditBioRequest, EditBioRequestSchema } from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

export interface Biography {
    bio: string;
}

function ChangeBioForm(): JSX.Element {

    const [state, setState] = useState('default');
    const [info, setInfo] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
      } = useForm<EditBioRequest>({
        resolver: yupResolver(EditBioRequestSchema),
      });
    
      const onSubmit = async (data: EditBioRequest) => {
        try {
            await axios.post('/api/user/editbio', data);
            changeState();
        } catch (error) {
          const { errors } = error.response.data as ErrorResponse;
    
          for (const error of errors) {
            setError(error.path as keyof EditBioRequest, {
              message: error.message,
            });
          }
        }
      };

      const GetInfo = () => {
        axios.get('/api/user/profile')
        .then((response) => {
          console.log(response);
            var returned = response as unknown as [string, string, string, string];
            console.log(returned);
            setInfo(returned[3]);
        })
        .catch( error => {
          console.log(error);
            const { errors } = error.response.data as ErrorResponse;
    
          for (const error of errors) {
            setError(error.path as keyof EditBioRequest, {
              message: error.message,
            });
          }
        }
        )
        return info;
      };

    const changeState = () => {
        console.log(state);
        if (state == 'default') {
            setState('edit');
        }
        else if (state == 'edit') {
            setState('default');
        }
    }

    return(
        <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item>
                <p onClick={()=>changeState()}>
                {
                    state === 'default' && <Card>{<div>{GetInfo()}</div>}</Card>
                }
                </p>
                {
                    state === 'edit' && <Form.Item name="bio" validateStatus={errors.bio ? 'error' : ''} help={errors.bio?.message}>
                        <Input.TextArea size="large" defaultValue={ GetInfo() } {...register('bio')}/>
                        </Form.Item>
                }
                {
                    state === 'edit' && <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        Change Bio
                    </Button>
                }
            </Form.Item>
        </Form>
    )
} export default ChangeBioForm;