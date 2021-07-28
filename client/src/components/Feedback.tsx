import { Button, Input, InputNumber } from "antd";
import { Form } from 'antd';
import { UploadFeedbackRequest, UploadFeedbackRequestSchema } from "baobab-common";
import React, { useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

type Info={
    id: number;
    maxMark: number;
}

function Feedback(info: Info): JSX.Element {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
      } = useForm<UploadFeedbackRequest>({
        resolver: yupResolver(UploadFeedbackRequestSchema),
      });
      const [mark, setMark] = useState(1);

      const onSubmit
      
    return(
        <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item>
                <h4>Feedback</h4>
            </Form.Item>
            <Form.Item
            label={"Mark out of " + info.maxMark}
            name="mark"
            validateStatus={errors.mark ? 'error' : ''}
            help={errors.mark?.message}
          >
                <InputNumber
                id="mark"
                value={info.maxMark}
                min={1}
                {...register('mark')}
                onChange={setMark}
              />
            </Form.Item>
            <Form.Item
            label="Feedback"
            name="feedback"
            validateStatus={errors.feedback ? 'error' : ''}
            help={errors.feedback?.message}
          >
            <Input.TextArea
                id="content"
                rows={3}
                {...register('feedback')}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Submit Feedback
            </Button>
        </Form>
    )
}