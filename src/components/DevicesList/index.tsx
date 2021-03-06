import React from 'react';
import { Table, Spinner } from 'reactstrap';
import { LoadDevicesConfigurationContainer } from '../../containers/LoadDeviceConfiguration';
import './index.css';
import { DevicesState, DeviceErrorType } from '../../store/devices/types';

export default ({
  devicesState,
  selectDevice
}: {
  devicesState: DevicesState;
  selectDevice: (deviceID: string) => void;
}) => {
  const selectedDevice = devicesState.selectedDeviceID;
  return (
    <React.Fragment>
      {devicesState.devices.length === 0 && (
        <LoadDevicesConfigurationContainer />
      )}
      {devicesState.devices.length > 0 && (
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
            {devicesState.devices.map((device, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => selectDevice(device.id)}
                  className={selectedDevice === device.id ? 'active' : ''}
                >
                  <td>{device.communicationMethod}</td>
                  <td>{device.uri}</td>
                  <td>
                    <input type="username" value={device.username} readOnly />
                  </td>
                  <td>
                    <input type="password" value={device.password} readOnly />
                  </td>
                  <td>
                    {device.loading.length > 0 && <Spinner />}

                    {device.errors.length > 0 &&
                      JSON.stringify(
                        device.errors
                          .map((err: DeviceErrorType) => {
                            debugger;
                            return err.errorObj.message;
                          })
                          .join('\n')
                      )}
                    {device.errors.length === 0 &&
                      !device.initialized &&
                      'Uninitialized'}
                    {device.errors.length === 0 &&
                      device.initialized &&
                      'Connected'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};
