import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import BorderCol from '../BorderCol';
import DevicesList from '../../containers/DevicesList';
import DeviceInspector from '../../containers/DeviceInspector';
import './index.css';

export default ({ login, getLogin }) => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          {login.result && (
            <React.Fragment>
              <h2>Result</h2> <p>{JSON.stringify(login.result, null, 4)}</p>
            </React.Fragment>
          )}
          {login.isFetching && <h2>Logging in...</h2>}
          {login.error && (
            <React.Fragment>
              <h2>Error</h2> <p>{JSON.stringify(login.error, null, 4)}</p>
            </React.Fragment>
          )}
          <Button
            onClick={() => {
              getLogin();
            }}
          >
            Login
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1>Devices List</h1>
        </Col>
      </Row>
      <Row>
        <BorderCol>
          <DevicesList />
        </BorderCol>
      </Row>

      <Row>
        <Col xs={12}>
          <h1>Device Inspector</h1>
        </Col>
      </Row>
      <Row>
        <BorderCol>
          <DeviceInspector />
        </BorderCol>
      </Row>
    </Container>
  );
};
