import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import cookie from 'react-cookie';
import Header from '../Header';
import * as actions from '../../actions/user';

const mapStateToProps = state =>{
  return {
    initialValues: state.user.toJS().address.init,
    area: state.user.toJS().address.area
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = '姓名不能为空';
  }
  if (!values.tel) {
    errors.tel = '手机号不能为空';
  } else if (values.tel.length !== 11) {
    errors.tel = '手机号长度是11位';
  }
  if (!values.province) {
    errors.province = '请选择省市';
  }
  if (!values.city) {
    errors.city = '请选择区市';
  }
  if (!values.region) {
    errors.region = '请选择县区';
  }
  if (!values.address) {
    errors.address = '详细地址不能为空';
  }
  if (!values.is_default) {
    errors.is_default = '请选择是否默认';
  }
  return errors;
};

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'address',
  fields: ['name', 'tel', 'province', 'city', 'region', 'address', 'is_default'],
  validate
})
export default class UserAddressForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    area: PropTypes.object
  };

  componentDidMount() {
    const { params:{id}, actions, location } = this.props;
    if(!cookie.load('from') && location.query.from){
      cookie.save('from', location.query.from,{ path: '/' });
    }
    actions.getAddress(id);
  }

  componentWillReceiveProps(nextProps) {
    const { params:{id}, values, actions } = this.props;
    if(values.province !=='undefined' && nextProps.values.province !=='undefined' &&  values.province !== nextProps.values.province && values.city == nextProps.values.city){
      actions.getAddress(id,{province: nextProps.values.province});
    }
    if(values.city !=='undefined' && nextProps.values.city !=='undefined' && values.city !== nextProps.values.city && values.province == nextProps.values.province){
      actions.getAddress(id,{province: nextProps.values.province,city: nextProps.values.city});
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    const { params:{id}, values, actions } = this.props;
    actions.postAddress(id,values);
  }

  render() {
    const { fields:{name,tel,province,city,region,address,is_default }, invalid, submitting, area } = this.props;
    return (
      <div className="container">
        <Header title="收货地址" back={true} search={false}/>
          <div className="content no-footer">
            <form className="address bg-white" onSubmit={this.handleSubmit}>
              <div className="field">
                <input type="text"
                       placeholder="姓名"
                       required
                  {...name} />
                {name.touched && name.error && <strong className="tip">{name.error}</strong>}
              </div>
              <div className="field">
                <input type="number"
                       placeholder="手机号"
                       maxLength="11"
                       required
                  {...tel} />
                {tel.touched && tel.error && <strong className="tip">{tel.error}</strong>}
              </div>
              <div className="field">
                <select {...province}>
                  {province.error && <option value="">{province.error}</option>}
                  {area && area.province.map((p,i)=><option value={p.id}  key={i} >{p.name}</option>)}
                </select>
              </div>
              <div className="field">
                <select {...city}>
                  {city.error && <option value="">{city.error}</option>}
                  {area && area.city && area.city.map((c,i)=><option value={c.id}  key={i} >{c.name}</option>)}
                </select>
              </div>
              <div className="field">
                <select {...region}>
                  {region.error && <option value="">{region.error}</option>}
                  {area && area.region && area.region.map((r,i)=><option value={r.id}  key={i} >{r.name}</option>)}
                </select>
              </div>
              <div className="field">
                <textarea placeholder="详细地址" required {...address} />
                {address.touched && address.error && <strong className="tip">{address.error}</strong>}
              </div>
              <div className="field">
                <select {...is_default}>
                  {is_default.error && <option value="">{is_default.error}</option>}
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </div>
              <div className="field">
                <input disabled={ invalid || submitting } type="submit" value="提 交"/>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
