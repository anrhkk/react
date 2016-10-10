import * as types from '../constants/app';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialAppState = fromJS({
  categoryId: ''
});
export const app = createReducer(initialAppState, {
  [types.GET_APP_SUCCESS]: (state, {json}) => {
    return state.merge({
      categoryId: json.categoryId
    });
  },
  [types.GET_APP_FAILURE]: (state, action) => state.merge(initialAppState)
});

const initialToasterState = fromJS({
  type: '',
  content: ''
});
export const toaster = createReducer(initialToasterState, {
  [types.SHOW_MSG]: (state, {message}) => {
    return state.merge({
      type: message.type,
      content: message.content
    });
  },
  [types.HIDE_MSG]: (state, action) => state.merge(initialToasterState)
});