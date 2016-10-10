import * as types from '../constants/user';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

export default createReducer(fromJS({
  user: null,
  address_list:[],
  address:{},
  order_list:[],
  order:{},
  check:{},
  coupon:{},
  score:{},
  feedback_list:[],
  feedback:{}
}), {
  [types.GET_USER_FAILURE]: (state, action) => state.merge({user:null}),
  [types.GET_USER_SUCCESS]: (state, action) => state.merge({user:action.user}),
  [types.GET_ADDRESS_LIST_FAILURE]: (state, action) => state.merge({address_list:[]}),
  [types.GET_ADDRESS_LIST_SUCCESS]: (state, {json}) => state.merge({address_list:json.address_list}),
  [types.GET_ADDRESS_FAILURE]: (state, action) => state.merge({address:{}}),
  [types.GET_ADDRESS_SUCCESS]: (state, {json}) => state.merge({address:json.address}),
  [types.GET_ORDER_LIST_FAILURE]: (state, action) => state.merge({order_list:[]}),
  [types.GET_ORDER_LIST_SUCCESS]: (state, {json}) => state.merge({order_list:json.order_list}),
  [types.GET_ORDER_FAILURE]: (state, action) => state.merge({order:{}}),
  [types.GET_ORDER_SUCCESS]: (state, {json}) => state.merge({order:json.order})

});