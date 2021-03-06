/**
 * @fileOverview 会员中心首页
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signout, getCurrentUserInfo } from '../action/DataAction';
import { getShoppingCarCount, getNav } from 'kyBus/common/action/DataAction'
import { checkMember } from 'Utils';
import { Cache } from 'kyCommon';

import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/UserIndexView.less';

import Avatar from '../resources/img/avatar.png'

class UserIndexView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            userName: '',
            memberFlag: true,
            realName: '',
            userImgPath: Avatar
        };
    }
    componentDidMount(){
        const isToken = Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token) || '';
        if(isToken){
            this.props.dispatch(getCurrentUserInfo((res) => {
                this.setState({
                    userName: res.userName,
                    memberFlag: res.memberFlag,
                    realName: res.realName,
                    userImgPath: res.userImgPath
                });
            }));
        }
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.back();
    }
    // 退出登录
    signoutHandle(){
        this.props.dispatch(signout((res) => {
            if(res.success){
                Toast.success('退出成功', 1);
            }
            // 退出成功后，更新购物车数量
            this.props.dispatch(getShoppingCarCount());

            // 退出成功后，重新获取下导航栏数据
            this.props.dispatch(getNav());
            setTimeout(() => {
                hashHistory.push('/');
            }, 1000);
        }));
    }
    render(){
        const _userImg = this.state.userImgPath ?  this.state.userImgPath + '!/fw/500' : Avatar
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable">
                    <div className="m-user-index">
                        <NavBar
                            className="navbar-user"
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            rightContent={
                                <div className="signout" onClick={this.signoutHandle.bind(this)}>
                                    <span>登出</span>
                                </div>
                            }
                            >帐户中心</NavBar>
                        <div className="m-account-view">
                            <div className="account-info">
                                <div className="account-thumb" onClick={() => { hashHistory.push('user/basicinfo')}}>
                                    <img src={_userImg}/>
                                </div>
                                <div className="account-name">
                                    <p>{this.state.realName}，欢迎您！</p>
                                </div>
                            </div>
                            <List className="m-account-type">
                                <Item extra={this.state.memberFlag ? '会员' : '消费者'}>帐户类型</Item>
                                <Item extra={this.state.userName}>帐户号码</Item>
                            </List>
                            <List className="m-order-all">
                                <Item arrow="horizontal" onClick={() => { hashHistory.push('user/order') }}>全部订单</Item>
                                <div className="order-view">
                                    <div className="order-item" onClick={() => { hashHistory.push('user/order/1')}}>
                                        <i className="icon icon-shipped"></i>
                                        <span>待处理</span>
                                    </div>
                                    <div className="order-item" onClick={() => { hashHistory.push('user/order/2')}}>
                                        <i className="icon icon-pending"></i>
                                        <span>已发货</span>
                                    </div>
                                    <div className="order-item" onClick={() => { hashHistory.push('user/order/3')}}>
                                        <i className="icon icon-cancelled"></i>
                                        <span>已取消</span>
                                    </div>
                                    <div className="order-item" onClick={() => { hashHistory.push('user/order/4')}}>
                                        <i className="icon icon-chargeback"></i>
                                        <span>已退单</span>
                                    </div>
                                </div>
                            </List>
                            <List className="m-other-view">
                                <Item arrow="horizontal" onClick={() => { hashHistory.push('user/basicinfo')}}>基本信息</Item>
                                <Item arrow="horizontal" onClick={() => { hashHistory.push('user/safety')}}>帐户安全</Item>
                                {/* <Item extra={<div className="coupon-r">2</div>} arrow="horizontal" onClick={() => { hashHistory.push('user/coupon')}}>我的优惠券</Item> */}
                                <Item arrow="horizontal" onClick={() => { hashHistory.push('user/address')}}>收货地址</Item>
                            </List>
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
    };
}

export default connect(
    mapStateToProps
)(UserIndexView);
