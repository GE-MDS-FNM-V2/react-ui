import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import BorderCol from '../BorderCol';
import DevicesList from '../../containers/DevicesList';
import DeviceInspector from '../../containers/DeviceInspector';
import './index.css';

export default ({ inElectron, fetchMockApi, fetchSerial, mockApi, serial }) => {
  return (
    <Container>
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
