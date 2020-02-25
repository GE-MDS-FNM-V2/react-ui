import { initialState } from './initialState';
import { createReducer } from '@reduxjs/toolkit';
import {
  addDevice,
  selectDevice,
  initDeviceStart,
  initDeviceSuccess,
  initDeviceFailure,
  runActionStart,
  runActionSuccess,
  runActionFailure
} from './actions';

// DO NOT dispatch actions from a reducer -> https://stackoverflow.com/questions/36730793/can-i-dispatch-an-action-in-reducer
export const devicesRootReducer = createReducer(initialState, builder =>
  builder
    /**
     * Adding a Device
     */
    .addCase(addDevice, (state, action) => {
      return {
        devices: [...state.devices, action.payload],
        selectedDeviceID: state.selectedDeviceID
      };
    })
    /**
     * Selecting a Device
     */
    .addCase(selectDevice, (state, action) => {
      return {
        devices: [...state.devices],
        selectedDeviceID: action.payload
      };
    })
    /**
     * Initializing a Device
     */
    .addCase(initDeviceStart, (state, action) => {
      return {
        devices: state.devices.map(device => {
          if (device.id !== action.payload) {
            return device;
          }
          return {
            ...device,
            loading: true
          };
        }),
        selectedDeviceID: state.selectedDeviceID
      };
    })
    .addCase(initDeviceSuccess, (state, action) => {
      return {
        devices: state.devices.map(device => {
          if (device.id !== action.payload) {
            return device;
          }
          return {
            ...device,
            loading: false,
            initialized: true
          };
        }),
        selectedDeviceID: state.selectedDeviceID
      };
    })
    .addCase(initDeviceFailure, (state, action) => {
      return {
        devices: state.devices.map(device => {
          if (device.id !== action.payload.deviceID) {
            return device;
          }
          return {
            ...device,
            loading: false,
            error: action.payload.error
          };
        }),
        selectedDeviceID: state.selectedDeviceID
      };
    })
    /**
     * Running an Action against a device
     */
    .addCase(runActionStart, (state, action) => {
      return {
        devices: state.devices.map(device => {
          if (device.id !== action.payload.deviceID) {
            return device;
          }
          return {
            ...device,
            loading: true
          };
        }),
        selectedDeviceID: state.selectedDeviceID
      };
    })
    .addCase(runActionSuccess, (state, action) => {
      return {
        devices: state.devices.map(device => {
          if (device.id !== action.payload.deviceID) {
            return device;
          }
          return {
            ...device,
            loading: false,
            data: action.payload.data
          };
        }),
        selectedDeviceID: state.selectedDeviceID
      };
    })
    .addCase(runActionFailure, (state, action) => {
      return {
        devices: state.devices.map(device => {
          if (device.id !== action.payload.deviceID) {
            return device;
          }
          return {
            ...device,
            loading: false,
            error: action.payload.error
          };
        }),
        selectedDeviceID: state.selectedDeviceID
      };
    })
);
