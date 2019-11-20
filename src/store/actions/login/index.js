// import { login, runCommand, getSystemName } from '../../../api';

// export const JSON_RPC_LOGIN = 'JSON_RPC_LOGIN';
// export const JSON_RPC_LOGIN_SUCCESS = 'JSON_RPC_LOGIN_SUCCESS';
// export const JSON_RPC_LOGIN_FAILURE = 'JSON_RPC_LOGIN_FAILURE';

// export const getLogin = () => {
//   return (dispatch, getState) => {
//     dispatch({ type: JSON_RPC_LOGIN });
//     runCommand(getSystemName())
//       .then(result => {
//         dispatch({
//           type: JSON_RPC_LOGIN_SUCCESS,
//           payload: result.data
//         });
//       })
//       .catch(e => {
//         dispatch({
//           type: JSON_RPC_LOGIN_FAILURE,
//           payload: e
//         });
//       });
//   };
// };
