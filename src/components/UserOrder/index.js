import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../Header';
import * as Actions from '../../actions/user';

const mapStateToProps = state =>{
  return {
    order_list: state.user.toJS().order_list
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};
@connect(mapStateToProps,mapDispatchToProps)
export default class UserOrder extends Component {
  constructor(props){
    super(props);
    this.delOrder = this.delOrder.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    order_list: PropTypes.array.isRequired
  };

  componentDidMount() {
    const { actions,params: { status } } = this.props;
    actions.getOrderList(status);
  }

  delOrder(e,id){
    e.preventDefault();
    const { actions } = this.props;
    if(confirm('确认删除吗？')){
      actions.delOrder(id);
    }
  }

  render() {
    const { order_list } = this.props;
    return (
      <div className="container">
        <Header title="我的订单" back={true} search={false} />
        <div className="content no-footer">
          <table className="bg-white">
            <tbody>
            {order_list && order_list.map((item,i)=>
              <tr key={i}>
                <Link to="/user/order/show">
                  <div>待收货</div>
                </Link>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
