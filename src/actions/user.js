import { push } from 'react-router-redux';
import cookie from 'react-cookie';
import { api } from '../utils/api';
import { getToken,removeToken } from '../utils/func';
import { getUserProfile } from '../utils/user';
import { showToaster } from './app';
import * as types from '../constants/user';

//获取用户信息
export const getUser = (token = getToken()) => {
  return (dispatch,getState) =>{
    if(token){
      let userProfile = getUserProfile(token);
      if(userProfile){
        return dispatch({
          type: types.GET_USER_SUCCESS,
          user: userProfile
        });
      }else{
        return dispatch({
          type: types.GET_USER_FAILURE,
          user: null
        });
      }
    }else{
      return dispatch({
        type: types.GET_USER_FAILURE,
        user: null
      });
    }
  };
};

export const getOrderList = () => {
  return {
    type: types.GET_ORDER_LIST,
    promise: api('get','user/order','index')
  };
};

export const getOrder = (id,parameters={}) => {
  return {
    type: types.GET_ORDER,
    promise: api('get','user/order',id,{params:parameters})
  };
};

export const delOrder = (id) => {
  return (dispatch,getState) =>{
    return api('get','user/order/delete',id)
      .then(response => ({json: response.data, status: response.status}))
      .then(({json,status}) => {
        if(status == 400){
          return dispatch(showToaster(json.info));
        }
        dispatch(showToaster(json.info));
        dispatch(getOrderList());
      }).catch(err=>{
        return dispatch(showToaster(err.data.info));
      });
  };
};

export const getAddressList = (status) => {
  return {
    type: types.GET_ADDRESS_LIST,
    promise: api('get','user/address',status)
  };
};

export const getAddress = (id,parameters={}) => {
  return {
    type: types.GET_ADDRESS,
    promise: api('get','user/address',id,{params:parameters})
  };
};

export const postAddress = (id,values) => {
  return (dispatch,getState) =>{
    return api('post','user/address',id,values)
      .then(response => ({json: response.data, status: response.status}))
      .then(({json,status}) => {
        if(status == 400){
          return dispatch(showToaster(json.info));
        }
        dispatch(showToaster(json.info));
        let from = cookie.load('from');
        if(from){
          dispatch(push(from));
        }else{
          dispatch(push('/user/address'));
        }
      }).catch(err=>{
        return dispatch(showToaster(err.data.info));
      });
  };
};

export const delAddress = (id) => {
  return (dispatch,getState) =>{
    return api('get','user/address/delete',id)
      .then(response => ({json: response.data, status: response.status}))
      .then(({json,status}) => {
        if(status == 400){
          return dispatch(showToaster(json.info));
        }
        dispatch(showToaster(json.info));
        dispatch(getAddressList());
      }).catch(err=>{
        return dispatch(showToaster(err.data.info));
      });
  };
};

//退出登录
export function logout() {
  return dispatch => {
    removeToken();
    dispatch(push('/'));
  };
}