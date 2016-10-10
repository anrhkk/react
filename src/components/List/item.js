import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Image from './image';
import * as Actions from '../../actions/cart';

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
export default class Item extends Component {
  constructor(props){
    super(props);
    this.changeCart = this.changeCart.bind(this);
    this.state = {number:0};
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };
  
  static fetchData(){
    return [Actions.getCart()];
  }

  checkNumber(){
    const { item, cart } = this.props;
    for (let i = 0; i < cart.cart.length; i++) {
      if (item.spu_id== cart.cart[i].spu_id && item.id== cart.cart[i].sku_id ) {
        return cart.cart[i].number;
      }
    }
    return 0;
  }

  componentWillMount(){
    let checkNumber = this.checkNumber();
    if(checkNumber>0){
      this.setState({number:checkNumber});
    }
  }

  componentWillReceiveProps(nextProps){
    let checkNumber = this.checkNumber();
    if ((nextProps.params.id !== this.props.params.id) && checkNumber==0 ){
      this.setState({number:0});
    }
    if(checkNumber>0){
      this.setState({number:checkNumber});
    }
  }

  changeCart(e,spuId,skuId,isInc){
    e.preventDefault();
    const { actions } = this.props;
    if(isInc){
      this.setState({number:this.state.number+1});
    }else{
      this.setState({number:this.state.number-1});
    }
    actions.changeCart(spuId,skuId,isInc);
  }
  
  render() {
    const { item } = this.props;
    return (
      <li className="clear-float">
        <div className="item-image">
          <Image src={item.image} containerId="right-item" />
        </div>
        <div className="item-meta">
          <div className="item-title">
            <Link to={'/item/'+item.spu_id+'/'+item.id}>
              {item.name}
            </Link>
          </div>
          <div className="item-price clear-float">
            <strong className="orange">¥{item.price}</strong>&nbsp;<span className="line">¥{item.market}</span>
            <div className="float-right">
              {this.state.number>0 && <a href="javascript:;" className="dec-cart" onClick={e => this.changeCart(e,item.spu_id,item.id,0)}>-</a>}
              {this.state.number>0 && <span className="number-cart">{this.state.number}</span>}
              <a href="javascript:;" className="inc-cart" onClick={e => this.changeCart(e,item.spu_id,item.id,1)}>+</a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}