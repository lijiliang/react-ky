/**
 * @fileOverview 支付成功页
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {regConsumer} from '../action/DataAction';

import { Button, Toast, NavBar } from 'uxComponent';

import '../resources/PaySuccessView.less';

class PaySuccessView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    render(){
        return(
            <div className="ky-scrollable ky-paysuccess">
                <div className="m-paysuccess">
                    <NavBar iconName={false} mode="success">支付成功</NavBar>
                    <div className="success-view">
                        <div className="pay-price">您已成功支付￥10,888.00</div>
                        <i className="icon icon-paymentDone"></i>
                        <h2>我们将尽快为您配送商品！</h2>
                        <div className="user-info">
                            <div className="info-item">
                                <span>会员帐号</span>
                                <span>CN765434</span>
                            </div>
                            <div className="info-item">
                                <span>订单号</span>
                                <span>201792821132483</span>
                            </div>
                        </div>
                        <div className="goshop">
                            <Button className="ky-btn shop-btn" title="查看订单详情"></Button>
                            <Button className="ky-btn btn-gohome" title="返回首页"></Button>
                        </div>
                        <div className="info-more">
                            <p>今天开始凯娅尼助您体验更多</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaySuccessView;
