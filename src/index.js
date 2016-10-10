import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import route from './route';
import './assets/style.scss';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState,browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {route()}
    </Router>
  </Provider>,
  document.getElementById('root')
);
