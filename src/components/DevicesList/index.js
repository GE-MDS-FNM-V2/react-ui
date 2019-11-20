import React from 'react';
import { Table, Row, Button } from 'reactstrap';
import LoadDevicesConfiguration from '../../containers/LoadDevicesConfiguration';
import './index.css';

export default ({ devices, selectedDevice, selectDevice }) => {
  return (
    <React.Fragment>
      {devices.length == 0 && <LoadDevicesConfiguration />}
      {devices.length > 0 && (
        <Table hover>
          <thead>
            <tr>
              <th>Connection Type</th>
              <th>Address</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => selectDevice(device.id)}
                  className={selectedDevice === device.id ? 'active' : ''}
                >
                  <td>{device.connectionInfo.type}</td>
                  <td>{device.connectionInfo.ipAddr}</td>
                  <td>
                    <input
                      type="username"
                      value={device.connectionInfo.username}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      value={device.connectionInfo.password}
                      readOnly
                    />
                  </td>
                  <td>todo - get status</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};
