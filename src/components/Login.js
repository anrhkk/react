import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Header from './Header';
import Footer from './Footer';
import * as actions from '../actions/login';

const mapStateToProps = state =>{
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

const validate = values => {
  const errors = {};
  if (!values.tel) {
    errors.tel = '手机号必须';
  } else if (values.tel.length !== 11) {
    errors.tel = '手机号长度是11位';
  }
  if (!values.captcha) {
    errors.captcha = '验证码必须';
  } else if (values.captcha.length !== 6) {
    errors.captcha = '验证码是6位数字';
  }
  return errors;
};

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'login',
  fields: ['tel', 'captcha'],
  validate
})
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { isCaptcha: false, second: 30};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCaptcha = this.getCaptcha.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    app: PropTypes.object.isRequired
  };

  getCaptcha(e){
    e.preventDefault();
    const { actions,values } = this.props;
    actions.getCaptcha(values.tel);
    var _this = this;
    _this.setState({ isCaptcha: true });
    let countDown = setInterval(function () {
      _this.setState({ second: _this.state.second-1 });
    },1000);
    setTimeout(function () {
      clearInterval(countDown);
      _this.setState({ isCaptcha: false,second: 30 });
    },30000);
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values } = this.props;
    const { actions } = this.props;
    actions.login(values);
  }

  render() {
    const { fields: { tel, captcha }, invalid, submitting } = this.props;
    return (
      <div className="container">
        <Header title="用户登录" back={false} search={true}/>
          <div className="content">
            <form className="login bg-white" onSubmit={this.handleSubmit}>
              <div className="field">
                <input type="number"
                       placeholder="手机号"
                       maxLength="11"
                       required
                  {...tel} />
                {tel.touched && tel.error && <div className="tip">{tel.error}</div>}
                <button type="button" className="captcha" disabled={ tel.invalid || this.state.isCaptcha } onClick={e => this.getCaptcha(e)}>{(this.state.second<30) ? this.state.second+'秒后重新发送' :'获取验证码'}</button>
              </div>
              <div className="field">
                <input type="number"
                       maxLength="6"
                       required
                       placeholder="短信验证码"
                  {...captcha} />
                {captcha.touched && captcha.error && <div className="tip">{captcha.error}</div>}
              </div>
              <div className="field">
                <input disabled={ invalid || submitting } type="submit" value="登 录"/>
              </div>
            </form>
          </div>
        <Footer />
      </div>
    );
  }
}
