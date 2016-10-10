import * as types from '../constants/cart';
import { api } from '../utils/api';

//改变购物车数量
export const changeCart = (spuId,skuId,isInc) =>{
  return {
    type: types.CHANGE_CART,
    promise: api('get','changeCart/'+spuId+'/'+skuId+'/'+isInc)
  };
};

export const getCart = () =>{
  return {
    type: types.GET_CART,
    promise: api('get','cart')
  };
};