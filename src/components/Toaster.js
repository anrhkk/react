import React,{Component,PropTypes} from 'react';

export default class Toaster extends Component{
  constructor(props){
    super(props);
  }

  static propTypes = {
    hideToaster: PropTypes.func.isRequired,
    toaster: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps){
    const { toaster } = nextProps;
    const { hideToaster } = this.props;
    if(toaster.content !== '' && toaster.type){
      setTimeout(function () {
        hideToaster();
      },2000);
    }
  }

  render(){
    const { toaster } = this.props;
    return (
      <div className={toaster.content ? 'toaster active' : 'toaster'}>
        {toaster.content}
      </div>
    );
  }
}