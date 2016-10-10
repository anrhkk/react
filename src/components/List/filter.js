import React, { Component, PropTypes } from 'react';

export default class Filter extends Component {
  constructor(props){
    super(props);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.closeExpand = this.closeExpand.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeList = this.changeList.bind(this);
    this.state = {id:'',expandOpen:false,expandType:'',expandSubIcon:'iconfont icon-fangxiangxia',expandSortIcon:'iconfont icon-fangxiangxia'};
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    rightFilter: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    expand: PropTypes.string.isRequired
  }

  componentWillMount(){
    const { params } = this.props;
    this.setState({id:params.id});
  }

  componentWillReceiveProps(nextProps){
    const { actions,expand } = this.props;
    if(expand == nextProps.expand){
      actions.toggleExpand('');
      this.setState({expandSubIcon:'iconfont icon-fangxiangxia',expandSortIcon:'iconfont icon-fangxiangxia'});
    }
  }

  toggleExpand(e,expand){
    e.preventDefault();
    if(this.state.expandType!==''&&this.state.expandType!==expand){
      this.setState({expandOpen:true});
    }else{
      this.setState({expandOpen:!this.state.expandOpen});
    }
    if(expand=='expand-sub'){
      this.setState({expandSubIcon:'iconfont icon-fangxiangshang'});
      this.setState({expandSortIcon:'iconfont icon-fangxiangxia'});
    }else{
      this.setState({expandSortIcon:'iconfont icon-fangxiangshang'});
      this.setState({expandSubIcon:'iconfont icon-fangxiangxia'});
    }
    this.setState({expandType:expand});
    const { actions } = this.props;
    if(this.state.expandOpen){
      actions.toggleExpand(expand);
    }else{
      if(this.props.expand){
        actions.toggleExpand('');
      }
      this.setState({expandSubIcon:'iconfont icon-fangxiangxia',expandSortIcon:'iconfont icon-fangxiangxia'});
    }
  }

  closeExpand(e){
    e.stopPropagation();
    if(e.target.id=='right-filter'){
      e.target.className='right-filter';
    }
  }
  
  changeSort(e,parameters){
    e.preventDefault();
    const { actions } = this.props;
    actions.getRightItem(this.state.id,parameters);
  }

  changeList(e,id){
    e.preventDefault();
    const { actions } = this.props;
    actions.getRightItem(id);
    this.setState({id:id});
  }

  render() {
    const { rightFilter,expand } = this.props;
    return (
      <div id="right-filter" className={ expand ? 'right-filter '+expand: 'right-filter' } onClick={e => this.closeExpand(e)}>
        <ul className="filter-titles">
          <li className="filter-title filter-title-sub" onClick={e => this.toggleExpand(e,'expand-sub')}>全部分类&nbsp;<i className={this.state.expandSubIcon}></i></li>
          <li className="filter-title filter-title-sort" onClick={e => this.toggleExpand(e,'expand-sort')}>综合排序&nbsp;<i className={this.state.expandSortIcon}></i></li>
        </ul>
        <ul className="filter-items clear-float">
          {rightFilter.map((items,i)=>
            <li key={i} className="filter-item filter-item-sub" onClick={e => this.changeList(e,items.id)}>{items.name}</li>
          )}
          <li className="filter-item filter-item-sort" onClick={e => this.changeSort(e,{sortBy:'price,desc'})}>价格最高</li>
          <li className="filter-item filter-item-sort" onClick={e => this.changeSort(e,{sortBy:'price,asc'})}>价格最低</li>
          <li className="filter-item filter-item-sort" onClick={e => this.changeSort(e,{sortBy:'sort,desc'})}>综合排序</li>
        </ul>
      </div>
    );
  }
}