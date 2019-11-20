import { combineReducers } from 'redux';
import serial from './serial';
import inElectron from './inElectron';
import devices from './devices';
import selectedDevice from './selectedDevice';
import login from './login';

export default combineReducers({
  login,
  serial,
  inElectron,
  devices,
  selectedDevice
});
