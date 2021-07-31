import React, { useContext } from 'react';
import { AuthContext } from '../src/providers/AuthProvider';
import CreateAssignmentForm from '../src/components/CreateAssignmentForm';
import ErrorPage from 'next/error';

export default function CreateAssignment(): JSX.Element {
  const authContext = useContext(AuthContext);
  const isMentor = authContext
    ? authContext.role.toString() === 'Mentor' ||
      authContext.role.toString() === 'Admin'
    : false;
  if (isMentor) {
    return (
      <div style={{ backgroundColor: '#f0f0f0' }}>
        <CreateAssignmentForm />
      </div>
    );
  }
  return (
    <ErrorPage
      statusCode={403}
      title={'You do not have permissions to view this page'}
    />
  );
}
