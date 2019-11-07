import {
  FETCH_MOCK_API,
  FETCH_MOCK_API_FAILURE,
  FETCH_MOCK_API_SUCCESS
} from '../../actions/mockApi';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOCK_API:
      return {
        ...state,
        isFetching: true,
        error: null,
        result: null
      };
    case FETCH_MOCK_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        result: action.payload,
        error: null
      };
    case FETCH_MOCK_API_FAILURE:
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
