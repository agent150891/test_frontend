import React from 'react';
import Container from '@material-ui/core/Container';
import JobsTable from "./components/JobsTable";

export const App = () => {
  return (
    <Container maxWidth='md'>
      <JobsTable/>
    </Container>
  );
};
