import { combineReducers } from 'redux';
import serial from './serial';
import inElectron from './inElectron';
import devices from './devices';
import selectedDevice from './selectedDevice';

export default combineReducers({
  serial,
  inElectron,
  devices,
  selectedDevice
});
