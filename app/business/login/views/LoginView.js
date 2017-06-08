/**
 * @fileOverview 登录 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';

import Button from 'kyBase/components/ux/Button';
import Toast from 'kyBase/components/ux/Toast';
import NavBar from 'kyBase/components/ux/NavBar';
import 'kyBase/common/sValid';

import Base64 from 'js-base64';
import axios from 'axios';
import qs from 'qs';
import { get, post } from 'kyBase/common/FetchData';

import '../resources/LoginView.less';

class LoginView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            username: '',       //用户名
            password: '',       //密码
            isAccount: true,    // 是否记住帐户
        };
    }
    componentDidMount(){
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
        this.sValidEvent();
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    loginHandle(){
        this.props.dispatch(login("2771081C","Ky5513687"));
    }
    // 输入用户名
    changeUsername(){
        const username = $.trim(this.refs.username.value);
        this.setState({username:username});
    }
    // 输入密码
    changePassword(){
        const password = $.trim(this.refs.password.value);
        this.setState({password:password});
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
    // 登录
    loginClickHandle(){
        /* 先验证再执行登录逻辑 */
        if($.sValid()){
            this.props.dispatch(login(this.state.username, this.state.password, this.state.isAccount));
        }
        // $.ajax({
        //     type: 'POST',
        //     url: 'http://10.206.41.67:8012/user/logout',
        //     data: {
        //         username: '2771081C'
        //     },
        //     headers: {
        //         Authorization: "Bearer "+ 'd7e4b74e-7d2d-4b2a-a4c0-34f1b4cd04ed'
        //     },
        //     success: function(res){
        //         console.log(res)
        //     }
        // });
    }

    // 验证规则
    sValidEvent(){
        $.sValid.init({
            rules: {
                username: {
                    required: true,
                },
                password:  'required'
            },
            messages: {
                username: {
                    required: '请输入会员帐号！'
                },
                password: '请输入密码！'
            },
            callback: function(eId, eMsg, eRules){
                if(eId.length > 0){
                    let i = 0;
                    $.map(eMsg, function (idx, item) {
                        if (i === 0) {
                            Toast.info(idx, 1);
                        }
                        i++;
                    });
                }
            }
        });
    }
    render(){
        return(
            <div className="ky-scrollable">
                <div className="ky-login">
                    <NavBar leftContent=""
                        mode="tran"
                        onLeftClick={this.gohistoryHandle.bind(this)}
                        >登录我的帐户</NavBar>
                    <div className="ky-login-body">
                        <div className="ky-input-item">
                            <div className="ky-input-label ky-center">
                                <i className="icon icon-memberNo"></i>
                            </div>
                            <div className="ky-input-control">
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="请输入您的中国会员帐号"
                                    ref='username'
                                    onChange={this.changeUsername.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="ky-input-item">
                            <div className="ky-input-label ky-center">
                                <i className="icon icon-password"></i>
                            </div>
                            <div className="ky-input-control">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="密码"
                                    ref="password"
                                    onChange={this.changePassword.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="login-other-info">
                            <a href="" className="forget-password">忘记密码？</a>
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
                            <Button className="ky-btn" title="会员注册"/>
                            <Button className="ky-btn" title="消费者注册" onClick={e => console.log(e)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(LoginView);
