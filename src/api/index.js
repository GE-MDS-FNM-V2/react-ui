import Axios from 'axios';

export const createRadioAPI = (IP_ADDR, USERNAME, PASSWORD) => {
  const URL = `http://${IP_ADDR}/jsonrpc`;
  let id = -1;

  let loggedIn = false;

  const command = (method, params) => {
    id++;
    let data = {
      jsonrpc: '2.0',
      id: id,
      method: method,
      params: params
    };
    let headers = {
      'Content-Type': 'application/json'
    };
    return Axios({
      url: URL,
      method: 'post',
      data: data,
      headers: headers,
      withCredentials: true
    });
  };

  const login = () => {
    console.log('here');
    let params = {
      user: USERNAME,
      passwd: PASSWORD
    };
    return command('login', params, id).then(value => {
      loggedIn = true;
      return value;
    });
  };

  const readTrans = () => {
    let params = {
      mode: 'read',
      tag: 'test'
    };
    return command('new_trans', params);
  };

  const ensureLogin = () => {
    return new Promise((resolve, reject) => {
      if (loggedIn) {
        resolve();
      } else {
        login()
          .then(loginResult => {
            resolve(loginResult.data);
          })
          .catch(e => {
            reject(e);
          });
      }
    });
  };

  const runCommand = commandToRun => {
    return new Promise((resolve, reject) => {
      ensureLogin().then(() => {
        readTrans().then(readTransResponse => {
          const transactionHandle = readTransResponse.data.result.th;
          const { METHOD, PARAMS } = commandToRun(transactionHandle);
          resolve(command(METHOD, PARAMS));
        });
      });
    });
  };

  const getSchema = () => {
    let params = {
      path: '/if:interfaces',
      levels: 10
    };
    // return a function that takes the current transaction handle
    return th => {
      return {
        METHOD: 'get_schema',
        PARAMS: {
          ...params,
          th
        }
      };
    };
  };

  const getSystemName = () => {
    let params = {
      path: '/sys:system/name'
    };
    // return a function that takes the current transaction handle
    return th => {
      return {
        METHOD: 'get_value',
        PARAMS: {
          ...params,
          th
        }
      };
    };
  };

  return {
    runCommand,
    getSchema,
    getSystemName
  };
};
