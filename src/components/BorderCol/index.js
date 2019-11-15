import React from 'react';
import { Col } from 'reactstrap';
import './index.css';
export default ({ children }) => {
  return <Col className="border-col">{children}</Col>;
};
