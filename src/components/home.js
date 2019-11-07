import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';

export default ({ inElectron, fetchMockApi, fetchSerial, mockApi, serial }) => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2>Are you within an electron app?</h2>{' '}
          <p>{JSON.stringify(inElectron)}</p>
          {mockApi.result && (
            <React.Fragment>
              <h2>Result</h2> <p>{JSON.stringify(mockApi.result, null, 4)}</p>
            </React.Fragment>
          )}
          {mockApi.isFetching && <h2>Is Fetching Mock API</h2>}
          {mockApi.error && (
            <React.Fragment>
              <h2>Error</h2> <p>{JSON.stringify(mockApi.error, null, 4)}</p>
            </React.Fragment>
          )}
          <Button
            onClick={() => {
              fetchMockApi();
            }}
          >
            Make Request
          </Button>
          <hr />
          {serial.result && (
            <React.Fragment>
              <h2>Result</h2> <p>{JSON.stringify(serial.result, null, 4)}</p>
            </React.Fragment>
          )}
          {serial.isFetching && <h2>Is Fetching Serial Port</h2>}
          {serial.error && (
            <React.Fragment>
              <h2>Error</h2> <p>{JSON.stringify(serial.error, null, 4)}</p>
            </React.Fragment>
          )}
          <Button
            onClick={() => {
              fetchSerial();
            }}
          >
            Get Serial Ports
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
