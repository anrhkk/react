import * as types from '../constants/search';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialSearchState = fromJS({
  loading: false,
  history: [],
  hots: [],
  result: []
});
export default createReducer(initialSearchState, {
  [types.GET_SEARCH_REQUEST]: (state,action) => state.set('loading',true),
  [types.GET_SEARCH_FAILURE]: (state, action) => state.merge(initialSearchState),
  [types.GET_SEARCH_SUCCESS]: (state, {json}) => {
    return state.merge({
      loading: false,
      history: json.history,
      hots: json.hots,
      result: json.result
    });
  }
});