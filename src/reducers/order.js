import * as types from '../constants/order';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialOrderState = fromJS({
  init: {},
  checkout: {},
  address: {},
  delivery: [],
  coupon: [],
  promotion: [],
  promotion_order: []
});
export default createReducer(initialOrderState, {
  [types.GET_ORDER_SUCCESS]: (state, {json}) => {
    return state.merge({
      init: json.init,
      checkout: json.checkout,
      address: json.address,
      delivery: json.delivery,
      coupon: json.coupon,
      promotion: json.promotion,
      promotion_order: json.promotion_order
    });
  },
  [types.GET_ORDER_FAILURE]: (state, action) => state.merge(initialOrderState)
});