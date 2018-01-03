import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style.css';

import {routerMiddleware} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';

const history = createBrowserHistory();

const middleware = routerMiddleware(history);
const store = configureStore(middleware);

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));
