/**
 * @fileOverview 购物车首页 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ShoppingAction from '../action/actionTypes';
import { getShoppingCarCount } from 'kyBus/common/action/DataAction'
import { getShoppingCar, updateShoppingCar, deteteShoppingCar } from '../action/DataAction';
import classNames from 'classnames';

import { Button, Toast, NavBar, Stepper, List, Modal, Loading } from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;
import { Cache } from 'kyCommon';

import CartItemView from './CartItemView';

import '../resources/CartIndexView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: [],
            isAllChecked: false,
        };
        this.changeStatus = this.changeStatus.bind(this);
    }
    componentDidMount(){
        // 进来之前先删除之前选中的购物车信息
        Cache.sessionRemove(Cache.sessionKeys.ky_cart_ids);
        // this.checkAll();
        this._getAllShoppingCat();
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    //改变数量
    numItemChangeHandle(index, buyNum){
        const _item = this.state.list[index] || {};
        this.props.dispatch(updateShoppingCar(_item.shoppingCarId, _item.product.groupFlag, buyNum, () => {
            const ids = this._getIdsActive().join(',');
            this._getAllShoppingCat(ids);
        }));
        // this.state.list[index].buyNum = buyNum;
    }
    /**
     * @description 单个商品单选框的属性
     * @param {number} index 索引
     * @param {boolean} active 是否选中
     * @returns {Voild}
    */
    changeStatus(index,active) {
        this.state.list[index].active = active;
        this.setState({
            list: this.state.list,
            refresh:Math.random()
        });
        this._cartItemActive();
        this.checkAll();
    }

     /*
      * @description 删除指定的一项
      * @param {number} index 索引
      * @returns {Voild}
     */
    deleteItemHandle(index, shoppingCarId){
        Modal.alert('删除', '确定删除么?', [
            { text: '取消'},
            { text: '确定', onPress: (() => {
                this.props.dispatch(deteteShoppingCar(shoppingCarId, (res) => {
                    this._cartItemActive();
                    // 删除成功后，更新购物车数量
                    this.props.dispatch(getShoppingCarCount());
                }));
            })}
        ]);
    // this.state.list.splice(index,1);
    }

    /*
     * @description 判断是否全选
     * 如果所有产品都选择了，就设置isAllChecked为true
    */
    checkAll(){
        if(this.state.list.every(function(list){ return list.active })){
            this.setState({
                isAllChecked: true
            });
        }else {
            this.setState({
                isAllChecked: false
            });
        }
    }

    /*
      * @description 全选
      * @param {object} e 事件对象
     */
    changeAllStatus(e){
        const checked = e.target.checked;
        //修改每个产品的状态
        this.state.list.forEach(function(list){
            list.active = checked;
        });
        //修改isAllChecked里面的值
        this.setState({
            list:this.state.list,
            isAllChecked:checked
        });

        this._cartItemActive();
    }

    // 立即结算
    submitHandle() {
        const cartIds = Cache.sessionGet(Cache.sessionKeys.ky_cart_ids) || [];
        if(cartIds.length > 0){
            hashHistory.push('/cart/order');
        } else {
            Toast.info('请选择商品!');
        }
    }
    // 购物车商品选中后，将选中的id记录到sesseion,然后重新获取购物车列表
    _cartItemActive(){
        const idsList = this._getIdsActive();
        const ids = idsList.join(',');
        Cache.sessionSet(Cache.sessionKeys.ky_cart_ids, idsList);
        this._getAllShoppingCat(ids);
    }

    // 获取全部购物车列表
    _getAllShoppingCat(ids=''){
        this.props.dispatch(getShoppingCar(ids, (res) => {
            this.setState({
                list: res.items
            });
            // 是否全选
            this.checkAll();
        }));
    }

    // 获取选中商品的购物车id，并返回一个列表
    _getIdsActive(){
        const _list = this.state.list;
        let caridArr = [];
        _list.filter((item) => {
            if(item.active){
                caridArr.push(item.shoppingCarId);
            }
        });
        return caridArr;
    }
    render(){
        const _getShappingcar = this.props.shappingcar;
        const isAllCheckedCls = classNames({
            [`icon`]: true,
            [`icon-radio`]: true,
            [`icon-radioSelect`]: this.state.isAllChecked,
        });
        function markMoney(str){
            return '￥' + str;
        }
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable">
                    <div className="ky-cart">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            ><div className="navbar-cart-tit"><i className="icon icon-shoppingCart"></i>购物车</div></NavBar>
                            {
                                this.state.list.length > 0 ?
                                    <div>
                                        <div className="m-cart">
                                            {this.state.list.map((item, index) => {
                                                return(
                                                    <CartItemView key={index} index={index} ListItem={item} deleteItem={this.deleteItemHandle.bind(this, index, item.shoppingCarId)} changeStatus={this.changeStatus} numItem={this.numItemChangeHandle.bind(this)}/>
                                                )
                                            })}

                                            {/* <div className="cart-item">
                                                <div className="item-header">
                                                    <div className="header-name">
                                                        <label>
                                                            <div className="pack-radio">
                                                                <input type="checkbox" />
                                                                <i className="icon icon-radio"></i>
                                                            </div>
                                                        </label>
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
                                                        <i className="icon icon-radio icon-selectFill"></i>

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
                                            </div> */}
                                        </div>

                                        <div className="m-cart-other">
                                            <List small>
                                              <Item extra={`${_getShappingcar.get('totalNum')}`}>商品数量</Item>
                                              <Item extra={markMoney(_getShappingcar.get('salePrice'))}>会员价总计</Item>
                                              <Item extra={markMoney(_getShappingcar.get('originalPrice'))}>销售价总计</Item>
                                              <Item extra={markMoney(_getShappingcar.get('preferentialPrice'))}>总优惠</Item>
                                            </List>
                                        </div>
                                    </div>
                                :
                                    <div className="loading-container">
                                        <p className="ky-center">购物车空空是也，快去加点商品吧！</p>
                                    </div>
                            }

                    </div>
                </div>
                <div className="m-foot-fixed">
                    {/* 立即结算 */}
                    {
                        this.state.list.length > 0 ?
                            <div className="m-settlement">
                                <div className="select">
                                    <label>
                                        <div className="pack-radio">
                                            <input type="checkbox" checked={this.state.isAllChecked} onChange={this.changeAllStatus.bind(this)}/>
                                            <i className={isAllCheckedCls}></i>
                                        </div>
                                    </label>
                                    <span>全选</span>
                                </div>
                                <div className="total">
                                    <span>总计</span>
                                    <span className="price"> ￥{_getShappingcar.get('salePrice')}</span>
                                </div>
                                <div className="btn">
                                    <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle.bind(this)} across/>
                                </div>
                            </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        shappingcar: state.ShappingModel
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
