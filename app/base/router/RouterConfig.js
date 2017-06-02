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
import LoginView from 'kyBus/login/views/LoginView';  // 登录
import RegConsumerView from 'kyBus/user/views/RegConsumerView';  // 消费者注册

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
                    <Route path='regconsumer' component={RegConsumerView}/>
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
