import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import Header from '../Header';
import * as Actions from '../../actions/user';

const mapStateToProps = state =>{
  return {
    address_list: state.user.toJS().address_list
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};
@connect(mapStateToProps,mapDispatchToProps)
export default class UserAddress extends Component {
  constructor(props){
    super(props);
    this.delAddress = this.delAddress.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    address_list: PropTypes.array.isRequired
  };

  componentDidMount() {
    const { actions,location } = this.props;
    if(!cookie.load('from') && location.query.from){
      cookie.save('from', location.query.from,{ path: '/' });
    }
    if(cookie.load('from') && !location.query.from){
      cookie.remove('from', { path: '/' });
    }
    actions.getAddressList();
  }

  delAddress(e,id){
    e.preventDefault();
    const { actions } = this.props;
    if(confirm('确认删除吗？')){
      actions.delAddress(id);
    }
  }

  render() {
    const { address_list } = this.props;
    return (
      <div className="container">
        <Header title="收货地址" back={true} search={false} right={{href:'/user/address/0',title:'添加地址'}}/>
        <div className="content no-footer">
          <table className="bg-white">
            <tbody>
            {address_list && address_list.map((item,i)=>
              <tr key={i}>
                <td>{item.name}({item.tel})</td>
                <td>{item.province+item.city+item.region}</td>
                <td>
                  <Link to={'/user/address/'+item.id}>修改</Link>
                </td>
                <td>
                  <a href="javascript:;" onClick={e => this.delAddress(e,item.id)}>删除</a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
