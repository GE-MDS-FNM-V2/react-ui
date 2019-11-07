import {
  FETCH_SERIAL,
  FETCH_SERIAL_FAILURE,
  FETCH_SERIAL_SUCCESS
} from '../../actions/serial';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERIAL:
      return {
        ...state,
        isFetching: true,
        error: null,
        result: null
      };
    case FETCH_SERIAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        result: action.payload,
        error: null
      };
    case FETCH_SERIAL_FAILURE:
      return {
        ...state,
        isFetching: false,
        result: null,
        error: action.payload
      };
    default:
      return state;
  }
};
