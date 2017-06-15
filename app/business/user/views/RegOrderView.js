/**
 * @fileOverview 确认订单及填写收货地址
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {regConsumer} from '../action/DataAction';

import { createForm } from 'rc-form';
import classNames from 'classnames';

import { Button, Toast, NavBar, InputItem, TextareaItem} from 'uxComponent';
import { KYSteps } from 'kyComponent';
import PackItemView from './PackItemView';

import '../resources/RegOrderView.less';

class RegOrderView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            firstName: 'firstName'
        };
    }
    // 设置state
    stateChangeHandle(name, value){
       this.setState({
           [name]: value
       })
     }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }
    render(){
        console.log(this.state)
        const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
        return(
            <div className="ky-scrollable">
                <div className="m-regorder">
                   <NavBar
                       onLeftClick={this.gohistoryHandle.bind(this)}
                   >注册我的会员帐户</NavBar>
                   <div className="m-regstep">
                       <KYSteps current={3}/>
                       <div className="regcon-info">
                           <h2>填写订单及填写收货地址</h2>
                           <div className="chosen">您已选择了：</div>
                       </div>
                   </div>
                   <div className="m-pack">
                       <PackItemView active listData={{a:123}}/>
                   </div>
                   <div className="m-userinfo">
                       <div className="userinfo-tit">
                           <h2>帐户信息</h2>
                           <span>修改</span>
                       </div>
                       <div className="userinfo-form">
                           {getFieldDecorator('firstName', {
                               initialValue: this.state.firstName,
                               rules: [{
                                   required: true,
                                   message: '请输入您的姓氏'
                               }],
                             })(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入您的姓氏"
                                   onChange={this.stateChangeHandle.bind(this, 'firstName')}
                               >姓氏</InputItem>
                            )}
                            {getFieldDecorator('firstName', {
                                initialValue: this.state.firstName,
                                rules: [{
                                    required: true,
                                    message: '请输入您的姓氏'
                                }],
                              })(
                                <InputItem
                                    labelNumber={5}
                                    placeholder="请输入您的姓氏"
                                    onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                >推荐人编号</InputItem>
                             )}
                       </div>
                   </div>
                   <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                </div>
            </div>
        );
    }
}
const RegOrderViewWrapper = createForm()(RegOrderView);
export default RegOrderViewWrapper;
