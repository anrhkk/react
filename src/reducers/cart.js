import * as types from '../constants/cart';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialCartState = fromJS({
  cart: [],
  cart_id: 0,
  sum_price: 0.00,
  sum_number: 0
});
export default createReducer(initialCartState, {
  [types.CHANGE_CART_SUCCESS]: (state, {json}) => {
    return state.merge({
      cart: json.cart,
      cart_id: json.cart_id,
      sum_price: json.sum_price,
      sum_number: json.sum_number
    });
  },
  [types.CHANGE_CART_FAILURE]: (state, action) => state.merge(initialCartState),
  [types.GET_CART_SUCCESS]: (state, {json}) => {
    return state.merge({
      cart: json.cart,
      sum_price: json.sum_price,
      sum_number: json.sum_number
    });
  },
  [types.GET_CART_FAILURE]: (state, action) => state.merge(initialCartState)
});