import initialState from './initialState';
import {
  QUERY_DEVICE_INFO,
  QUERY_DEVICE_INFO_FAILURE,
  QUERY_DEVICE_INFO_SUCCESS,
  SET_DEVICE_INSPECTOR_ACTIVE_TAB,
  ADD_DEVICE
} from '../../actions/devices';

import { createRadioAPI } from '../../../api';

export default (state = initialState, action) => {
  switch (action.type) {
    case QUERY_DEVICE_INFO:
      return state.map(device => {
        if (device.id !== action.payload) {
          return device;
        }
        return {
          ...device,
          loading: true,
          error: null,
          data: {}
        };
      });
    case QUERY_DEVICE_INFO_SUCCESS:
      return state.map(device => {
        if (device.id !== action.payload.id) {
          return device;
        }
        const selectedTabStillValid = Object.keys(action.payload.data).includes(
          state.deviceInspectorSelectedTab
        );
        const selectedTab = selectedTabStillValid
          ? state.deviceInspectorSelectedTab
          : Object.keys(action.payload.data)[0] || null;
        return {
          ...device,
          loading: false,
          error: null,
          deviceInspectorSelectedTab: selectedTab,
          data: {
            ...action.payload.data
          }
        };
      });
    case QUERY_DEVICE_INFO_FAILURE:
      return state.map(device => {
        if (device.id !== action.payload.id) {
          return device;
        }
        return {
          ...device,
          loading: false,
          error: action.payload.error
        };
      });
    case SET_DEVICE_INSPECTOR_ACTIVE_TAB:
      return state.map(device => {
        return {
          ...device,
          deviceInspectorSelectedTab: action.payload
        };
      });
    case ADD_DEVICE:
      const connectionInfo = action.payload.connectionInfo;
      const connectionType = connectionInfo.type;
      if (connectionType === 'IP') {
        return [
          ...state,
          {
            ...action.payload,
            api: createRadioAPI(
              connectionInfo.ipAddr,
              connectionInfo.username,
              connectionInfo.password
            )
          }
        ];
      } else {
        console.error(
          'Connection type',
          connectionType,
          'currently not supported'
        );
        return state;
      }

    default:
      return state;
  }
};