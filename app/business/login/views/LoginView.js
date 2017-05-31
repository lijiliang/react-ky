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
import KYHeaderBar from 'kyBus/common/views/KYHeaderBar';
import KYFooterBar from 'kyBus/common/views/KYFooterBar';

import Button from 'kyBase/components/ux/Button';
import Toast from 'kyBase/components/ux/Toast';
import Icon from 'kyBase/components/ux/Icon';
// import loading from 'kyBase/resources/svg/loading.svg';
// import logo from 'kyBase/resources/svg/logo.svg';

import Base64 from 'js-base64';

import axios from 'axios';
import qs from 'qs';
import { get, post } from 'kyBase/common/fetchData';

import '../resources/LoginView.less';

class LoginView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isAccount: true,
        };
    }
    componentDidMount(){
        console.log('1LoginModel: ', this.props.LoginModel);

        this.props.LoginModel.set('account', 'asdfsdaf');
        console.log(this.props.LoginModel.toObject())
        const kyaniSecurity = Base64.Base64.encode('kyani-shop:security');
        // $.ajax({
        //     type: 'POST',
        //     url: 'http://10.206.41.67:8012/oauth/token',
        //     data: {
        //         grant_type : 'password',
        //         username :'2771081C',
        //         password : 'Ky5513687',
        //         scope : 'read write'
        //     },
        //     headers: {
        //         Authorization: 'Basic ' + kyaniSecurity,
        //         Accept: 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }, function(res){
        //     console.log(res)
        // })

        console.log(this.props)
    }
    loginHandle(){
        this.props.dispatch(login("2771081C","Ky5513687"))
        // const kyaniSecurity = Base64.Base64.encode('kyani-shop' + ':' + 'security');
        // axios.defaults.headers.common['Authorization'] = 'Basic ' + kyaniSecurity;
        // // axios.defaults.headers.post['Accept'] = 'application/json';
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // const response = post('http://10.206.41.67:8012/oauth/token', qs.stringify({
        //     grant_type : 'password',
        //     username :'2771081C',
        //     password : 'Ky5513687',
        //     scope : 'read write'
        // }));
        // response.then(function(res){
        //     axios.get('http://10.206.41.67:8012/test/test',{
        //         headers: {
        //             Authorization: "Bearer "+ res.data.access_token
        //         }
        //     }).then(function(obj){
        //
        //     })
        // })
    }
    // 记住帐号
    handleAccountChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            isAccount: value
        });
        Toast.info('请输入用户帐户！', 100);
        // Toast.offline('网络连接失败!', 100);
        // Toast.loading('加载中...', 100);
    }
    render(){
        return(
            <div className="ky-view-main">
                <KYHeaderBar  />
                <div className="ky-view-body">
                    <div className="ky-scrollable">
                        <div className="ky-login">
                            <h2 onClick={this.loginHandle.bind(this)}>登录我的帐户</h2>
                            <div className="ky-list-body">
                                <div className="ky-input-item">
                                    <div className="ky-input-label ky-center">
                                        <i className="icon icon-zaixiankefu"></i>
                                    </div>
                                    <div className="ky-input-control">
                                        <input type="text" placeholder="用户帐户"/>
                                    </div>
                                </div>
                                <div className="ky-input-item">
                                    <div className="ky-input-label ky-center">
                                        <i className="icon icon-zaixiankefu"></i>
                                    </div>
                                    <div className="ky-input-control">
                                        <input type="password" placeholder="密码"/>
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
                                    <Button className="ky-btn" title="登录" type="primary"/>
                                </div>
                                {/* <Icon type="loading" size='lg' /> */}

                                <div className="account-other">
                                    <span className="no-account-tit">没有帐号？</span>
                                    <Button className="ky-btn" title="会员注册"/>
                                    <Button className="ky-btn" title="消费者注册" onClick={e => console.log(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <KYFooterBar />
             </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel,
        HomeModel: state.HomeModel
    };
}


export default connect(
    mapStateToProps
)(LoginView);
