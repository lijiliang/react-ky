/*
 * fileOverview 路由配置文件
 */
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import ConfigureStore from '../store/ConfigureStore';
import RouterFilter from './RouterFilter';

import Launch from './Launch';
import HomeView from 'kyBus/home/views/IndexView';
import LoginView from 'kyBus/login/views/LoginView';             // 登录

// user
import UserIndexView from 'kyBus/user/views/IndexView';          // 会员中心首页
import RegConsumerView from 'kyBus/user/views/RegConsumerView';  // 消费者注册
import RegSuccessView from 'kyBus/user/views/RegSuccessView';    // 消费者注册成功
import RegMemberView from 'kyBus/user/views/RegMemberView';      // 注册会员帐号
import RegSelectPackView from 'kyBus/user/views/RegSelectPackView';    // 选购加入套组
import RegOrderView from 'kyBus/user/views/RegOrderView';        // 确认订单及填写收货地址
import PayMentView from 'kyBus/user/views/PayMentView';          // 填写支付信息
import PaySuccessView from 'kyBus/user/views/PaySuccessView';    // 支付成功
import PayFailedView from 'kyBus/user/views/PayFailedView';      // 支付失败

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
                    <Route path='/user' component={UserIndexView} >
                        <Route path='/user/regconsumer' component={RegConsumerView}/>
                        <Route path='/user/regsuccess' component={RegSuccessView}/>
                        <Route path='/user/regmember' component={RegMemberView}/>
                        <Route path='/user/regselectpack' component={RegSelectPackView}/>
                        <Route path='/user/regorder' component={RegOrderView}/>
                        <Route path='/user/payment' component={PayMentView}/>
                        <Route path='/user/paysuccess' component={PaySuccessView}/>
                        <Route path='/user/payfailed' component={PayFailedView}/>
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
