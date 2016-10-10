import { api } from '../utils/api';
import * as types from '../constants/app';

//获取app
export const getApp = () =>{
  return {
    type: types.GET_APP,
    promise: api('get','app')
  };
};

//显示提示消息
export const showToaster = (content, type='error')=>{
  return {
    type: types.SHOW_MSG,
    message: { content:content,type:type }
  };
};

export const hideToaster = ()=>({type: types.HIDE_MSG});