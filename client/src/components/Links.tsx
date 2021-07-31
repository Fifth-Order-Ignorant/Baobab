import axios from 'axios';
import { Typography } from 'antd';
import ChangeLinkForm from './ChangeLinkForm';
import { useContext, useEffect, useState } from 'react';
import { SessionPayload } from 'baobab-common';
import { AuthContext } from '../providers/AuthProvider';
import styles from '../../styles/Profile.module.css';

type Id = {
  id: number;
};

/**
 * Renders the links component
 */
export function Links(id: Id): JSX.Element {
  const [links, setLinks] = useState<string[]>([]);

  const getLinks = () => {
    axios
      .post('/api/user/links', { userId: id.id })
      .then((response) => {
        const tempList = response.data;
        if (tempList.length == 0) {
          setLinks(['', '', '']);
        } else {
          setLinks(tempList);
        }
      })
      .catch((reason) => {
        if (axios.isAxiosError(reason)) {
          console.log(reason, reason.response?.data);
        }
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
    getLinks();
  }, [id]);

  return (
    <div className={styles.links}>
      <Typography.Text onClick={() => getLinks()}>
        <ChangeLinkForm links={links} canEdit={canEdit()} />
      </Typography.Text>
    </div>
  );
}
export default Links;
