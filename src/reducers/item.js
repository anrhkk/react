import * as types from '../constants/item';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialItemState = fromJS({
  loading: false,
  spu: '',
  sku: '',
  spec: '',
  type: '',
  promotion: '',
  relation: ''
});
export default createReducer(initialItemState, {
  [types.GET_ITEM_FAILURE]: (state, action) => state.merge(initialItemState),
  [types.GET_ITEM_SUCCESS]: (state, {json}) => {
    return state.merge({
      loading: false,
      spu: json.spu,
      sku: json.sku,
      spec: json.spec,
      type: json.type,
      promotion: json.promotion,
      relation: json.relation
    });
  }
});