import { Typography } from "antd";
import ChangeBioForm from "./ChangeBioForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangeJobForm from "./ChangeJobForm";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import { AuthContext } from '../providers/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { SessionPayload } from 'baobab-common';

type Id={
    id: number;
}

/**
 * Renders the about component, which includes first and last name, job title
 * and bio. 
 */
export function About(id: Id): JSX.Element {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [job, setJob] = useState('');
    const [bio, setBio] = useState('');

    const getFirstName = () => {
        axios.post('/api/user/view', {"userId": id.id})
        .then((response) => { 
            setFirstName(response.data[0]);
        })
        .catch((error)=>{

        }
        )
      };
      const getLastName = () => {
        axios.post('/api/user/view', {"userId": id.id})
        .then((response) => {
            setLastName(response.data[1]);
        })
        .catch((error)=>{

        }
        )
      };
      const getJob = () => {
        axios.post('/api/user/view', {"userId": id.id})
        .then((response) => {
            var returned = response.data[2];
            if (returned == "") {
                returned += "no job listed"
            }
            setJob(returned);
        })
        .catch((error)=>{

  return (
    <div>
      <div className={styles.name}>
        <Typography.Text onClick={() => getInfo()}>
          <ChangeNameForm
            firstName={firstName}
            lastName={lastName}
            canEdit={canEdit()}
          />
        </Typography.Text>
      </div>
      <span className={styles.name}>
        <ChangeJobForm job={job} canEdit={canEdit()} />
      </span>
      <ChangeBioForm bio={bio} canEdit={canEdit()} />
    </div>
  );
}
