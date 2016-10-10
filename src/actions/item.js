import * as types from '../constants/item';
import { api } from '../utils/api';
export { changeCart } from './cart';
//获取商品详情
export const getItem = (spu_id,sku_id) =>{
  return {
    type: types.GET_ITEM,
    promise: api('get','item',spu_id+'/'+sku_id)
  };
};