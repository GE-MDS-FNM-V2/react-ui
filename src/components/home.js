import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { fetchResult } from '../store/actions';

export default ({ dispatch, result, fetchingResult, error, inElectron }) => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2>Are you within an electron app?</h2>{' '}
          <p>{JSON.stringify(inElectron)}</p>
          {result && (
            <React.Fragment>
              <h2>Result</h2> <p>{JSON.stringify(result, null, 4)}</p>
            </React.Fragment>
          )}
          {fetchingResult && <h2>Is Fetching</h2>}
          {error && (
            <React.Fragment>
              <h2>Error</h2> <p>{JSON.stringify(error, null, 4)}</p>
            </React.Fragment>
          )}
          <Button
            onClick={() => {
              console.log(dispatch);
              console.log('hello world');
              dispatch(fetchResult());
            }}
          >
            Make Request
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
