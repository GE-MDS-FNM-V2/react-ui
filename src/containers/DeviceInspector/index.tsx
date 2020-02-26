import DeviceInspector from '../../components/DeviceInspector';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { runAction } from '../../store/devices/actions';
import { DeviceApiManager } from '../../api';
import { DataType } from '@ge-fnm/data-model';

const apiManager = DeviceApiManager.getInstance();

export default () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices);
  const selectedDevice = useSelector(
    (state: RootState) => state.devices.selectedDeviceID
  );
  const [deviceData, setDeviceData] = useState<undefined | DataType>(undefined);

  useEffect(() => {
    if (selectedDevice && apiManager.getDeviceByID(selectedDevice)) {
      setDeviceData(apiManager.getDeviceByID(selectedDevice).data);
    }
  }, [devices, selectedDevice]);

  return (
    <DeviceInspector
      runAction={(deviceID, actionObject) =>
        dispatch(runAction(deviceID, actionObject))
      }
      deviceData={deviceData}
      devicesState={devices}
    />
  );
};
