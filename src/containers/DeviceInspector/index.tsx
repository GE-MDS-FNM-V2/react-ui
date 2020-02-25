import DeviceInspector from '../../components/DeviceInspector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { runAction } from '../../store/devices/actions';

export default () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  return (
    <DeviceInspector
      runAction={(deviceID, actionObject) =>
        dispatch(runAction(deviceID, actionObject))
      }
      devicesState={devices}
    />
  );
};
