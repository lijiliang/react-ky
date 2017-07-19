/**
 * @fileOverview 注册消费者帐号 成功 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {regConsumer} from '../action/DataAction';

import { Button, Toast, NavBar } from 'uxComponent';

import '../resources/RegSuccessView.less';

class RegSuccessView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    componentDidMount(){
    }
    render(){
        return(
            <div className="ky-scrollable ky-regsuccess">
                <div className="m-regsuccess">
                    <NavBar iconName={false}>注册成功</NavBar>
                    <div className="regsuccess-view">
                        <i className="icon icon-paymentDone"></i>
                        <h2>欢迎加入凯娅尼</h2>
                        <p>您的凯娅尼消费者帐号:</p>
                        <p className="customer">CN6443266</p>
                        <p>请记下您的帐号,  </p>
                        <p>以方便日后登录或购物。</p>
                        <div className="goshop">
                            <Button className="ky-btn shop-btn" title="开始购物"></Button>
                        </div>
                        <p className="more">今天开始凯娅尼助您体验更多</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegSuccessView;
