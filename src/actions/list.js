import * as types from '../constants/list';
import { api } from '../utils/api';

//获取左侧分类
export const getLeftCategory = (id) =>{
  return {
    type: types.GET_LEFT_CATEGORY,
    promise: api('get','list/leftCategory',id)
  };
};

//获取过滤条件
export const getRightFilter = (id) =>{
  return {
    type: types.GET_RIGHT_FILTER,
    promise: api('get','list/rightFilter',id)
  };
};

//获取列表
export const getRightItem = (id,parameters={sortBy:'sort,desc'}) =>{
  return (dispatch,getState) => {
    return dispatch({
      type: types.GET_RIGHT_ITEM,
      promise: api('get','list/rightItem',id,{params:parameters})
    });
  };
};

//显隐切换
export const toggleExpand = (expand) => ({ type: types.TOGGLE_EXPAND, expand: expand});