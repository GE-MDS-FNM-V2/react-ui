import LoadDevicesConfiguration from '../../components/LoadDevicesConfiguration';
import { addDevice } from '../../store/actions/devices';

import React from 'react';
import { useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  return (
    <LoadDevicesConfiguration
      addDevice={deviceConfig => dispatch(addDevice(deviceConfig))}
    />
  );
};
