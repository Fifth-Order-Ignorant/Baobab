import { Form, Button, Input } from 'antd';
import Card from './Card';
import { useEffect, useState } from 'react';
import {
  ErrorResponse,
  EditBioRequest,
  EditBioRequestSchema,
} from 'baobab-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

type Biography = {
  /**
   * Biography text.
   */
  bio: string;
  /**
   * Whether the biography can be edited.
   */
  canEdit: boolean;
};

/**
 * Renders the textbox for editing the bio, and displays it.
 */
function ChangeBioForm(bio: Biography): JSX.Element {
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
    data.bio = (document.getElementById('bio') as HTMLInputElement).value;
    setInfo(data.bio);
    try {
      await axios.patch('/api/profile/editbio', data);
      changeState();
      GetInfo();
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;

      for (const error of errors) {
        console.log(error)
        setError(error.path as keyof EditBioRequest, {
          message: error.message,
        });
      }
    }
  };

  useEffect(() => {
    setInfo(bio.bio);
  }, [bio]);

  const GetInfo = () => {
    axios
      .get('/api/profile/myprofile')
      .then((response) => {
        let string = response.data[3];
        if (string == '') {
          string = 'no bio available';
        }
        setInfo(string);
      })
      .catch((error) => {
        const { errors } = error.response.data as ErrorResponse;

        for (const error of errors) {
          setError(error.path as keyof EditBioRequest, {
            message: error.message,
          });
        }
      });
  };

  const changeState = () => {
    if (state == 'default' && bio.canEdit) {
      setState('edit');
    } else if (state == 'edit') {
      setState('default');
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <p onClick={() => changeState()}>
          {state === 'default' && <Card>{<div>{info}</div>}</Card>}
        </p>
        {state === 'edit' && (
          <Form.Item
            name="bio"
            validateStatus={errors.bio ? 'error' : ''}
            help={errors.bio?.message}
          >
            <Input.TextArea
              size="large"
              id={'bio'}
              defaultValue={info}
              {...register('bio')}
            />
          </Form.Item>
        )}
        {state === 'edit' && (
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Change Bio
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
export default ChangeBioForm;
