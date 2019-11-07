import { combineReducers } from 'redux';
import mockApi from './mockApi';
import serial from './serial';
import inElectron from './inElectron';

export default combineReducers({
  mockApi,
  serial,
  inElectron
});
