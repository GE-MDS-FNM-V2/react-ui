import { createRadioAPI } from '../../../api';

export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE_SUCCESS';
export const ADD_DEVICE_FAILURE = 'ADD_DEVICE_FAILURE';
export const QUERY_DEVICE_INFO = 'QUERY_DEVICE_INFO';
export const QUERY_DEVICE_INFO_SUCCESS = 'QUERY_DEVICE_INFO_SUCCESS';
export const QUERY_DEVICE_INFO_FAILURE = 'QUERY_DEVICE_INFO_FAILURE';
export const SET_DEVICE_INSPECTOR_ACTIVE_TAB =
  'SET_DEVICE_INSPECTOR_ACTIVE_TAB';

export const queryDeviceInfo = deviceId => {
  return (dispatch, getState) => {
    dispatch({ type: QUERY_DEVICE_INFO, payload: deviceId });

    const state = getState();
    const device = state.devices.filter(device => {
      console.log(device, deviceId);
      return device.id === deviceId;
    })[0];
    const api = device.api;
    console.log(device);
    api
      .runCommand()
      .then(systemName => {
        dispatch({
          type: QUERY_DEVICE_INFO_SUCCESS,
          payload: {
            id: deviceId,
            data: systemName
          }
        });
      })
      .catch(error => {
        dispatch({
          type: QUERY_DEVICE_INFO_FAILURE,
          payload: {
            id: deviceId,
            error
          }
        });
      });
  };
};

export const setDeviceInspectorActiveTab = tabId => {
  return {
    type: SET_DEVICE_INSPECTOR_ACTIVE_TAB,
    payload: tabId
  };
};

export const addDevice = async deviceConfig => {
  const connectionInfo = deviceConfig.connectionInfo;

  console.log(deviceConfig);
  try {
    const api = await createRadioAPI(
      connectionInfo.ipAddr,
      connectionInfo.username,
      connectionInfo.password
    );
    return {
      type: ADD_DEVICE_SUCCESS,
      payload: {
        api,
        ...deviceConfig
      }
    };
  } catch (error) {
    return {
      type: ADD_DEVICE_FAILURE,
      payload: {
        ...deviceConfig,
        error: error
      }
    };
  }
};
