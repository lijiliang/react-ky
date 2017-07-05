/**
 * @fileOverview 购物车首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';

import { Button, Toast, NavBar, Stepper, List } from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;
import { Cache } from 'kyCommon';

import '../resources/CartIndexView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showNumber: 2,
        };
    }
    componentDidMount(){
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    onChange = (val) => {
        // console.log(val);
        this.setState({ showNumber: val });
    }
    onClickHandle = (e) => {
        alert('a')
        console.log(e)
    }
    render(){
        console.log(this.state)
        return(
            <div className="ky-scrollable">
                <div className="ky-cart">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                        ><div className="navbar-cart-tit"><i className="icon icon-shoppingCart"></i>购物车</div></NavBar>

                        <div className="m-cart">
                            <div className="cart-item">
                                <div className="item-header">
                                    <div className="header-name">
                                        <span className="icon-bg"></span>
                                        <span className="name">新乐思</span>
                                    </div>
                                    <div className="header-price">
                                        <span>合计 <i className="price">￥4,200.00</i></span>
                                        <i className="icon icon-cancel"></i>
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="thumb">
                                        <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                    </div>
                                    <div className="info">
                                        <div className="info-item">
                                            <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                            <div className="number">数量</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="name">
                                                <p>蓝莓复合果汁饮品(便利装) </p>
                                                <p>900毫升 (30袋)</p>
                                            </div>
                                            <div className="number">12件/套</div>
                                        </div>
                                        <div className="info-subtotal">
                                            <span>会员价</span>
                                            <span className="price">￥420.00</span>
                                        </div>
                                        <div className="info-foot">
                                            <Stepper
                                                showNumber
                                                min={1}
                                                max={500}
                                                value={this.state.showNumber}
                                                onChange={this.onChange}
                                                onOkClick={this.onClickHandle}
                                            />
                                            <span className="isstock">有货</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-item cart-item-guoups">
                                <div className="item-header">
                                    <div className="header-name">
                                        <span className="icon-bg"></span>
                                        <span className="name">家庭健康组合</span>
                                    </div>
                                    <div className="header-price">
                                        <span>合计 <i className="price">￥4,200.00</i></span>
                                        <i className="icon icon-cancel"></i>
                                    </div>
                                </div>
                                <div className="guoups-item">
                                    <div className="item-content">
                                        <div className="thumb">
                                            <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                        </div>
                                        <div className="info">
                                            <div className="info-item">
                                                <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                                <div className="number">数量</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="name">
                                                    <p>蓝莓复合果汁饮品(便利装) </p>
                                                    <p>900毫升 (30袋)</p>
                                                </div>
                                                <div className="number">12件/套</div>
                                            </div>
                                            <div className="info-item info-item-member">
                                                <div className="name">
                                                    <span>会员价</span><span className="price">￥420.00</span>
                                                </div>
                                                <div className="number">x 1</div>
                                            </div>
                                            <div className="info-subtotal">
                                                <span>小计&nbsp;&nbsp;</span>
                                                <span className="price">￥420.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <div className="thumb">
                                            <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                        </div>
                                        <div className="info">
                                            <div className="info-item">
                                                <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                                <div className="number">数量</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="name">
                                                    <p>蓝莓复合果汁饮品(便利装) </p>
                                                    <p>900毫升 (30袋)</p>
                                                </div>
                                                <div className="number">12件/套</div>
                                            </div>
                                            <div className="info-item info-item-member">
                                                <div className="name">
                                                    <span>会员价</span><span className="price">￥420.00</span>
                                                </div>
                                                <div className="number">x 1</div>
                                            </div>
                                            <div className="info-subtotal">
                                                <span>小计&nbsp;&nbsp;</span>
                                                <span className="price">￥420.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-foot">
                                        <Stepper
                                            showNumber
                                            min={1}
                                            max={500}
                                            value={this.state.showNumber}
                                            onChange={this.onChange}
                                            onOkClick={this.onClickHandle}
                                        />
                                        <span className="isstock">有货</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="m-cart-other">
                            <List small>
                              <Item extra={'14'}>商品数量</Item>
                              <Item extra={'￥21,400.00'}>会员价总计</Item>
                              <Item extra={'￥21,400.00'}>销售价总计</Item>
                              <Item extra={'-￥21,400.00'}>总优惠</Item>
                            </List>
                        </div>

                        {/* 立即结算 */}
                        <div className="m-settlement">
                            <div className="select">
                                <i className="icon icon-radioSelect"></i>
                                <span>全选</span>
                            </div>
                            <div className="total">
                                <span>总计</span>
                                <span className="price"> ￥18,328.00</span>
                            </div>
                            <div className="btn">
                                <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                            </div>
                        </div>
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
