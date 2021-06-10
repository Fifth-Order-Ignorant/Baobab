import { Form, Button } from 'antd';
import ChangeNameForm from "./ChangeNameForm";
import { useState } from 'react';
import styles from "../../styles/Profile.module.css";

export interface Name {
    name: string;
}

function ChangeName(name: Name): JSX.Element {

    const [state, setState] = useState('default');

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
        <Form>
            <Form.Item>
                <p onClick={()=>changeState()}>
                {
                    state === 'default' && <h3>{name.name}</h3>
                }
                </p>
                {
                    state === 'edit' && <ChangeNameForm name={name.name}/>
                }
                {
                    state === 'edit' && <Button type="primary" htmlType="submit" onClick={()=>changeState()}>
                        Change Name
                    </Button>
                }
            </Form.Item>
        </Form>
    )
} export default ChangeName;