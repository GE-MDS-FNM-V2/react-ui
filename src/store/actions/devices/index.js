export const SET_DEVICES = 'SET_DEVICES';
export const QUERY_DEVICE_INFO = 'QUERY_DEVICE_INFO';
export const QUERY_DEVICE_INFO_SUCCESS = 'QUERY_DEVICE_INFO_SUCCESS';
export const QUERY_DEVICE_INFO_FAILURE = 'QUERY_DEVICE_INFO_FAILURE';
export const SET_DEVICE_INSPECTOR_ACTIVE_TAB =
  'SET_DEVICE_INSPECTOR_ACTIVE_TAB';

const fakeRadioRequest = deviceId => {
  const fakeResponses = {
    1: {
      logs: [
        {
          timestamp: 'asdf',
          type: 'info',
          message: 'this is a log for radio1'
        },
        {
          timestamp: 'asdfasdf',
          type: 'ERROR',
          message: 'this is an error log for radio1'
        }
      ],
      connection: {
        status: 'GREAT'
      }
    },
    2: {
      logs: [
        {
          timestamp: 'asdf',
          type: 'info',
          message: 'this is a log for radio2'
        },
        {
          timestamp: 'asdfasdf',
          type: 'ERROR',
          message: 'this is an error log for radio2'
        }
      ],
      connection: {
        status: 'OKAY'
      }
    },
    3: {
      logs: [
        {
          timestamp: 'asdf',
          type: 'info',
          message: 'this is a log for radio3'
        },
        {
          timestamp: 'asdfasdf',
          type: 'ERROR',
          message: 'this is an error log for radio3'
        }
      ],
      connection: {
        status: 'BAD'
      }
    }
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeResponses[deviceId]);
    }, 1500);
  });
};

export const queryDeviceInfo = deviceId => {
  return (dispatch, getState) => {
    dispatch({ type: QUERY_DEVICE_INFO, payload: deviceId });

    fakeRadioRequest(deviceId)
      .then(result => {
        dispatch({
          type: QUERY_DEVICE_INFO_SUCCESS,
          payload: {
            id: deviceId,
            data: result
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

export const setDevices = devices => {
  return {
    type: SET_DEVICES,
    payload: devices
  };
};
