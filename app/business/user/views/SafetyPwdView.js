/**
 * @fileOverview 帐户安全 - 修改密码
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import { PutUserChangePwd, signout } from '../action/DataAction';
import { getShoppingCarCount } from 'kyBus/common/action/DataAction'

import { createForm } from 'rc-form';
import classNames from 'classnames';
import { get, getPublic } from 'kyBase/common/FetchData';
import { Urls, RegxRule} from 'kyCommon';

 //组件
import { Button, Toast, NavBar, InputItem} from 'uxComponent';

import '../resources/SafetyPwdView.less';


class SafetyPwdView extends React.Component {
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

    // 完成
    submitHandle = () => {
        const form = this.props.form;
        form.validateFields((error, value) => {
            const _password = form.getFieldValue('password');
            const _newPassword = form.getFieldValue('newPassword');
            const _confirmPwd = form.getFieldValue('confirmPwd');
            if (error) {
                const fieldNames = ['password', 'newPassword', 'confirmPwd'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 1);
                        return;
                    }
                });
                return;
            }

            if(_password == _newPassword){
                Toast.info('原密码与新密码不能一样', 1);
                return;
            }

            if (_confirmPwd && (_newPassword !== _confirmPwd)) {
                Toast.info('两次输入的密码不一致', 1);
                return;
            }

            this.props.dispatch(PutUserChangePwd(_password, _newPassword, (res) => {
                if(res.success){
                    Toast.success('密码修改成功！');
                    setTimeout(() => {
                        this.props.dispatch(signout(() => {
                            // 退出成功后，更新购物车数量
                            this.props.dispatch(getShoppingCarCount());
                            hashHistory.push('/login');
                        }));
                    }, 1500)
                }
            }))
        })

    }
    render(){
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
                    <div className="m-safetypwd">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            mode="blue"
                            >修改密码</NavBar>
                        <div className="safetypwd-view">
                            {getFieldDecorator('password', {
                                initialValue: this.state.password,
                                rules: [{
                                    pattern: RegxRule.password,
                                    message: '密码必须是数字和英文字母组合,必须有一个大写字母'
                                },{
                                    required: true,
                                    message: '请输入您的原密码'
                                }],
                              })(
                                <InputItem
                                    type="password"
                                    placeholder="密码最少为8个字符"
                                    showPwd='true'
                                    extra={<i className={isShowPwdCls} />}
                                    onExtraClick={e=>{}}
                                    onChange={this.stateChangeHandle.bind(this, 'password')}
                                >原密码</InputItem>
                            )}
                              {getFieldDecorator('newPassword', {
                                  initialValue: this.state.newPassword,
                                  rules: [{
                                      pattern: RegxRule.password,
                                      message: '密码必须是数字和英文字母组合,必须有一个大写字母'
                                  },{
                                      required: true,
                                      message: '请输入您的新密码'
                                  }],
                                })(
                                  <InputItem
                                      type="password"
                                      placeholder="密码最少为8个字符"
                                      showPwd='true'
                                      extra={<i className={isShowPwdCls} />}
                                      onExtraClick={e=>{}}
                                      onChange={this.stateChangeHandle.bind(this, 'newPassword')}
                                  >新密码</InputItem>
                              )}
                              {getFieldDecorator('confirmPwd', {
                                  initialValue: this.state.confirmPwd,
                                  rules: [{
                                      required: true,
                                      message: '请再次输入您的新密码'
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
                        </div>
                    </div>
                </div>
                <div className="m-foot-fixed">
                    <Button title="完成" type="submit" onClick={this.submitHandle} across/>
                </div>
            </div>
        );
    }
}

const SafetyPwdViewWrapper = createForm()(SafetyPwdView);

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

export default connect(
    mapStateToProps
)(SafetyPwdViewWrapper);
