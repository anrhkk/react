import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import * as Actions from '../actions/cart';

const mapStateToProps = state =>{
  return {
    cart: state.cart.toJS()
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};
@connect(mapStateToProps,mapDispatchToProps)
export default class Cart extends Component {
  constructor(props){
    super(props);
    this.changeCart = this.changeCart.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
  };

  static fetchData(){
    return [Actions.getCart()];
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getCart();
  }

  componentWillReceiveProps(nextProps){
    const { actions,cart } = this.props;
    if(cart.sum_number !== nextProps.cart.sum_number){
      actions.getCart();
    }
  }

  changeCart(e,spuId,skuId,isInc){
    e.preventDefault();
    const { actions } = this.props;
    actions.changeCart(spuId,skuId,isInc);
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="container">
        <Header title="购物车" back={false} search={false} />
        <div className="content">
          <table className="bg-white">
            <tbody>
            {cart.cart && cart.cart.map((item,i)=>
              <tr key={i}>
                <td>{item.name}</td>
                <td align="center">¥{item.price}</td>
                <td>
                  <a href="javascript:;" className="dec-cart" onClick={e => this.changeCart(e,item.spu_id,item.sku_id,0)}>-</a>
                  <span className="number-cart">{item.number}</span>
                  <a href="javascript:;" className="inc-cart" onClick={e => this.changeCart(e,item.spu_id,item.sku_id,1)}>+</a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <div className="foot">
            共{cart.sum_number}件，¥{cart.sum_price} <Link className="float-right white padding-horizontal bg-color" to="/order">选好了</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
