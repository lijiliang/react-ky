/**
 * @fileOverview 购物车->核对订单信息 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';

import { Cache } from 'kyCommon';
import { KYPayMethod } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List, Accordion} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/CartOrderView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    componentDidMount(){
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    render(){
        return(
            <div className="ky-scrollable">
                <div className="ky-cart-order">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                    >核对订单信息</NavBar>
                    <div className="m-receiver">
                        <div className="m-item-tit">
                            <div className="tit-content"><h2>收货人信息</h2></div>
                            <span className="extra">管理</span>
                        </div>
                        <div className="m-receiver-content">
                            <i className="receiver-icon bg-radioSelect"></i>
                            <div className="list">
                                <div className="item">
                                    <span className="name">收货人</span>
                                    <span className="info">架夺</span>
                                </div>
                                <div className="item">
                                    <span className="name">手机号</span>
                                    <span className="info">13503030033</span>
                                </div>
                                <div className="item">
                                    <span className="name">收货地址</span>
                                    <span className="info">江苏省泰州市江阴区 曲伟胜祥6955号</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="m-conpon">
                        <div className="m-item-tit m-item-coupon">
                            <div className="tit-content">
                                <h2>可用优惠券</h2>
                                <p>使用优惠券抵消部分金额</p>
                            </div>
                        </div>
                        <div className="m-conpon-content">
                            <List small>
                                <Item>您的帐户中没有可使用的优惠券</Item>
                                <InputItem
                                    placeholder="[点击输入优惠券码]"
                                >有优惠券码？</InputItem>
                                <Item extra={'-￥0.00'} className="text-primary">优惠</Item>
                            </List>
                        </div>
                    </div>
                    <div className="m-delivery">
                        <div className="m-item-tit">
                            <div className="tit-content"><h2>送货清单</h2></div>
                        </div>
                        <div className="m-delivery-content">
                            <List small>
                                <Item extra={'快递'}>配送方式</Item>
                                <Item extra={'在线支付'}>支付方式</Item>
                                <Item extra={'10'}>商品数量</Item>
                                <Item extra={'3'} className="text-primary">子订单数量</Item>
                            </List>
                            <Accordion className="m-suborder">
                                <Accordion.Panel className="pad" header={
                                    <div className="header-content">
                                        <span className="name">子订单1</span>
                                        <div className="bao">
                                            <span className="icon icon-bao"></span>
                                            <span className="bao-shop">保税区商品</span>
                                        </div>
                                    </div>
                                }>
                                    <div>sadf</div>
                                </Accordion.Panel>
                                <Accordion.Panel header={
                                    <div className="header-content">
                                        <span className="name">子订单234567809876</span>
                                        <div className="bao">
                                            <span className="icon icon-bao"></span>
                                            <span className="bao-shop">保税区商品</span>
                                        </div>
                                    </div>
                                }>
                                    <div>sadf</div>
                                </Accordion.Panel>
                                <Accordion.Panel header={
                                    <div className="header-content">
                                        <span className="name">子订单1</span>
                                        <div className="bao">
                                            <span className="icon icon-bao"></span>
                                            <span className="bao-shop">保税区商品</span>
                                        </div>
                                    </div>
                                }>
                                    Text text text text text text text text text text text text text text text
                                </Accordion.Panel>
                            </Accordion>
                            <List small>
                                <Item extra={'￥21,400.00'}>会员价总额</Item>
                                <Item extra={'￥21,400.00'}>销售价总额</Item>
                                <Item extra={'￥0.00'}>进口关税</Item>
                                <Item extra={'-￥21,400.00'}>总优惠</Item>
                                <Item extra={'￥0.00'}>运费</Item>
                                <Item extra={'525'}>总积分</Item>
                            </List>
                        </div>
                    </div>
                   <KYPayMethod price="10,888.00"/>
                   <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>

                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
