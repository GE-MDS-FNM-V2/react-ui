import DevicesList from '../../components/DevicesList';
import { selectDevice } from '../../store/actions/selectedDevice';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const devices = useSelector(state => state.devices);
  const selectedDevice = useSelector(state => state.selectedDevice);

  return (
    <DevicesList
      devices={devices}
      selectedDevice={selectedDevice}
      selectDevice={id => dispatch(selectDevice(id))}
    />
  );
};
