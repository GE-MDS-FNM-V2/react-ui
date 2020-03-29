import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';

const searchHeight = '50px';
const App = () => {
  const [inputText, setInputText] = useState('');
  const inElectron = window.require ? true : false;

  const submit = (e: React.SyntheticEvent) => {
    if (inElectron) {
      const electron = window.require('electron');
      e.preventDefault();
      electron.webFrame.context.find(inputText);
    }
  };

  return (
    <div>
      {inElectron && (
        <div
          className="search-box"
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            height: searchHeight,
            zIndex: 100,
            background: 'white',
            borderRadius: '5px',
            padding: '10px',
            border: '1px solid black'
          }}
        >
          <form>
            <div>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Search text here"
              />
              <button onClick={submit}>Search</button>
            </div>
          </form>
        </div>
      )}
      <div style={{ marginTop: inElectron ? searchHeight : '' }}>
        <Home />
      </div>
    </div>
  );
};

export default App;
