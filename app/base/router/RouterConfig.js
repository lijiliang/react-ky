/*
 * fileOverview 路由配置文件
 */
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import ConfigureStore from '../store/ConfigureStore';

import Launch from './Launch';
import HomeView from 'kyBus/home/views/IndexView';
import LoginView from 'kyBus/login/views/LoginView';

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
                <Route path='/' component={Launch}>
                    <IndexRoute component={HomeView}/>
                    <Route path='login' component={LoginView}/>
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
