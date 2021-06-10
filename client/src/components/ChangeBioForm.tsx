import { Button, Form, Input } from 'antd';

export interface Biography {
    bio: string;
}

const { TextArea } = Input;

function ChangeBioForm(bio: Biography): JSX.Element {

    return (
        <Form>
            <Form.Item
            name="bio"
            >
                <TextArea size="large" defaultValue={ bio.bio }/>
            </Form.Item>
        </Form>
    )
} export default ChangeBioForm;