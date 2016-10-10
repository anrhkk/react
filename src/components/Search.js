import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import Header from './Header';
import Footer from './Footer';
import Image from './List/image';
import * as Actions from '../actions/search';

const mapStateToProps = state =>{
  return {
    search: state.search.toJS()
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Search extends Component {
  constructor(props){
    super(props);
    this.getResult = this.getResult.bind(this);
  }
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getSearch(cookie.load('keyword'));
    const content = window.document.getElementById('content');
    content.addEventListener('scroll', function () {
      window.localStorage.setItem('searchScrollTop',content.scrollTop);
    });
    if(window.localStorage.getItem('searchScrollTop')>0){
      content.scrollTop=window.localStorage.getItem('searchScrollTop');
    }
  }

  getResult(e,name){
    e.preventDefault();
    const { actions } = this.props;
    actions.getSearch(name);
    cookie.save('keyword', name,{ path: '/' });
  }

  render() {
    const { search } = this.props;
    return (
      <div className="container">
        <Header title="葡萄情趣-成人之美" search={false}/>
        <div className="content" id="content">
          <div className="search-input">
            <span className="iconfont icon-sousuo"></span>
            <input type="search" defaultValue={cookie.load('keyword')} id="search" onBlur={e => this.getResult(e,e.target.value)} placeholder="输入关键字..." />
          </div>
          <ul className="search-hots">
            <div className="padding">热门搜索</div>
            {search.hots && search.hots.map((item,i)=>
            <li key={i}><a href="javascript:;" onClick={e => this.getResult(e,item)}>{item}</a></li>
            )}
          </ul>
          {search.result && <div className="grid">
            {search.result.map((item,i)=>
              <div key={i} className="col-3">
                <Link to={'/item/'+item.spu_id+'/'+item.id}>
                  <Image src={item.image} containerId="content" />
                  <div>{item.name}</div>
                  <strong className="orange">¥{item.price}</strong>&nbsp;
                  <span className="line">¥{item.market}</span>
                </Link>
              </div>
            )}
          </div>}
        </div>
        <Footer />
      </div>
    );
  }
}
