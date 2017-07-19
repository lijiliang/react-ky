/**
 * @fileOverview 忘记密码 View
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
import { get, getPublic } from 'kyBase/common/FetchData';
import { Urls, RegxRule} from 'kyCommon';

//组件
import { Button, Toast, NavBar, InputItem} from 'uxComponent';

import '../resources/ForgetpwdView.less';

class ForgetpwdView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    componentDidMount(){}
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }
    // 设置state
    stateChangeHandle(name, value){
       this.setState({
           [name]: value
       })
    }
    render() {
        console.log(this.state)
        const { getFieldDecorator} = this.props.form;
        // 密码
        const isShowPwdCls = classNames({
            icon: true,
            'icon-eye': true,
            'extra-pwd': true,
            'extra-pwd-active': this.state.isShowPwd
        });
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-white">
                    <div className="m-forget">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            mode="blue"
                            >重置密码</NavBar>
                        <div className="forget-view">
                            {getFieldDecorator('firstName', {
                                initialValue: this.state.firstName,
                                rules: [{
                                    required: true,
                                    message: '请输入您的姓氏'
                                }],
                              })(
                                <InputItem
                                    placeholder="CN********"
                                    onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                >中国会员帐号</InputItem>
                             )}
                             {getFieldDecorator('phoneNumber', {
                                 initialValue: this.state.phoneNumber,
                                 rules: [{
                                     pattern: RegxRule.phone,
                                     message: '请输入正确的手机号'
                                 },{
                                     required: true,
                                     message: '请输入您的手机号'
                                 }],
                               })(
                                 <InputItem
                                     type="number"
                                     placeholder="请输入您的手机号"
                                     onChange={this.stateChangeHandle.bind(this, 'phoneNumber')}
                                     maxLength={11}
                                 >手机号</InputItem>
                             )}
                             {getFieldDecorator('firstName', {
                                 initialValue: this.state.firstName,
                                 rules: [{
                                     required: true,
                                     message: '请输入您的姓氏'
                                 }],
                               })(
                                 <InputItem
                                     placeholder="验证码"
                                     onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                     extra={<span className="getCode">获取短信验证码</span>}
                                 >短信验证码</InputItem>
                              )}
                              {getFieldDecorator('password', {
                                  initialValue: this.state.password,
                                  rules: [{
                                      pattern: RegxRule.password,
                                      message: '密码必须是数字和英文字母组合,必须有一个大写字母'
                                  },{
                                      required: true,
                                      message: '您的密码最少为8个字符'
                                  }],
                                })(
                                  <InputItem
                                      type="password"
                                      placeholder="密码最少为8个字符"
                                      showPwd='true'
                                      extra={<i className={isShowPwdCls} />}
                                      onExtraClick={e=>{}}
                                      onChange={this.stateChangeHandle.bind(this, 'password')}
                                  >新密码</InputItem>
                              )}
                              {getFieldDecorator('confirmPwd', {
                                  initialValue: this.state.confirmPwd,
                                  rules: [{
                                      required: true,
                                      message: '请再次输入您的密码'
                                  }],
                                })(
                                  <InputItem
                                      type="password"
                                      placeholder="请再次输入您的密码"
                                      extra={<i className={isShowPwdCls} />}
                                      showPwd='true'
                                      onExtraClick={e=>{}}
                                      name='confirmPwd'
                                      onChange={this.stateChangeHandle.bind(this, 'confirmPwd')}
                                  >确认新密码</InputItem>
                              )}
                              <div className="pwdinfo">
                                  <p>密码必须包括至少8个字符，</p>
                                  <p>当中最少1个数字及1个大写英文字母</p>
                              </div>
                              <div className="forget-help-info">
                                  <p>如需进一步协助，请于办公时间内联络</p>
                                  <p>凯娅尼中国客户服务热线 400 094 1171</p>
                                  <p>或电邮至 cs.cn@kyanicorp.com</p>
                              </div>
                        </div>
                    </div>
                </div>
                <div className="m-foot-fixed">
                    <Button title="完成" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                </div>
            </div>
        );
    }
}

const ForgetpwdViewWrapper = createForm()(ForgetpwdView);

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        RegModel: state.RegModel
    };
}

export default connect(
    mapStateToProps
)(ForgetpwdViewWrapper);
