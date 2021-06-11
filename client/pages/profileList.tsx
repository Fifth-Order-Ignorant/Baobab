import { Avatar, List

} from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../styles/ProfileList.module.css';
import axios from 'axios';

const ProfileList = () => {
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    const res = axios
      .post('/api/user/pagination', { start: 0, end: 20 })
      .then((response) => {
        response.data;
        const lst: any[] = [];
        for (let i = 0; i < response.data.length; i++) {
          lst.push({
            name: response.data[i].firstName + ' ' + response.data[i].lastName,
            jobTitle: response.data[i].jobTitle,
          });
        }
        setUserList(lst);
      });
  }, []);
  return (
    <div className={styles.mainContainer}>
      {userList.map(function (d, idx) {
        return (
          <a href="https://ethanlam.ca" className={styles.container} key={idx}>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={d.name}
                description={d.jobTitle}
              />
            </List.Item>
          </a>
        );
      })}
    </div>
  );
};

export default ProfileList;
