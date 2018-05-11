/**
 * @fileOverview 登录 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';
import {getNav} from 'kyBus/common/action/DataAction';

import { createForm } from 'rc-form';
import { Button, Toast, NavBar, InputItem } from 'uxComponent';
import { Cache } from 'kyCommon';
import { getQueryString } from 'Utils';

import '../resources/LoginView.less';

class LoginView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            username: '',       //用户名
            password: '',       //密码
            isAccount: false,    // 是否记住帐户
        };
    }
    componentDidMount(){
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
        // 设置默认数据
        let kyCacheIsAccount = JSON.parse(Cache.get(Cache.keys.ky_cache_isAccount));
        if(kyCacheIsAccount){
            kyCacheIsAccount: true;
        }else{
            kyCacheIsAccount: false;
        }
        this.setState({
            username: kyCacheIsAccount ? Cache.get(Cache.keys.ky_cache_login_account) : '',
            isAccount: kyCacheIsAccount
        });
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.back();
    }

    loginHandle(){
        //this.props.dispatch(login("2771081C","Ky5513687"));
    }

    // 登录
    loginClickHandle(){
        const _backUrl = getQueryString('backUrl');
        console.log('要跳转的url', _backUrl)
        const form = this.props.form;
        form.validateFields((error, value) => {
            if(error){
                const fieldNames = ['username','password'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 2);
                        return;
                    }
                });
                return;
            }
            if(!error){
                this.setState(value);
                this.props.dispatch(login(this.state.username, this.state.password, this.state.isAccount, () => {
                    Toast.success('登录成功', 1);
                    // 登录成功后重新获取下导航栏数据
                    this.props.dispatch(getNav());
                    // setTimeout(() => {
                        // 如果有需要跳转的链接，则跳转过去，否则直接返回首页
                        if(_backUrl){
                            location.href = _backUrl;
                            // location.reload()
                        }else{
                            location.href = '/'
                            // hashHistory.push('/');
                        }
                    // }, 1000);
                }));
            }
        });
    }

    // 设置state
    stateChangeHandle(name, value){
       this.setState({
           [name]: value
       })
    }

    // 记住帐号
    handleAccountChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        this.setState({
            isAccount: value,
        });
    }
    render(){
        const { getFieldDecorator} = this.props.form;
        return(
            <div className="ky-scrollable bg-login">
                <div className="ky-login">
                    <NavBar leftContent=""
                        mode="tran"
                        onLeftClick={this.gohistoryHandle.bind(this)}
                        >登录我的帐户</NavBar>
                    <div className="ky-login-body">
                        {getFieldDecorator('username', {
                            initialValue: this.state.username,
                            rules: [{
                                required: true,
                                message: '输入您的会员帐号'
                            }]
                          })(
                            <InputItem
                                placeholder="请输入您的中国会员帐号"
                                onChange={this.stateChangeHandle.bind(this, 'username')}
                            >
                                <i className="icon icon-memberNo"></i>
                            </InputItem>
                         )}

                         {getFieldDecorator('password', {
                             rules: [{
                                 required: true,
                                 message: '请输入您的密码'
                             }]
                           })(
                             <InputItem
                                 placeholder="请输入您的密码"
                                 type="password"
                                 onChange={this.stateChangeHandle.bind(this, 'password')}
                             >
                                 <i className="icon icon-password"></i>
                             </InputItem>
                          )}
                        <div className="login-other-info">
                            <Link to='/account/forgetpwd' className="forget-password">忘记密码？</Link>
                            <a href="" className="forget-password">忘记帐户？</a>
                            <label className="login-checkbox">
                                <input
                                    className="input-checkbox"
                                    name="isAccount"
                                    type="checkbox"
                                    checked={this.state.isAccount}
                                    onChange={this.handleAccountChange.bind(this)} />
                                    <span className="checkbox-inner"></span>
                                记住帐户
                            </label>
                        </div>
                        <div className="login-btn">
                            <Button className="ky-btn" title="登录" type="primary" onClick={this.loginClickHandle.bind(this)}/>
                        </div>
                        <div className="account-other">
                            <span className="no-account-tit">没有帐号？</span>
                            <Link to='/account/regmember'><Button className="ky-btn" title="会员注册"/></Link>
                            <Link to='/account/regconsumer'><Button className="ky-btn" title="消费者注册"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const LoginViewWrapper = createForm()(LoginView);
/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(LoginViewWrapper);
