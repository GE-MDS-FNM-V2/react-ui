import { createAction } from '@reduxjs/toolkit';
import { Device } from './types';
import { AppThunk } from '..';
import { DeviceApiManager } from '../../api';

export const selectAndInitDevice = (
  deviceID: string
): AppThunk => async dispatch => {
  dispatch(selectDevice(deviceID));
  dispatch(initDevice(deviceID));
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

export const runActionStart = createAction<string, 'RUN_ACTION_START'>(
  'RUN_ACTION_START'
);
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
    await DeviceApiManager.getInstance().initializeDevice(device);
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
