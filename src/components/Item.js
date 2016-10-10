import React,{Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Slider from 'react-slick';
import Header from './Header';
import { map } from '../utils/func';
import * as Actions from '../actions/item';

const mapStateToProps = state =>{
  return {
    item: state.item.toJS(),
    cart: state.cart.toJS()
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Item extends Component{
  constructor(props){
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.changeCart = this.changeCart.bind(this);
    this.state = {number: 0,tabId: 1};
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { params:{ spu_id,sku_id }, actions } = this.props;
    actions.getItem(spu_id,sku_id);
  }

  changeTab(e,tabId){
    e.preventDefault();
    this.setState({tabId:tabId});
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
    const { item,cart } = this.props;
    return (
      <div className="container">
        <Header title={item.sku.title} back={true} search={false}/>
        <div className="content">
          <Slider arrows={false} autoplay={true} dots={true} autoplaySpeed="2000">
            {item.sku.images && item.sku.images.map((image,i)=>
              <div>
                <img key={i} src={image} alt={item.sku.title} width="100%" />
              </div>
            )}
          </Slider>
          <ul className="item">
            <li>
              <h4>{item.sku.name}</h4>
              <strong className="orange f1">¥{item.sku.price}</strong>&nbsp;<span className="line">¥{item.sku.market}</span>
            </li>
            {item.spec && map(item.spec,(s,i)=>
              <li  key={i}>
                <span className="grey">{s.spec}</span>&nbsp;&nbsp;
                {s.value && map(s.value,(v,j)=>
                  <a  key={j} href={'/item/' + item.spu.id + '/' + v.sku_id } className={v.active ? 'spec active' : 'spec'}>
                    {v.value}
                  </a>
                )}
              </li>
            )}
            {item.promotion && <li><span className="grey">促销</span>&nbsp;&nbsp;{item.promotion.name} {item.promotion.limit && ',每人限购'+item.promotion.limit+'件'}</li>}
            <li>
              <span className="grey">品牌</span>&nbsp;&nbsp;{item.sku.brand}
            </li>
          </ul>
          <ul className="tab-nav">
            <li className={this.state.tabId==1 && 'active'} onClick={e => this.changeTab(e,1)}>图文详情</li>
            <li className={this.state.tabId==2 && 'active'} onClick={e => this.changeTab(e,2)}>产品参数</li>
            <li className={this.state.tabId==3 && 'active'} onClick={e => this.changeTab(e,3)}>推荐搭配</li>
          </ul>
          <div className="tabs">
            <div className={this.state.tabId==1 ? 'tab active':'tab'}><p className="image-text" dangerouslySetInnerHTML={{__html: item.sku.content}}></p></div>
            <div className={this.state.tabId==2 ? 'tab active':'tab'}>
              <ul className="item">
                {item.type && map(item.type,(t,i)=>
                  <li  key={i}>
                    <span className="grey">{t.name}</span>&nbsp;&nbsp;{t.value}
                  </li>
                )}
              </ul>
            </div>
            <div className={this.state.tabId==3 ? 'tab active':'tab'}>
              <div className="grid">
                {item.relation && map(item.relation,(r,i)=>
                <div className="col-2 padding bg-white">
                  <a href={'/item/'+r.spu_id+'/'+r.id}>
                    <img src={r.image} alt={r.name} width="100%"/>
                    <div>{r.name}</div>
                    <strong className="orange">¥{r.price}</strong>&nbsp;
                    <span className="line">¥{r.market}</span>
                  </a>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="show-cart-operate">
            <a href="javascript:;" className="dec-cart" onClick={e => this.changeCart(e,item.spu.id,item.sku.id,0)}>-</a>
            <span className="number-cart">{this.state.number}</span>
            <a href="javascript:;" className="inc-cart" onClick={e => this.changeCart(e,item.spu.id,item.sku.id,1)}>+</a>
          </div>
          <Link to="/cart" className="show-cart-btn text-center">
            <span className="iconfont icon-gouwuche f1"></span>
            <div className="show-cart-number">{cart.sum_number}</div>
          </Link>
        </footer>
      </div>
    );
  }
}