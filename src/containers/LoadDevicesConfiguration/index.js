import LoadDevicesConfiguration from '../../components/LoadDevicesConfiguration';
import { addDevice } from '../../store/actions/devices';

import React from 'react';
import { useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  const addDeviceFunc = async deviceConfig => {
    console.log(deviceConfig);
    const result = await addDevice(deviceConfig);
    console.log(result);
    dispatch(result);
  };
  return <LoadDevicesConfiguration addDevice={addDeviceFunc} />;
};
