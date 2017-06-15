/**
 * @fileOverview 支付失败页
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {regConsumer} from '../action/DataAction';

import { Button, Toast, NavBar } from 'uxComponent';

import '../resources/PayFailedView.less';

class PayFailedView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    render(){
        return(
            <div className="ky-scrollable-white">
                <div className="m-payfailed">
                    <NavBar iconName={false} mode="error">支付失败</NavBar>
                    <div className="failed-info">
                        <p>尚未加入成为凯娅尼会员, </p>
                        <p>请再次尝试。</p>
                    </div>
                    <div className="m-btn">
                        <Button className="ky-btn btn-pay" title="重新支付"></Button>
                    </div>
                    <p className="info-item">若重复出现此信息，请联系线上客服。</p>
                    <div className="m-btn">
                        <Button className="ky-btn btn-contact" title="联系线上客服"></Button>
                    </div>
                    <p className="info-item">或联络凯娅尼中国客户服务热线 400 094 1171</p>
                    <p className="info-item">或电邮至 cs.cn@kyanicorp.com</p>
                </div>
            </div>
        );
    }
}

export default PayFailedView;
