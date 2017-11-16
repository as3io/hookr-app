import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!process.env.REACT_APP_BACKEND_URI) {
  throw new Error('You must define the backend api uri.');
}

if (!process.env.REACT_APP_GITHUB_CLIENT_ID) {
  throw new Error('You must define the Github oauth client id.');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
