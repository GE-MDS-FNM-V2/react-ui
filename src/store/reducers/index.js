import { combineReducers } from 'redux';
import mockApi from './mockApi';
import serial from './serial';
import inElectron from './inElectron';
import devices from './devices';
import selectedDevice from './selectedDevice';

export default combineReducers({
  mockApi,
  serial,
  inElectron,
  devices,
  selectedDevice
});
