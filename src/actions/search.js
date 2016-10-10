import { api } from '../utils/api';
import * as types from '../constants/search';

export const getSearch = (name='') =>{
  return {
    type:types.GET_SEARCH,
    promise: api('get','search','',{params:{name:name}})
  };
};