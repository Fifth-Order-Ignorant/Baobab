import { Typography } from 'antd';
import ChangeBioForm from './ChangeBioForm';
import ChangeNameForm from './ChangeNameForm';
import ChangeJobForm from './ChangeJobForm';
import styles from '../../styles/Profile.module.css';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { SessionPayload } from 'baobab-common';

type Id = {
  id: number;
};

/**
 * Renders the about component, which includes first and last name, job title
 * and bio.
 */
export function About(id: Id): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [job, setJob] = useState('');
  const [bio, setBio] = useState('');

  const getInfo = () => {
    axios.post('/api/user/view', { userId: id.id }).then((response) => {
      setFirstName(response.data[0]);
      setLastName(response.data[1]);
      let tempJob = response.data[2];
      if (tempJob == '') {
        tempJob += 'no job listed';
      }
      setJob(tempJob);
      let tempBio = response.data[3];
      if (tempBio == '') {
        tempBio += 'no bio available';
      }
      setBio(tempBio);
    });
  };

  const authState = useContext(AuthContext);

  const canEdit = () => {
    try {
      return id.id == (authState as SessionPayload).id;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getInfo();
  }, [getInfo()]);

  return (
    <div>
      <div className={styles.name}>
        <Typography.Text onClick={()=>getInfo()}>
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
