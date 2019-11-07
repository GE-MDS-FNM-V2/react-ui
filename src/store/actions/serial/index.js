import axios from 'axios';

export const FETCH_SERIAL = 'FETCH_SERIAL';
export const FETCH_SERIAL_SUCCESS = 'FETCH_SERIAL_SUCCESS';
export const FETCH_SERIAL_FAILURE = 'FETCH_SERIAL_FAILURE';

export const fetchSerial = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_SERIAL });

    axios
      .get('http://localhost:3001/serialInfo')
      .then(result => {
        dispatch({
          type: FETCH_SERIAL_SUCCESS,
          payload: result.data
        });
      })
      .catch(e => {
        dispatch({
          type: FETCH_SERIAL_FAILURE,
          payload: e
        });
      });
  };
};
