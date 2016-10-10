import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { redirectToBack, redirectToLogin } from './utils/user';

import App from './components/App';
import Home from './components/Home';
import List from './components/List/index';
import Item from './components/Item';
import Cart from './components/Cart';
import Login from './components/Login';
import Order from './components/Order';
import Search from './components/Search';
import User from './components/User/index';
import UserAddress from './components/UserAddress/index';
import UserAddressForm from './components/UserAddress/form';
import UserOrder from './components/UserOrder/index';
import UserOrderShow from './components/UserOrder/show';

export default ()=> (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="list/:id" component={List} />
    <Route path="item/:spu_id/:sku_id" component={Item} />
    <Route path="cart" component={Cart} />
    <Route path="login" component={Login} onEnter={redirectToBack}/>
    <Route path="order" component={Order} onEnter={redirectToLogin}/>
    <Route path="search" component={Search} />
    <Route path="user" component={User} onEnter={redirectToLogin}/>
    <Route path="user/address" component={UserAddress} onEnter={redirectToLogin}/>
    <Route path="user/address/:id" component={UserAddressForm} onEnter={redirectToLogin}/>
    <Route path="user/order/:status" component={UserOrder} onEnter={redirectToLogin}/>
    <Route path="user/order/show/:id" component={UserOrderShow} onEnter={redirectToLogin}/>
  </Route>
);