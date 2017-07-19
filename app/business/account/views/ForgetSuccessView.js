/**
 * @fileOverview 重置密码成功 View
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
import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';

//组件
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/ForgetSuccessView.less';

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
        const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
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
                    <div className="m-forget-success">
                        <NavBar
                            iconName={false}
                            mode="blue"
                            >重置密码成功</NavBar>
                        <div className="forget-success-view">
                            <i className="icon icon-selectFill"></i>
                            <h2>恭喜您，重置密码成功！</h2>
                            <p>请妥善保管好您的密码，请勿告诉他人。</p>
                            <Button title="返回登录页面" type="primaryWhite"/>
                        </div>
                    </div>
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
