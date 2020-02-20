import { initialState } from './initialState';
import { createReducer } from '@reduxjs/toolkit';
import {
  addDevice,
  selectDevice,
  initDeviceStart,
  initDeviceSuccess,
  initDeviceFailure
} from './actions';

// DO NOT dispatch actions from a reducer -> https://stackoverflow.com/questions/36730793/can-i-dispatch-an-action-in-reducer
export const devicesRootReducer = createReducer(initialState, builder =>
  builder
    .addCase(addDevice, (state, action) => {
      return {
        devices: [...state.devices, action.payload],
        selectedDeviceID: state.selectedDeviceID
      };
    })
    .addCase(selectDevice, (state, action) => {
      return {
        devices: [...state.devices],
        selectedDeviceID: action.payload
      };
    })
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
);
