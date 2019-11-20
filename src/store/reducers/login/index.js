import {
  JSON_RPC_LOGIN,
  JSON_RPC_LOGIN_FAILURE,
  JSON_RPC_LOGIN_SUCCESS
} from '../../actions/login';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case JSON_RPC_LOGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
        result: null
      };
    case JSON_RPC_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        result: action.payload,
        error: null
      };
    case JSON_RPC_LOGIN_FAILURE:
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
