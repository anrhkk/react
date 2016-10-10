import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import Header from './Header';
import * as Actions from '../actions/order';
import { map } from '../utils/func';

const mapStateToProps = state =>{
  return {
    order: state.order.toJS(),
    initialValues: state.order.toJS().init
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

const validate = values => {
  const errors = {};
  if (!values.address_id || !values.address_name || !values.address_tel || !values.address_province || !values.address_city || !values.address_region || !values.address_address ) {
    errors.address_id = '请先添加收货地址';
  }
  return errors;
};
@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'order',
  fields: ['user_id','address_id','address_name','address_tel','address_province','address_city','address_region','address_address','coupon_id','promotion_order_id','pay_type','delivery_id','remark'],
  validate
})
export default class Order extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { actions } = this.props;
    actions.getOrder();
  }

  componentWillReceiveProps(nextProps) {
    const { values, actions } = this.props;
    if(values.delivery_id !== nextProps.values.delivery_id){
      actions.getOrder({promotion_order_id: nextProps.values.promotion_order_id,delivery_id:nextProps.values.delivery_id});
    }
  }
  
  handleSubmit (e) {
    e.preventDefault();
    const { values, actions } = this.props;
    actions.postOrder(values);
  }

  render() {
    const { fields: { user_id,address_id,address_name,address_tel,address_province,address_city,address_region,address_address,coupon_id,promotion_order_id,pay_type,delivery_id,remark }, invalid, submitting, order } = this.props;
    return (
      <div className="container">
        <Header title="确认订单" back={true} search={false} />
        <div className="content no-footer">
          <form className="order" onSubmit={this.handleSubmit}>
            <table className="bg-white">
              <thead>
                <tr><td colSpan="2">收货地址</td></tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  {order.address ? order.address.address_name+order.address.address_tel+order.address.address_province+order.address.address_city+order.address.address_region+order.address.address_address:address_id.error}
                </td>
                <td width="10%">
                  {order.address ? <Link to="/user/address?from=/order">修改</Link>:<Link to="/user/address/0?from=/order">添加</Link>}
                </td>
                <td width="5%">
                  <i className="iconfont icon-xiangyou"></i>
                </td>
              </tr>
              </tbody>
            </table>
            <input type="hidden" {...address_id} />
            <input type="hidden" {...address_name} />
            <input type="hidden" {...address_tel} />
            <input type="hidden" {...address_province} />
            <input type="hidden" {...address_city} />
            <input type="hidden" {...address_region} />
            <input type="hidden" {...address_address} />
            <table className="bg-white margin-vertical">
              <thead>
              <tr><td colSpan="2">商品详细</td></tr>
              </thead>
              <tbody>
              {order.promotion.cart && order.promotion.cart.map((item,i)=>
                <tr key={i}>
                  <td>{item.name}</td>
                  <td align="center">¥{item.real_prices}</td>
                  <td>x{item.number}{item.promotion_id && '('+item.promotion_name+')'}</td>
                </tr>
              )}
              </tbody>
            </table>
            {order.coupon && <table className="bg-white margin-vertical">
              <thead>
              <tr><td colSpan="2">优惠券</td></tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  {order.coupon.name}
                  <input type="hidden" {...coupon_id} />
                </td>
                <td>¥{order.coupon.money}</td>
              </tr>
              </tbody>
            </table>}
            {order.promotion_order && <table className="bg-white margin-vertical">
              <thead>
              <tr><td>订单优惠</td></tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <select {...promotion_order_id}>
                    {map(order.promotion_order,(p,i,k)=><option value={i} key={k}>{p.promotion_order_name}(¥{p.promotion_order_price})</option>)}
                  </select>
                </td>
              </tr>
              </tbody>
            </table>}
            <table className="bg-white margin-vertical">
              <thead>
              <tr><td>支付方式</td></tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <select {...pay_type}>
                    <option value="1">微信支付</option>
                    <option value="2">支付宝</option>
                  </select>
                </td>
              </tr>
              </tbody>
            </table>
            {order.delivery && <table className="bg-white margin-vertical">
              <thead>
              <tr><td>配送方式</td></tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select {...delivery_id}>
                      {map(order.delivery,(d,i,k)=><option value={i}  key={k} >{d.express}(¥{d.real_price})</option>)}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>}
            <table className="bg-white margin-vertical">
              <thead>
              <tr><td>订单备注</td></tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <textarea placeholder="订单备注" {...remark} />
                </td>
              </tr>
              </tbody>
            </table>
            <table className="bg-white margin-vertical">
              <thead>
              <tr><td colSpan="2">结算详情</td></tr>
              </thead>
              <tbody>
              <tr>
                <td>商品数量</td><td>{order.promotion.number}</td>
              </tr>
              <tr>
                <td>商品葡萄币</td><td>{order.promotion.score}</td>
              </tr>
              <tr>
                <td>商品总价</td><td>{order.promotion.real_prices}</td>
              </tr>
              {order.checkout.coupon_money>0 && <tr>
                <td>优惠券抵扣</td><td>{order.checkout.coupon_money}</td>
              </tr>}
              {order.checkout.promotion_order_price>0 && <tr>
                <td>订单优惠</td><td>{order.checkout.promotion_order_price}</td>
              </tr>}
              {order.checkout && <tr>
                <td>订单运费</td><td>{order.checkout.delivery_real_price}</td>
              </tr>}
              <tr>
                <td><strong>总计</strong></td>
                <td><strong className="orange">¥{order.promotion.real_prices-order.checkout.promotion_order_price-order.checkout.coupon_money+Number(order.checkout.delivery_real_price)}</strong></td>
              </tr>
              </tbody>
            </table>
            <div className="margin-vertical padding-horizontal bg-white">
               <input type="hidden" {...user_id} />
               <input type="submit" disabled={ invalid || submitting } value="提交订单" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

