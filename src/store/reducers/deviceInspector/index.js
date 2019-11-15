import initialState from './initialState';
import { SELECT_DEVICE_INSPECTOR_TAB } from '../../actions/deviceInspector';

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DEVICE_INSPECTOR_TAB:
      return { ...state, selectedTabId: action.payload };
    default:
      return state;
  }
};
