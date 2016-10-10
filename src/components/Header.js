import React,{Component,PropTypes} from 'react';
import { Link } from 'react-router';

export default class Header extends Component{
  constructor(props){
    super(props);
  }

  static defaultProps = {
    back: false,
    title: null,
    search: true,
    right: null
  };

  static propTypes = {
    back: PropTypes.bool,
    title: PropTypes.string,
    search: PropTypes.bool,
    right: PropTypes.object
  };

  render(){
    const { back,title,search,right } = this.props;
    return (
      <header>
        {back && <a href="javascript:window.history.back();" className="float-left iconfont icon-fanhui"></a>}
        <div className="title">{title}</div>
        {search && <a href="/search" className="float-right iconfont icon-sousuo"></a>}
        {right && <Link to={right.href} className="float-right iconfont">{right.title}</Link>}
      </header>
    );
  }
}