/**
 * @fileOverview 支付失败页
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import { payAgainBtn, getPayAgain } from '../action/DataAction';

import { Button, Toast, NavBar } from 'uxComponent';

import '../resources/PayFailedView.less';

class PayFailedView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    // 重新支付
    payAgainHandle(tradeNo, payAmount, regOrder){
        this.props.dispatch(payAgainBtn(tradeNo, payAmount, regOrder, (res) => {
            // hashHistory.push('/pay/types');  // 跳到选择支付方式页面 

            // 重新发起支付
            this.props.dispatch(getPayAgain(tradeNo, (res) => {
                if(res.success){
                    window.location.href = res.data;
                }else{
                    Toast.info(res.errMsg);
                }
            }));
            
        }));
    }
    render(){
        const payInfo = this.props;
        return(
            <div className="ky-scrollable-white">
                <div className="m-payfailed">
                    <NavBar iconName={false} mode="error">支付失败</NavBar>
                    {
                        payInfo.regOrder
                        ? <div className="failed-info"><p>尚未加入成为凯娅尼会员, </p><p>请再次尝试。</p></div>
                        : <div className="failed-info">
                            <p>请再次尝试。</p>
                        </div>
                    }
                    <div className="m-btn">
                        <Button className="ky-btn btn-pay" title="重新支付" onClick={this.payAgainHandle.bind(this, payInfo.tradeNo, payInfo.payAmount, payInfo.regOrder)}></Button>
                    </div>
                    <p className="info-item">若重复出现此信息，请联系线上客服。</p>
                    <div className="m-btn">
                        <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA1MDUyMV80ODI1NDhfNDAwMDk0MTE3MV8">
                            <Button className="ky-btn btn-contact" title="联系线上客服"></Button>
                        </a>
                    </div>
                    <p className="info-item">或联络凯娅尼中国客户服务热线 400 094 1171</p>
                    <p className="info-item">或电邮至 cs.cn@kyanicorp.com</p>
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

export default connect(
    mapStateToProps
)(PayFailedView);
