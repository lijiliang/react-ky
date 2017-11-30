/**
 * @fileOverview 忘记密码 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import { postUserCaptcha, putUserRestPwd } from '../action/DataAction';

import { createForm } from 'rc-form';
import classNames from 'classnames';
import { get, getPublic } from 'kyBase/common/FetchData';
import { Urls, RegxRule} from 'kyCommon';

//组件
import { Button, Toast, NavBar, InputItem, Loading} from 'uxComponent';

import '../resources/ForgetpwdView.less';

class ForgetpwdView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            phoneCodeTip: '获取短信验证码',
            codeFlag: true,   // 获取短信验证码按钮是否可点击
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
    submitHandle() {
        const form = this.props.form;
        const _password = form.getFieldValue('password');
        const _confirmPwd = form.getFieldValue('confirmPwd');
        form.validateFields((error, value) => {
            if(error){
                const fieldNames = ['username', 'phoneNumber', 'phoneCode', 'password', 'confirmPwd'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 1);
                        return;
                    }
                });
                return;
            }

            // 处理输入两次密码不一致
            if(_confirmPwd && (_password !== _confirmPwd)){
                Toast.info('两次输入的密码不一致', 1);
                return;
            }

            if(!error){
                const _state = this.state
                const _data = {
                    userName: _state.username,
                    captcha: _state.phoneCode,
                    newPassword: _state.password
                }
                this.props.dispatch(putUserRestPwd(_data, (res) => {
                    if(res.success){
                        Toast.info('重置密码成功！', 1)
                        setTimeout(() => {
                            hashHistory.push('/login')
                        }, 1000)
                    }else{
                        Toast.info(res.message)
                    }
                }))
            }
        })
    }
    // 获取短信验证码
    getPhoneCodeHandle = () => {
        const _this = this;
        const _username = this.state.username || '';
        const _phoneNumber = this.state.phoneNumber || '';
        if(this.state.codeFlag){
            if(_username.length <= 0){
                Toast.info('请输入中国会员帐号', 1)
                return;
            }
            if(!RegxRule.phone.test(_phoneNumber)){
                Toast.info('请输入正确的手机号', 1)
                return;
            }

            const _data = {
                userName: this.state.username,
                mobile: this.state.phoneNumber
            }
            this.props.dispatch(postUserCaptcha(_data, (res) => {
                if(res.success){
                    // 请求发送短信验证码
                    const tipInfo = '短信验证码已发送到' + _phoneNumber
                    Toast.info(tipInfo, 1)

                    // 倒计时
                    this.changeSendStatus('phoneCodeTip', 60)
                }else{
                    Toast.info(res.message)
                }
            }))

        }
    }
    /**
     * 倒计时
     * @param elem 元素
     * @param closeCount  Number 设置时间，可选
     */
    changeSendStatus(elem, closeCount) {
        let count = 60;
        let _self = this;
        let wait
        if(closeCount){
            count = closeCount
        }
        wait = function () {
            _self.timer = setTimeout(() => {
                count--;
                if(count > 0) {
                    _self.setState({
                        [elem]: count + '秒后重新发送',
                        codeFlag: false
                    })
                    wait()
                } else {
                    if(_self.timer){
                        clearTimeout(_self.timer);
                    }
                    _self.setState({
                        [elem]: '获取短信验证码',
                        codeFlag: true
                    })
                }
            }, 1000)
        }
        wait()
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        // 密码
        const isShowPwdCls = classNames({
            icon: true,
            'icon-eye': true,
            'extra-pwd': true,
            'extra-pwd-active': this.state.isShowPwd
        });
        const codeCls = classNames({
            'getCode': true,
            'getCodeDisabled': !this.state.codeFlag
        })
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-white">
                    <div className="m-forget">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            mode="blue"
                            >重置密码</NavBar>
                        <div className="forget-view">
                            {getFieldDecorator('username', {
                                initialValue: this.state.username,
                                rules: [{
                                    required: true,
                                    message: '请输入中国会员帐号'
                                }],
                              })(
                                <InputItem
                                    placeholder="请输入中国会员帐号"
                                    onChange={this.stateChangeHandle.bind(this, 'username')}
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
                             {getFieldDecorator('phoneCode', {
                                 initialValue: this.state.phoneCode,
                                 rules: [{
                                     required: true,
                                     message: '请输入短信验证码'
                                 }],
                               })(
                                 <InputItem
                                     placeholder="验证码"
                                     onChange={this.stateChangeHandle.bind(this, 'phoneCode')}
                                     extra={<span className={codeCls} onClick={this.getPhoneCodeHandle}>{this.state.phoneCodeTip}</span>}
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
                    <Button title="完成" className="ky-button-primary regcon-btn" onClick={this.submitHandle.bind(this)} across/>
                </div>
            </div>
        );
    }
}

const ForgetpwdViewWrapper = createForm()(ForgetpwdView);

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

export default connect(
    mapStateToProps
)(ForgetpwdViewWrapper);
