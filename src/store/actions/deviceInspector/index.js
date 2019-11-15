export const SELECT_DEVICE_INSPECTOR_TAB = 'SELECT_DEVICE_INSPECTOR_TAB';

export const selectDeviceInspectorTab = tabId => {
  return {
    type: SELECT_DEVICE_INSPECTOR_TAB,
    payload: tabId
  };
};
