/**
 * @fileOverview 支付完成页，失败和成功提示页
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as payAction from '../action/actionTypes';
import { getPayComplete } from '../action/DataAction';

import { Button, Toast, NavBar, Loading } from 'uxComponent';
import PaySuccessView from './PaySuccessView';
import PayFailedView from './PayFailedView';

import '../resources/CompleteView.less';

class PayCompleteView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount(){
        const payId = this.props.params.payid;
        this.props.dispatch(getPayComplete(payId, (res) => {
            this.setState({
                isLoading: false
            });
        }));
    }
    render(){
        const payInfo = this.props.PayCompleteModel;
        const payAmount = payInfo.get('payAmount'); //支付金额
        const paymentSucc = payInfo.get('paymentSucc'); //是否支付成功
        const regOrder = payInfo.get('regOrder'); //是否注册订单
        const tradeNo = payInfo.get('tradeNo'); //订单号
        const userName = payInfo.get('userName'); //用户名
        let layout;
        if(this.state.isLoading){
            layout = <div className="loading-container">
                <Loading size="large"/>
            </div>;
        }else{
            if(paymentSucc){
                layout = <PaySuccessView payAmount={payAmount} regOrder={regOrder} tradeNo={tradeNo} userName={userName} />;
            }else{
                layout = <PayFailedView payAmount={payAmount} regOrder={regOrder} tradeNo={tradeNo} userName={userName} />;
            }
        }

        return layout;
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        PayCompleteModel: state.PayCompleteModel
    };
}

export default connect(
    mapStateToProps
)(PayCompleteView);
