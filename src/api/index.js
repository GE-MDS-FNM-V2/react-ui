import Axios from 'axios';

const IP_ADDR = '98.10.43.107';
const URL = `http://${IP_ADDR}/jsonrpc`;
const USERNAME = 'admin';
const PASSWORD = 'REPLACE_ME';

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

export const login = () => {
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

export const readTrans = () => {
  let params = {
    mode: 'read',
    tag: 'test'
  };
  return command('new_trans', params);
};

export const getSchema = () => {
  let params = {
    path: '/if:interfaces',
    levels: 3
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

export const ensureLogin = () => {
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

export const runCommand = commandToRun => {
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
