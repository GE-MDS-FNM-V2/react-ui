import DeviceInspector from '../../components/DeviceInspector';
import {
  queryDeviceInfo,
  setDeviceInspectorActiveTab
} from '../../store/actions/devices';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const devices = useSelector(state => state.devices);
  const selectedDevice = useSelector(state => state.selectedDevice);

  return (
    <DeviceInspector
      devices={devices}
      selectedDevice={selectedDevice}
      queryDeviceInfo={id => dispatch(queryDeviceInfo(id))}
      setDeviceInspectorActiveTab={id =>
        dispatch(setDeviceInspectorActiveTab(id))
      }
    />
  );
};
