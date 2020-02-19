import { createAction } from "@reduxjs/toolkit";
import { Device } from "./types";
import { AppThunk } from "..";
import { DeviceApiManager } from "../../api";

export const selectAndInitDevice = (
  deviceID: string
): AppThunk => async dispatch => {
  dispatch(selectDevice(deviceID));
  dispatch(initDevice(deviceID));
};

export const addDevice = createAction<Device, "ADD_DEVICE">("ADD_DEVICE");

export const selectDevice = createAction<string, "SELECT_DEVICE">(
  "SELECT_DEVICE"
);

export const initDeviceStart = createAction<string, "INIT_DEVICE_START">(
  "INIT_DEVICE_START"
);
export const initDeviceSuccess = createAction<{deviceID: string, data: any}, "INIT_DEVICE_SUCCESS">(
  "INIT_DEVICE_SUCCESS"
);
export const initDeviceFailure = createAction<{deviceID: string, error: any}, "INIT_DEVICE_FAILURE">(
  "INIT_DEVICE_FAILURE"
);

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
    const data = await DeviceApiManager.getInstance().initializeDevice(device);
    dispatch(initDeviceSuccess({
        deviceID,
        data
    }))
  } catch (error) {
      dispatch(initDeviceFailure({
          deviceID,
          error
      }))
  }
};
