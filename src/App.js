import React from 'react';
import Home from './containers/Home';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const App = () => {
  return <Home></Home>;
};

export default App;
