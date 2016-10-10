import * as types from '../constants/home';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialHomeState = fromJS({
  loading: false,
  topAdvert: [],
  centerAdvert: [],
  bottomCategory: []
});
export default createReducer(initialHomeState, {
  [types.GET_HOME_FAILURE]: (state, action) => state.merge(initialHomeState),
  [types.GET_HOME_SUCCESS]: (state, {json}) => {
    return state.merge({
      loading: false,
      topAdvert: json.topAdvert,
      centerAdvert: json.centerAdvert,
      bottomCategory: json.bottomCategory
    });
  }
});