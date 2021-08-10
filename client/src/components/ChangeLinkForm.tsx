import { Form, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  ErrorResponse,
  EditLinksRequest,
  EditLinksRequestSchema,
} from 'baobab-common';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

type Link = {
  /**
   * A list of links on the user's profile
   */
  links: string[];
  /**
   * Whether the links can be edited
   */
  canEdit: boolean;
};

/**
 * Renders the textbook for editing the links, and displays them
 */
export default function ChangeLinksForm(linkProps: Link): JSX.Element {
  const [state, setState] = useState('default');
  const [links, setLinks] = useState<string[]>([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditLinksRequest>({
    resolver: yupResolver(EditLinksRequestSchema),
  });

  const onSubmit = async (data: EditLinksRequest) => {
    try {
      await axios.patch('/api/profile/editlinks', data);
      changeState();
      setLinks(data.links);
    } catch (error) {
      const { errors } = error.response.data as ErrorResponse;
      console.log(errors);
    }
  };

  const changeState = () => {
    if (state == 'default' && linkProps.canEdit) {
      setState('edit');
    } else if (state == 'edit') {
      setState('default');
    }
  };

  useEffect(() => {
    setLinks(linkProps.links);
  }, [linkProps]);

  useEffect(() => {
    setLinks(linkProps.links);
  }, []);

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="links.0"
        defaultValue=""
        render={({ field }) => (
          <Form.Item>
            <div>
              {state === 'default' && links[0] != '' && (
                <a href={links[0]} target="_blank" rel="noreferrer">
                  {links[0]}
                </a>
              )}
              {state === 'default' && links[0] == '' && (
                <p>No Link Available</p>
              )}
            </div>
            {state === 'edit' && (
              <Form.Item
                name="link.0"
                style={{ display: 'inline-block', width: '50%' }}
                validateStatus={errors.links ? 'error' : ''}
              >
                <Input size="large" {...field} />
              </Form.Item>
            )}
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="links.1"
        defaultValue=""
        render={({ field }) => (
          <Form.Item>
            <div>
              {state === 'default' && links[1] != '' && (
                <a href={links[1]} target="_blank" rel="noreferrer">
                  {links[1]}
                </a>
              )}
              {state === 'default' && links[1] == '' && (
                <p>No Link Available</p>
              )}{' '}
            </div>
            {state === 'edit' && (
              <Form.Item
                name="link.1"
                style={{ display: 'inline-block', width: '50%' }}
                validateStatus={errors.links ? 'error' : ''}
              >
                <Input size="large" {...field} />
              </Form.Item>
            )}
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="links.2"
        defaultValue=""
        render={({ field }) => (
          <Form.Item>
            <div>
              {state === 'default' && links[2] != '' && (
                <a href={links[2]} target="_blank" rel="noreferrer">
                  {links[2]}
                </a>
              )}
              {state === 'default' && links[2] == '' && (
                <p>No Link Available</p>
              )}{' '}
            </div>
            {state === 'edit' && (
              <Form.Item
                name="link.2"
                style={{ display: 'inline-block', width: '50%' }}
                validateStatus={errors.links ? 'error' : ''}
              >
                <Input size="large" {...field} />
              </Form.Item>
            )}
          </Form.Item>
        )}
      />
      {state === 'edit' && (
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      )}
      {state !== 'edit' && (
        <Button onClick={changeState} block>
          Edit Links
        </Button>
      )}
    </Form>
  );
}
