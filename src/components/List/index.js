import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Filter from './filter';
import Item from './item';
import Header from '../Header';
import Footer from '../Footer';
import * as Actions from '../../actions/list';

const mapStateToProps = state =>{
  return {
    list: state.list.toJS()
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class List extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };

  static fetchData(id){
    return [Actions.getLeftCategory(id),Actions.getRightFilter(id),Actions.getRightItem(id)];
  }


  componentDidMount() {
    const { params: { id },list } = this.props;
    if(list.leftCategory.length < 1){
      this.fetchListData(id);
    }
    const rightItem = window.document.getElementById('right-item');
    rightItem.addEventListener('scroll', function () {
      window.localStorage.setItem('scrollTop',rightItem.scrollTop);
    });
    if(window.localStorage.getItem('scrollTop')>0){
      rightItem.scrollTop=window.localStorage.getItem('scrollTop');
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchListData(nextProps.params.id);
      window.localStorage.setItem('scrollTop',0);
      window.document.getElementById('right-item').scrollTop=0;
    }
  }

  fetchListData(id){
    const { actions } = this.props;
    if(id) {
      actions.getLeftCategory(id);
      actions.getRightFilter(id);
      actions.getRightItem(id);
    }
  }
  
  render() {
    const { actions,list,params } = this.props;
    return (
      <div className="container">
        <Header title="葡萄超市"/>
          <div className="content">
              <div className="left-category">
                  <ul>
                      {list.leftCategory.map((items,i)=>
                          <li key={i} className={(params.id == items.id)?'active':''}>
                              <Link to={'/list/' + items.id }>
                                  {items.name}
                              </Link>
                          </li>
                      )}
                  </ul>
              </div>
              <Filter actions={actions} rightFilter={list.rightFilter} expand={list.expand} params={params}/>
              <div className="right-item" id="right-item">
                <ul>
                  {list.rightItem.map((item,i)=>
                    <Item key={i} item={item} params={params}/>
                  )}
                </ul>
              </div>
          </div>
        <Footer />
      </div>
    );
  }
}