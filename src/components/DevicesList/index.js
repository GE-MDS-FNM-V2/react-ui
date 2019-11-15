import React from 'react';
import { Table } from 'reactstrap';

export default ({ devices, selectedDevice, selectDevice }) => {
  return (
    <React.Fragment>
      {devices.length < 0 && <p>No devices configured</p>}
      {devices.length > 0 && (
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Viewing</th>
              <th>Connection Type</th>
              <th>Address</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => {
              return (
                <tr>
                  <td>{device.name}</td>
                  <td>
                    <input
                      type="radio"
                      onClick={() => selectDevice(device.id)}
                      checked={selectedDevice === device.id}
                    />
                  </td>
                  <td>{device.connectionInfo.type}</td>
                  <td>{device.connectionInfo.ipAddr}</td>
                  <td>{device.connectionInfo.username}</td>
                  <td>{device.connectionInfo.password}</td>
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
