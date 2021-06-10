import { Button, Form, Input } from 'antd';

export interface Name {
    name: string;
}

function ChangeNameForm(name: Name): JSX.Element {

    return (
        <Form>
            <Form.Item
            name="bio"
            >
                <Input size="large" defaultValue={ name.name }/>
            </Form.Item>
        </Form>
    )
} export default ChangeNameForm;