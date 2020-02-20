import React, { FC } from 'react';
import { Col } from 'reactstrap';
import './index.css';

export const BorderCol: FC = ({ children }) => {
  return <Col className="border-col">{children}</Col>;
};
