/**
 * @fileOverview 购物车->核对订单信息 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OrderPreview, OrderAdd } from '../action/DataAction';

import { Cache } from 'kyCommon';
import { KYPayMethod, KYCoupon } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List, Accordion, Loading} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;
import '../resources/CartOrderView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: 'a',
            isLoading: true,
            payType: '29',
            couponCode: '',  // 优惠券码
            discountPrice: 0 // 优惠金额
        };
    }
    componentDidMount(){
        const cartIds = Cache.sessionGet(Cache.sessionKeys.ky_cart_ids);
        if(!cartIds){
            hashHistory.push('/cart')
            return;
        }
        this.props.dispatch(OrderPreview(cartIds, (res) => {
            //订单列表与价格为空，则跳到购物车页
            if(res.orderList.length === 0 && res.actualPrice){
                hashHistory.push('/cart')
                return;
            }
            this.setState({
                ...res,
                isLoading: false
            })
        }))
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    handleChanges(event) {
        this.setState({value: event.target.value});
    }
    // 按此使用
    useConponHandl = () => {
    }

    // 地址管理
    addMangementHandle() {
        hashHistory.push('/user/address');
    }

    //立即结算 下单
    submitHandle() {
        const _state = this.state;
        const shippingInfo =  _state.shippingInfo || {}
        // 如果没收货人地址，则不能让提交
        if (shippingInfo.id == null){
            Toast.info('请先增加收货地址');
            return
        }
        const data = {
          actualPrice: _state.actualPrice,      //实付金额
          addressId: shippingInfo.id,           //地址id
          carIds: _state.shoppingCarIds,        //购物车id组
          originalPrice: _state.originalPrice,  //原价
          payType: _state.payType,              //支付类型
          preferential: _state.preferential,    //优惠价
          couponCode: _state.couponCode,        //优惠券码
        }
        this.props.dispatch(OrderAdd(data, (res) => {
            if(!res.success){
                Toast.info(res.errMsg);
                if(res.tradeNo){
                    setTimeout(function(){
                        hashHistory.push(`/pay/complete/${res.tradeNo}`);
                    }, 1500)
                }
            }else{
                // 跳到信用卡支付页
                window.location.href = res.payUrl
            }
        }))
    }
    // 选择支付方式
    changePayTypeHandle(payType){
        this.setState({
            payType: payType
        })
    }

    //优惠券
    couponBtnHandle(couponCode, discountPrice){
        this.setState({
            couponCode: couponCode,
            discountPrice: discountPrice
        })
    }
    render(){
        const _state = this.state || {};
        const shippingInfo =  _state.shippingInfo || {}
        const orderList = _state.orderList || []
        function markMoney(str){
            return '￥' + str;
        }
        // console.log(this.state)
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                    >核对订单信息</NavBar>
                    {
                        !_state.isLoading ?
                            <div className="ky-cart-order">
                                <div className="m-receiver">
                                    <div className="m-item-tit">
                                        <div className="tit-content"><h2>收货人信息</h2></div>
                                        <span className="extra" onClick={this.addMangementHandle.bind(this)}>管理</span>
                                    </div>
                                    {
                                        shippingInfo.phoneNumber ?
                                            <div className="m-receiver-content">
                                                <i className="icon icon-selectFill"></i>
                                                <div className="list">
                                                    <div className="item">
                                                        <span className="name">收货人</span>
                                                        <span className="info">{shippingInfo.consignee}</span>
                                                    </div>
                                                    <div className="item">
                                                        <span className="name">手机号</span>
                                                        <span className="info">{shippingInfo.phoneNumber}</span>
                                                    </div>
                                                    <div className="item">
                                                        <span className="name">收货地址</span>
                                                        <span className="info">{shippingInfo.addrPrivonceName}省{shippingInfo.addrCityName}{shippingInfo.addrCountyName}{shippingInfo.addrDetail}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        : <div className="no-address">
                                            <Link to="/user/addredit" className="btn-address">添加收货地址</Link>
                                          </div>
                                    }

                                </div>
                                {/* <div className="m-conpon">
                                    <div className="m-item-tit m-item-coupon">
                                        <div className="tit-content">
                                            <h2>可用优惠券</h2>
                                            <p>使用优惠券抵消部分金额</p>
                                        </div>
                                    </div>
                                    <div className="m-conpon-content">
                                        <List small>
                                            <Item className={this.state.value === 'a' ? 'coupon-active' : ''}>
                                                <div className="select">
                                                    <label>
                                                        <div className="select-radio">
                                                            <input type="radio" value="a" checked={this.state.value === 'a'} onChange={this.handleChanges.bind(this)}/>
                                                            <i className="icon icon-radio"></i>
                                                      </div>
                                                      <span className="name">不使用优惠券</span>
                                                  </label>
                                                </div>
                                            </Item>
                                            <Item
                                                className={this.state.value === 'b' ? 'coupon-active' : ''}
                                                extra={<span className="conpon-use" onClick={this.useConponHandl}>按此使用</span>}
                                            >
                                                <div className="select">
                                                    <label>
                                                        <div className="select-radio">
                                                            <input type="radio" value="b" checked={this.state.value === 'b'} onChange={this.handleChanges.bind(this)}/>
                                                            <i className="icon icon-radio"></i>
                                                      </div>
                                                      <span className="name">您的帐户有可使用的优惠券</span>
                                                  </label>
                                                </div>
                                            </Item>
                                            <Item
                                                className={this.state.value === 'c' ? 'coupon-active coupon-code' : 'coupon-code'}
                                                extra={<InputItem placeholder="点击输入优惠券券码"></InputItem>}
                                            >
                                                <div className="select">
                                                    <label>
                                                        <div className="select-radio">
                                                            <input type="radio" value="c" checked={this.state.value === 'c'} onChange={this.handleChanges.bind(this)}/>
                                                            <i className="icon icon-radio"></i>
                                                      </div>
                                                      <span className="name">有优惠券券码？</span>
                                                  </label>
                                                </div>
                                            </Item>

                                            <Item extra={'-￥0.00'} className="coupon-bottom text-primary">优惠</Item>
                                        </List>
                                    </div>
                                </div> */}
                                <div className="m-delivery">
                                    <div className="m-item-tit">
                                        <div className="tit-content"><h2>送货清单</h2></div>
                                    </div>
                                    <div className="m-delivery-content">
                                        <List small>
                                            <Item extra={'快递'}>配送方式</Item>
                                            <Item extra={'在线支付'}>支付方式</Item>
                                            <Item extra={_state.productCount}>商品数量</Item>
                                            <Item extra={_state.orderCount} className="text-primary">子订单数量</Item>
                                        </List>
                                        <Accordion className="m-suborder">
                                            {
                                                orderList.map((item, index) => {
                                                    return(
                                                        <Accordion.Panel className="pad" header={
                                                            <div className="header-content">
                                                                <span className="name">子订单{index + 1}</span>
                                                                <div className="bao">
                                                                    <span className="icon icon-bao"></span>
                                                                    <span className="bao-shop">保税区商品</span>
                                                                </div>
                                                            </div>
                                                        }>
                                                        <div className="m-suborder-box">
                                                            {
                                                                item.items.map((items) => {
                                                                    return(
                                                                        <div className="item-content">
                                                                            <div className="thumb">
                                                                                <img src={items.imgPath}/>
                                                                            </div>
                                                                            <div className="info">
                                                                                <div className="info-item">
                                                                                    <div className="name name-tit">{items.name}</div>
                                                                                    <div className="number">数量</div>
                                                                                </div>
                                                                                <div className="info-item">
                                                                                    <div className="name">
                                                                                        <p>{items.name}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="info-item info-price">
                                                                                    <div className="name">
                                                                                        <p>原价&nbsp;&nbsp;&nbsp;<span className="name-price">¥{items.originalPrice}</span></p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="info-item info-price">
                                                                                    <div className="name">
                                                                                        <p>会员价<span className="name-price">¥{items.salePrice}</span></p>
                                                                                    </div>
                                                                                    <div className="number">x {items.buyNum}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <div className="subtotal">
                                                                <span>合计</span><span className="price">¥{item.actualPrice}</span>
                                                            </div>
                                                        </div>
                                                        </Accordion.Panel>
                                                    )
                                                })
                                            }
                                        </Accordion>
                                        <List small>
                                            <Item extra={markMoney(_state.actualPrice)}>会员价总额</Item>
                                            <Item extra={markMoney(_state.originalPrice)}>销售价总额</Item>
                                            <Item extra={markMoney(_state.importTariff)}>进口关税</Item>
                                            <Item extra={markMoney(_state.preferential)}>总优惠</Item>
                                            <Item extra={markMoney(_state.expressPrice)}>运费</Item>
                                            <Item extra={_state.totalQV}>总积分</Item>
                                        </List>
                                    </div>
                                </div>
                               <KYCoupon products={_state.shoppingCarIds.join(',')} clickCouponBtn={this.couponBtnHandle.bind(this)}/>
                               <KYPayMethod price={_state.actualPrice - _state.discountPrice} defaultPayType={_state.payType} changePayType={this.changePayTypeHandle.bind(this)}/>
                            </div>
                        : null
                    }
                    {
                        _state.isLoading ?
                            <div className="loading-container">
                                <Loading size="large"/>
                            </div>
                        : null
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
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
