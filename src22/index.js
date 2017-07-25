import React from 'react';
import ReactDOM from 'react-dom';
import App from '../weChat-report/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Container from './watch'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
