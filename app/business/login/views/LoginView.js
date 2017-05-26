/**
 * @fileOverview 登录 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import KYHeaderBar from 'kyBus/common/views/KYHeaderBar';
import KYFooterBar from 'kyBus/common/views/KYFooterBar';

import Button from 'kyBase/components/ux/Button';
import Toast from 'kyBase/components/ux/Toast';

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
            isMore: false,
            isAccount: true,
        };
    }
    componentDidMount(){
        console.log('homeInfo: ', this.props.homeInfo);
        console.log(this.state.isAccount)
        const kyaniSecurity = Base64.Base64.encode('kyani-shop:security');
        $.ajax({
            type: 'POST',
            url: 'http://10.206.41.67:8012/oauth/token',
            data: {
                grant_type : 'password',
                username :'2771081C',
                password : 'Ky5513687',
                scope : 'read write'
            },
            headers: {
                Authorization: 'Basic ' + kyaniSecurity,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, function(res){
            console.log(res)
        })

        const aa = get('http://api.didadi.fm/index.php?act=index&op=cartype&brand_id=34&tuan_id=492&client=h5&_=1495676461468');
    }
    loginHandle(){
        const kyaniSecurity = Base64.Base64.encode('kyani-shop' + ':' + 'security');
        axios.defaults.headers.common['Authorization'] = 'Basic ' + kyaniSecurity;
        // axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        const response = post('http://10.206.41.67:8012/oauth/token', qs.stringify({
            grant_type : 'password',
            username :'2771081C',
            password : 'Ky5513687',
            scope : 'read write'
        }));
        response.then(function(res){
            axios.get('http://10.206.41.67:8012/test/test',{
                headers: {
                    Authorization: "Bearer "+ res.data.access_token
                }
            }).then(function(obj){

            })
        })
    }
    // 记住帐号
    handleAccountChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            isAccount: value
        });
        Toast.loading('这是一个 toast 提示!!!', 100);
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
        homeInfo: state.HomeModel
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);
