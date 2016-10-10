import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../Header';
import Footer from '../Footer';
import * as Actions from '../../actions/user';

const mapStateToProps = state =>{
  return {
    user: state.user.toJS()
  };
};
const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class User extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { actions } = this.props;
    actions.getUser();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <Header title="用户中心" back={false} search={false}/>
        <div className="content">
          <div className="user-top">
            <i className="iconfont icon-wo f1"></i>
            <h4>{user.user && user.user.tel}</h4>
          </div>
          <ul className="list">
            <li>
                <div className="title">我的订单</div>
                <div className="desc"><Link to="/user/order">查看所有订单</Link></div>
            </li>
            <li className="no-dot">
              <div className="grid user-order">
                <div className="col-4">
                  <Link to="/user/order/0">
                    <i className="iconfont icon-daifukuan"></i>
                    <div>待付款</div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/user/order/0">
                    <i className="iconfont icon-daishouhuo"></i>
                    <div>待收货</div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/user/order/0">
                    <i className="iconfont icon-daipingjia"></i>
                    <div>待评价</div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/user/order/0">
                    <i className="iconfont icon-1"></i>
                    <div>售后</div>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
          <ul className="list user-list">
            <Link to="/user/order">
              <li>
                <div className="title"><i className="iconfont icon-jifen"></i>葡萄币</div>
              </li>
            </Link>
            <Link to="/user/order">
              <li>
                <div className="title"><i className="iconfont icon-youhuiquan"></i>优惠券</div>
              </li>
            </Link>
            <Link to="/user/order">
              <li>
                <div className="title"><i className="iconfont icon-qiandao"></i>签到纪录</div>
              </li>
            </Link>
            <Link to="/user/address">
              <li>
                <div className="title"><i className="iconfont icon-address"></i>收货地址</div>
              </li>
            </Link>
            <Link to="/user/order">
              <li>
                <div className="title"><i className="iconfont icon-bangzhu"></i>常见问题</div>
              </li>
            </Link>
            <Link to="/user/order">
              <li>
                <div className="title"><i className="iconfont icon-xinxi"></i>意见反馈</div>
              </li>
            </Link>
          </ul>
          {user.id}
        </div>
        <Footer />
      </div>
    );
  }
}
