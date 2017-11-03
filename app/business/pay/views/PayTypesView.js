/**
 * @fileOverview 选择支付方式 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as loginAction from '../action/actionTypes';
import { getPayAgain } from '../action/DataAction';

import { Cache } from 'kyCommon';
import { KYPayMethod } from 'kyComponent';
import { Button, Toast, NavBar, Loading} from 'uxComponent';


// import '../resources/CartOrderView.less';
class PayTypesView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isLoading: false,
            payType: '29',
        };
    }
    componentDidMount(){
        const { payagain } = this.props;
        const tradeNo = payagain.get('tradeNo');
        if(tradeNo.length === 0){
            setTimeout(function(){
                window.history.go(-1);
            }, 1000);
        }
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    //立即结算 下单
    submitHandle() {
        const { payagain } = this.props;
        const tradeNo = payagain.get('tradeNo');
        this.props.dispatch(getPayAgain(tradeNo, this.state.payType, (res) => {
            if(res.success){
                window.location.href = res.data;
            }else{
                Toast.info(res.errMsg);
            }
        }));
    }
    // 选择支付方式
    changePayTypeHandle(payType){
        this.setState({
            payType: payType
        });
    }
    render(){
        const _state = this.state || {};
        const { payagain } = this.props;
        const payAmount = payagain.get('payAmount');
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-white">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                    >选择支付方式</NavBar>
                    {
                        _state.isLoading ?
                            <div className="loading-container">
                                <Loading size="large"/>
                            </div>
                        : <KYPayMethod price={payAmount} defaultPayType={_state.payType} changePayType={this.changePayTypeHandle.bind(this)}/>
                    }

                </div>
                {
                    !_state.isLoading ?
                        <div className="m-foot-fixed">
                            <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle.bind(this)} across/>
                        </div>
                    : null
                }
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        payagain: state.PayAgainModel
    };
}


export default connect(
    mapStateToProps
)(PayTypesView);
