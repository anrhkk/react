import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const mapStateToProps = state =>{
  return {
    app: state.app.toJS(),
    cart: state.cart.toJS()
  };
};

@connect(mapStateToProps)
export default class Footer extends Component{
  constructor(props){
    super(props);
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
  };

  render(){
    const { app,cart } = this.props;
    return (
      <footer>
        <Link to={'/'}>
          <span className="iconfont icon-shouye"></span>
          <span className="footer-label">首页</span>
        </Link>
        <Link to={'/list/'+ app.categoryId}>
          <span className="iconfont icon-lipin"></span>
          <span className="footer-label">情趣超市</span>
        </Link>
        <Link to={'/cart'}>
              <span className="iconfont icon-gouwuche">
                <div className="cart-number">{cart.sum_number}</div>
              </span>
          <span className="footer-label">购物车</span>
        </Link>
        <Link to={'/user'}>
          <span className="iconfont icon-wo"></span>
          <span className="footer-label">个人中心</span>
        </Link>
      </footer>
    );
  }
}