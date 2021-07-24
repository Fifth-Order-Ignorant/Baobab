import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AssignmentResponse } from 'baobab-common';
import { Col, Row, Spin } from 'antd';
import AssignmentView from '../../src/components/AssignmentView';
import styles from '../../styles/Assignment.module.css';
import UploadFile from 'src/components/UploadFile';

function Assignment(): JSX.Element {
  const router = useRouter();

  const [assignment, setAssignment] = useState<AssignmentResponse>(
    new AssignmentResponse(),
  );
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id as unknown as number);

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

  return (
    <Row justify="center" className={styles.row}>
      <Col span={16}>
        {assignment ? (
          <AssignmentView assignment={assignment} />
        ) : (
          <Spin className={styles.spin} />
        )}
        <UploadFile userId={id} assignmentId={assignment.id} />
      </Col>
    </Row>
  );
}

export default Assignment;
