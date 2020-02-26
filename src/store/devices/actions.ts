import { createAction } from '@reduxjs/toolkit';
import { Device } from './types';
import { AppThunk } from '..';
import { DeviceApiManager } from '../../api';
import { ActionObjectV1 } from '@ge-fnm/action-object';

export const selectAndInitDevice = (
  deviceID: string
): AppThunk => async dispatch => {
  dispatch(selectDevice(deviceID));
  dispatch(initDevice(deviceID));
};

export const runAction = (
  deviceID: string,
  actionObject: ActionObjectV1
): AppThunk => async dispatch => {
  dispatch(
    runActionStart({
      deviceID,
      actionObject
    })
  );
  const apimanager = DeviceApiManager.getInstance();
  try {
    const data = await apimanager.runAction(deviceID, actionObject);
    dispatch(
      runActionSuccess({
        deviceID,
        data
      })
    );
  } catch (error) {
    dispatch(
      runActionFailure({
        deviceID,
        error
      })
    );
  }
};

export const addDevice = createAction<Device, 'ADD_DEVICE'>('ADD_DEVICE');

export const selectDevice = createAction<string, 'SELECT_DEVICE'>(
  'SELECT_DEVICE'
);
export const initDeviceStart = createAction<string, 'INIT_DEVICE_START'>(
  'INIT_DEVICE_START'
);
export const initDeviceSuccess = createAction<string, 'INIT_DEVICE_SUCCESS'>(
  'INIT_DEVICE_SUCCESS'
);
export const initDeviceFailure = createAction<
  { deviceID: string; error: any },
  'INIT_DEVICE_FAILURE'
>('INIT_DEVICE_FAILURE');

export const runActionStart = createAction<
  {
    deviceID: string;
    actionObject: ActionObjectV1;
  },
  'RUN_ACTION_START'
>('RUN_ACTION_START');
export const runActionSuccess = createAction<
  { deviceID: string; data: any },
  'RUN_ACTION_SUCCESS'
>('RUN_ACTION_SUCCESS');
export const runActionFailure = createAction<
  { deviceID: string; error: any },
  'RUN_ACTION_FAILURE'
>('RUN_ACTION_FAILURE');

const initDevice = (deviceID: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(initDeviceStart(deviceID));
  try {
    const devices = getState().devices.devices;
    const device = devices.filter(device => {
      return device.id === deviceID;
    })[0];
    const apimanager = DeviceApiManager.getInstance();
    await apimanager.initializeDevice(device);
    await apimanager.getEntireSchema(deviceID);
    dispatch(initDeviceSuccess(deviceID));
  } catch (error) {
    dispatch(
      initDeviceFailure({
        deviceID,
        error
      })
    );
  }
};
