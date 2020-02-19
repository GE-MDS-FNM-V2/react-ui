import DeviceInspector from '../../components/DeviceInspector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

export default () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);

  return (
    <DeviceInspector
        devicesState={devices}
    />
  );
};
