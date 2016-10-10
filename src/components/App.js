import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/app';
import Toaster from './Toaster';

const mapStateToProps = state =>{
  return {
    app: state.app.toJS(),
    toaster: state.toaster.toJS()
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    toaster: PropTypes.object.isRequired,
    children: PropTypes.node,
    actions: PropTypes.object.isRequired
  };

  static fetchData(){
    return [Actions.getApp()];
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getApp();
  }

  render() {
    const { children, toaster, actions } = this.props;
    return (
        <div className="container">
          {children}
          <Toaster toaster={toaster} hideToaster={actions.hideToaster} />
        </div>
    );
  }
}
