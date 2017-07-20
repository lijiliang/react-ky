/*
 * fileOverview 路由配置文件
 */
import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import ConfigureStore from '../store/ConfigureStore';
import RouterFilter from './RouterFilter';

import Launch from './Launch';
import HomeView from 'kyBus/home/views/IndexView';
import LoginView from 'kyBus/login/views/LoginView';             // 登录

// account 用户注册相关
import AccountIndexView from 'kyBus/account/views/IndexView';          // 会员中心首页
import RegConsumerView from 'kyBus/account/views/RegConsumerView';  // 消费者注册
import RegSuccessView from 'kyBus/account/views/RegSuccessView';    // 消费者注册成功
import RegMemberView from 'kyBus/account/views/RegMemberView';      // 注册会员帐号
import RegSelectPackView from 'kyBus/account/views/RegSelectPackView';    // 选购加入套组
import RegOrderView from 'kyBus/account/views/RegOrderView';        // 确认订单及填写收货地址
import PayMentView from 'kyBus/account/views/PayMentView';          // 填写支付信息
import PaySuccessView from 'kyBus/account/views/PaySuccessView';    // 支付成功
import PayFailedView from 'kyBus/account/views/PayFailedView';      // 支付失败
import ForgetpwdView from 'kyBus/account/views/ForgetpwdView';      // 忘记密码
import ForgetSuccessView from 'kyBus/account/views/ForgetSuccessView';      // 重置密码成功页

// user
import UserIndexView from 'kyBus/user/views/IndexView';          // 会员中心首页
import SafetyView from 'kyBus/user/views/SafetyView';            // 帐户安全
import SafetyPwdView from 'kyBus/user/views/SafetyPwdView';      // 帐户安全 - 修改密码
import SafetySuccessView from 'kyBus/user/views/SafetySuccessView';    // 帐户安全 - 修改密码成功
import CouponView from 'kyBus/user/views/CouponView';            // 我的优惠券
import BasicInfoView from 'kyBus/user/views/BasicInfoView';      // 基本信息

// cart 购物车
import CartIndexView from 'kyBus/cart/views/IndexView';          // 购物车首页
import CartOrderView from 'kyBus/cart/views/CartOrderView';      // 购物车->核对订单信息
/*
 * 路由
 */
class RouterMap extends React.Component {
    updateHandle(){
        console.log('每次router变化之后都会触发');
    }
    render(){
        return(
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={Launch}
                onEnter={
                    function(nextState, replace, callback){
                        RouterFilter.process(nextState, replace, callback);
                    }
                }
                onChange={
                    function(prevState, nextState, replace, callback){
                        RouterFilter.process(nextState, replace, callback,prevState);
                    }
                }
                >
                    <IndexRoute component={HomeView}/>
                    <Route path='login' component={LoginView}/>
                    <Redirect from="/account" to="/account/regmember"/>
                    <Route path='/account' component={AccountIndexView} >
                        <Route path='/account/regconsumer' component={RegConsumerView}/>
                        <Route path='/account/regsuccess' component={RegSuccessView}/>
                        <Route path='/account/regmember' component={RegMemberView}/>
                        <Route path='/account/regselectpack' component={RegSelectPackView}/>
                        <Route path='/account/regorder' component={RegOrderView}/>
                        <Route path='/account/payment' component={PayMentView}/>
                        <Route path='/account/paysuccess' component={PaySuccessView}/>
                        <Route path='/account/payfailed' component={PayFailedView}/>
                        <Route path='/account/forgetpwd' component={ForgetpwdView}/>
                        <Route path='/account/forgetsuccess' component={ForgetSuccessView}/>
                    </Route>
                    <Route path='/user' component={UserIndexView} >
                        <Route path='/user/safety' component={SafetyView}/>
                        <Route path='/user/safetypwd' component={SafetyPwdView}/>
                        <Route path='/user/safetysuccess' component={SafetySuccessView}/>
                        <Route path='/user/coupon' component={CouponView}/>
                        <Route path='/user/basicinfo' component={BasicInfoView}/>
                    </Route>
                    <Route path='/cart' component={CartIndexView} >
                        <Route path='/cart/order' component={CartOrderView}/>
                    </Route>
                    {/* <Route path='*' component={NotFound}/> */}
                </Route>
            </Router>
        );
    }
}

/**
 * 绑定 react-redux
 */
const store = ConfigureStore();
window.store=store;
class RouterConfig extends React.Component{
    render(){
        return(
            <Provider store={store} key="provider">
                <RouterMap history={hashHistory}/>
            </Provider>
        );
    }
}

export default RouterConfig;
