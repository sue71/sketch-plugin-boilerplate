import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import call from 'sketch-module-web-view/client';

// Copy html by webpack
require('../index.html');

const appContainer = ReactDOM.render(<App />, document.getElementById('app'));

// Javascript bridge called by sketch script
window.bridge = message => {
  console.log(message);
  call('callFromJS', 'pong');
};
