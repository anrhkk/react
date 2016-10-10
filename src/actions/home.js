import { api } from '../utils/api';
import * as types from '../constants/home';

export const getHome = () =>{
  return {
    type:types.GET_HOME,
    promise: api('get','home')
  };
};