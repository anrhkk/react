import { push } from 'react-router-redux';
import { api } from '../utils/api';
import { setToken } from '../utils/func';
import { showToaster } from './app';
//获取广告
export const login = (values) =>{
  return (dispatch,getState) =>{
    return api('post','login/index','',values)
      .then(response => ({json: response.data, status: response.status}))
      .then(({json,status}) => {
        if(status == 400){
          return dispatch(showToaster('登录失败'));
        }
        dispatch(showToaster(json.info));
        setToken(json.token);
        dispatch(push('/'));
      }).catch(err=>{
        //登录异常
        return dispatch(showToaster(err.data.info));
      });
  };
};

//获取验证码
export const getCaptcha = (tel) =>{
  return (dispatch,getState)=>{
    return api('get','login/captcha',tel)
      .then(response => ({json: response.data, status: response.status}))
      .then(({json,status}) => {
        if(status == 400){
          return dispatch(showToaster(json.info));
        }
        return dispatch(showToaster(json.info,'success'));
        
      }).catch(err=>{
        return dispatch(showToaster(err.data.info));
      });
  };
};