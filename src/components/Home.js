import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Slider from 'react-slick';
import Header from './Header';
import Footer from './Footer';
import Image from './List/image';
import * as Actions from '../actions/home';

const mapStateToProps = state =>{
  return {
    home: state.home.toJS()
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component {
  constructor(props){
    super(props);
  }
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired
  };

  static fetchData(){
    return [Actions.getHome()];
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getHome();
  }

  render() {
    const { home } = this.props;
    return (
      <div className="container">
        <Header title="葡萄情趣-成人之美"/>
        <div className="content" id="content">
          <Slider arrows={false} autoplay={true} dots={true} autoplaySpeed="2000">
            {home.topAdvert.map((items,i)=>
            <div key={i}>
              <Link to={items.link}>
                <img src={items.image} alt={items.name} width="100%" />
              </Link>
            </div>
            )}
          </Slider>
          <div className="grid">
            {home.centerAdvert.map((items,i)=>
            <div key={i} className="col-3">
              <Link to={items.link}>
                <img src={items.image} alt={items.name} width="100%" />
              </Link>
            </div>
            )}
          </div>
          {home.bottomCategory.map((items,k)=>
            <div key={k} className="card">
            <h4>{items.name}</h4>
            <div className="grid">
              {items.sku.map((item,i)=>
                <div key={i} className="col-3">
                  <Link to={'/item/'+item.spu_id+'/'+item.id}>
                    <Image src={item.image} containerId="content" />
                    <div>{item.name}</div>
                    <strong className="orange">¥{item.price}</strong>&nbsp;
                    <span className="line">¥{item.market}</span>
                  </Link>
                </div>
              )}
            </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
