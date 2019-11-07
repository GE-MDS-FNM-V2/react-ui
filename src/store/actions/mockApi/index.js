import { mockRequest } from '../../../api';

export const FETCH_MOCK_API = 'FETCH_MOCK_API';
export const FETCH_MOCK_API_SUCCESS = 'FETCH_MOCK_API_SUCCESS';
export const FETCH_MOCK_API_FAILURE = 'FETCH_MOCK_API_FAILURE';

export const fetchMockApi = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_MOCK_API });

    mockRequest()
      .then(result => {
        dispatch({
          type: FETCH_MOCK_API_SUCCESS,
          payload: result.data
        });
      })
      .catch(e => {
        dispatch({
          type: FETCH_MOCK_API_FAILURE,
          payload: e
        });
      });
  };
};
