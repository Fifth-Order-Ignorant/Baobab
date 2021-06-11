import { Form, Button } from 'antd';
import Card from "./Card";
import ChangeBioForm from "./ChangeBioForm";
import { useState } from 'react';

export interface Biography {
    bio: string;
}

function ChangeBio(bio: Biography): JSX.Element {

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
                    state === 'default' && <Card>{<div>{bio.bio}</div>}</Card>
                }
                </p>
                {
                    state === 'edit' && <ChangeBioForm bio={bio.bio}></ChangeBioForm>
                }
                {
                    state === 'edit' && <Button type="primary" htmlType="submit" onClick={()=>changeState()}>
                        Change Bio
                    </Button>
                }
            </Form.Item>
        </Form>
    )
} export default ChangeBio;