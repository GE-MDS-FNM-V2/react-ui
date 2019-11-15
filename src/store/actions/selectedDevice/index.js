export const SELECT_DEVICE = 'SELECT_DEVICE';

export const selectDevice = id => {
  return {
    type: SELECT_DEVICE,
    payload: id
  };
};
