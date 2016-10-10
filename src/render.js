import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import route from './route';
import configureStore from './store/configureStore';
import { getUserProfile } from './utils/user';

async function fetchAllData(dispatch, components, params) {
  const needs = components
    .filter(x=>x.fetchData)
    .reduce((prev,current)=>{
      return current.fetchData(params).concat(prev);
    },[])
    .map(x=>{
      return dispatch(x);
    });
  return await Promise.all(needs);
}

function renderFullPage(html, initialState) {
  return`
   <html>
    <head>
      <title>葡萄情趣-成人之美</title>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="//at.alicdn.com/t/font_1465543841_9749985.css">
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <div id="root">${html}</div>
    <script type="text/javascript">
     window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script type="text/javascript" charset="utf-8" src="/bundle.js"></script>
    </body>
  </html>`;
}

export default function render(req, res){
  const history = createMemoryHistory();
  const token = req.get('Authorization')|| null;
  const store = configureStore({user:fromJS({
    user: getUserProfile(token)
  })}, history);

  match({ routes:route(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      return fetchAllData(store.dispatch, renderProps.components, renderProps.params)
        .then(html=>{
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>);
          const componentHTML = renderToString(InitialView);
          const initialState = store.getState();
          if(__DEVELOPMENT__){
            res.set('Content-Type', 'text/html');
            return res.status(201).send(renderFullPage(componentHTML, initialState));
          }else{
            return res.render('index', {__html__: componentHTML,__state__: JSON.stringify(initialState)});
          }
        }).catch(err => {
          if(__DEVELOPMENT__){
            res.set('Content-Type', 'text/html');
            return res.status(200).send(renderFullPage('',err));
          }else{
            return res.render('index', {__html__: '',__state__: {}});
          }
        });
    } else {
      res.status(404).end('Not Found');
    }
  });
}