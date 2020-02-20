import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { BorderCol } from '../BorderCol';
import { DevicesListContainer } from '../../containers/DevicesList';
import DeviceInspector from '../../containers/DeviceInspector';

export default () => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>Devices List</h1>
        </Col>
      </Row>
      <Row>
        <BorderCol>
          <DevicesListContainer />
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
