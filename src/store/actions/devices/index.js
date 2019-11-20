export const ADD_DEVICE = 'ADD_DEVICE';
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
      return device.id === deviceId;
    })[0];
    const api = device.api;
    api
      .runCommand(api.getSystemName())
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

export const addDevice = deviceConfig => {
  return {
    type: ADD_DEVICE,
    payload: deviceConfig
  };
};
