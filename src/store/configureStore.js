import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { app, toaster }from '../reducers/app';
import home from '../reducers/home';
import list from '../reducers/list';
import user from '../reducers/user';
import cart from '../reducers/cart';
import item from '../reducers/item';
import order from '../reducers/order';
import search from '../reducers/search';

const rootReducer = combineReducers(
  {
    app,toaster,
    home,
    item,
    list,
    user,
    cart,
    order,
    search,
    routing: routerReducer,
    form: formReducer
  }
);

const promiseMiddleware = () => {
  return next => action => {
    const { promise, type, ...rest } = action;
    
    if (!promise) return next(action);

    const REQUEST = type + '_REQUEST';
    const SUCCESS = type + '_SUCCESS';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });
    
    return promise
      .then(response => ({json: response.data}))
      .then(({json}) => {
        next({ ...rest, json, type: SUCCESS });
        return true;
      })
      .then(undefined, error => {
        next({ ...rest, error, type: FAILURE });
        return false;
      });
  };
};

export default function configureStore(initialState, history) {
  let store;
  if(module.hot){
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, promiseMiddleware, routerMiddleware(history), createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  }else{
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, promiseMiddleware, routerMiddleware(history)), f=>f
    ));
  }
  
  return store;
}