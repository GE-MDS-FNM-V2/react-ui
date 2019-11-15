import { queryDeviceInfo } from '../devices';
export const SELECT_DEVICE = 'SELECT_DEVICE';

export const selectDevice = id => {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_DEVICE,
      payload: id
    });
    dispatch(queryDeviceInfo(id));
  };
};
