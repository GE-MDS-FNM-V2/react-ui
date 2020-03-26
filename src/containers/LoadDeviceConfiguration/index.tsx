import LoadDevicesConfiguration from '../../components/LoadDevicesConfiguration';
// import { addDevice, DeviceConnectionInformation } from '../../store/actions/devices';
import { addDevice } from '../../store/devices/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DeviceFileConfiguration, Device } from '../../store/devices/types';

const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
export const LoadDevicesConfigurationContainer = () => {
  const dispatch = useDispatch();
  const addDeviceFunc = async (deviceConfig: DeviceFileConfiguration) => {
    console.log(deviceConfig);
    const device: Device = {
      id: ID(),
      uri: deviceConfig.uri,
      username: deviceConfig.username,
      password: deviceConfig.password,
      communicationMethod: deviceConfig.communicationMethod,
      protocol: deviceConfig.protocol,
      errors: []
    };
    const result = await addDevice(device);
    console.log('add device action before dispatch', result);
    dispatch(result);
  };
  return <LoadDevicesConfiguration addDevice={addDeviceFunc} />;
};
