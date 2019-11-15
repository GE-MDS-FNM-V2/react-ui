import initialState from './initialState';
import { SELECT_DEVICE } from '../../actions/selectedDevice';

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DEVICE:
      return action.payload;
    default:
      return state;
  }
};
