import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AssignmentResponse } from 'baobab-common';
import { Col, Row, Spin } from 'antd';
import AssignmentView from '../../src/components/AssignmentView';
import styles from '../../styles/Assignment.module.css';
import { SubmissionTable } from '../../src/components/SubmissionTable';
import { AuthContext } from '../../src/providers/AuthProvider';

function Assignment(): JSX.Element {
  const router = useRouter();
  const pageSize = 10;
  const authContext = useContext(AuthContext);
  const [assignment, setAssignment] = useState<AssignmentResponse>();
  const isMentor = authContext ? authContext.role.toString() === 'Mentor' : false;

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;

      axios
        .get<AssignmentResponse>(`/api/assignment/get/${id}`)
        .then((value) => setAssignment(value.data))
        .catch((reason) => {
          if (
            axios.isAxiosError(reason) &&
            reason.response &&
            // invalid id or invalid non-numeric id was given
            [404, 400].includes(reason.response.status)
          ) {
            router.push('/404');
          }
        });
    }
  }, [router.isReady]);

  const fetchSubmissions = async (p: number, assignmentId: number) => {
    const { data } = await axios.get(`/api/submission/pagination/${assignmentId}`, {
      params: {
        start: p * pageSize,
        end: (p + 1) * pageSize
      }
    });
    return data;
  }

  return (
    <Row justify="center" className={styles.row}>
      <Col span={16}>
        {assignment ? (
          <div>
            <AssignmentView assignment={assignment} />
            {isMentor ? (<SubmissionTable pageSize={pageSize} fetchData={(page: number) => fetchSubmissions(page, assignment.id)} outOf={assignment.maxMark} />)
              : (<div />)}
          </div>
        ) : (
          <Spin className={styles.spin} />
        )}
      </Col>
    </Row>
  );
}

export default Assignment;
