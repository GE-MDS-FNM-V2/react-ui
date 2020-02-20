import DeviceInspector from '../../components/DeviceInspector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DeviceApiManager } from '../../api';

export default () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  const apimanager = DeviceApiManager.getInstance();
  return (
    <DeviceInspector runAction={apimanager.runAction} devicesState={devices} />
  );
};
