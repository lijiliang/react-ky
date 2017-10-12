/**
 * @fileOverview 支付成功页
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button, NavBar } from 'uxComponent';

import '../resources/PaySuccessView.less';

class PaySuccessView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    goOrderDetails() {
        console.log('goOrderDetails');
    }
    goHome(){
        hashHistory.push('/');
    }
    render(){
        const payInfo = this.props;
        return(
            <div className="ky-scrollable ky-paysuccess">
                <div className="m-paysuccess">
                    <NavBar iconName={false} mode="success">支付成功</NavBar>
                    <div className="success-view">
                        <div className="pay-price">您已成功支付￥{payInfo.payAmount}</div>
                        <i className="icon icon-paymentDone"></i>
                        {
                            payInfo.regOrder
                            ? <h2>欢迎加入凯娅尼</h2>
                            : <h2>我们将尽快为您配送商品！</h2>
                        }
                        <div className="user-info">
                            <div className="info-item">
                                <span>会员帐号</span>
                                <span>{payInfo.userName}</span>
                            </div>
                            <div className="info-item">
                                <span>订单号</span>
                                <span>{payInfo.tradeNo}</span>
                            </div>
                        </div>
                        {
                            payInfo.regOrder
                            ? <div className="info-remember">
                                <p>请记下您的帐号,  </p>
                                <p>以方便日后登录或购物。</p>
                            </div>
                            : null
                        }
                        <div className="goshop">
                            <Button className="ky-btn shop-btn" title="查看订单详情" onClick={this.goOrderDetails.bind(this)}></Button>
                            <Button className="ky-btn btn-gohome" title="返回首页" onClick={this.goHome.bind(this)}></Button>
                        </div>
                        {
                            payInfo.regOrder
                            ? <div className="info-more">
                                <p>我们将尽快为您配送商品!</p>
                                <p>今天开始凯娅尼助您体验更多</p>
                                </div>
                            : <div className="info-more">
                                <p>今天开始凯娅尼助您体验更多</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PaySuccessView;
