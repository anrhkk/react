import * as types from '../constants/list';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialListState = fromJS({
  leftCategory: [],
  rightFilter: [],
  rightItem: [],
  expand: '',
  loading: false
});
export default createReducer(initialListState, {
  [types.GET_LEFT_CATEGORY_FAILURE]: (state, action) => state.merge({leftCategory:[]}),
  [types.GET_LEFT_CATEGORY_SUCCESS]: (state, {json}) => state.merge({leftCategory:json.data}),
  [types.GET_RIGHT_FILTER_FAILURE]: (state, action) => state.merge({rightFilter:[]}),
  [types.GET_RIGHT_FILTER_SUCCESS]: (state, {json}) => state.merge({rightFilter:json.data}),
  [types.GET_RIGHT_ITEM_REQUEST]: (state,action) => state.set('loading',true),
  [types.GET_RIGHT_ITEM_FAILURE]: (state, action) => state.merge({rightItem:{},loading:false}),
  [types.GET_RIGHT_ITEM_SUCCESS]: (state, {json}) => state.merge({rightItem:json.data,loading:false}),
  [types.TOGGLE_EXPAND]: (state, action) => state.merge({expand:action.expand})
});