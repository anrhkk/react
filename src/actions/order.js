import * as types from '../constants/order';
import { push } from 'react-router-redux';
import { showToaster } from './app';
import { api } from '../utils/api';

export const getOrder = (values={}) =>{
  return {
    type: types.GET_ORDER,
    promise: api('get','order','',{params:values})
  };
};

export const postOrder = (values) =>{
  return (dispatch,getState) =>{
    return api('post','order','',values)
      .then(response => ({json: response.data, status: response.status}))
      .then(({json,status}) => {
        if(status == 400){
          return dispatch(showToaster(json.info));
        }
        dispatch(showToaster(json.info));
        dispatch(push('/'));
      }).catch(err=>{
        return dispatch(showToaster(err.data.info));
      });
  };
};
