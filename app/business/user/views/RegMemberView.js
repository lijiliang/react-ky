/**
 * @fileOverview 注册会员帐号 View
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
import { Urls, RegxRule } from 'kyCommon';

//组件
import { KYSteps } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/RegMemberView.less';

import datas from 'kyBase/components/ux/data'
const district = datas;
 class RegConsumerView extends React.Component{
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             firstName: '',    //姓
             lastName: '',     //名
             email: '',        //邮箱
             confirmEmail: '', //确认邮箱
             password: '',     //密码
             confirmPwd: '',   //确认密码
             phone: '',        //手机号
             telephone: '',    //固定电话
             idCard: '',       //身份证号码
             cityValue: [],    //省市区数据
             address: '',      //详细地址
             zipCode: '',      //邮政编码
             referenceId: '',  //推荐人编号
             confirmReferenceId: '',   //确认推荐人
             isClickReference: true,  // 点击此处是否可点击
             buttonDisabled: true,    // 注册按钮是否可点
             cityExtra: false,        // 是否已选择过省市区
         };
     }

     componentDidMount(){
     }

     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }

     // 设置state
     stateChangeHandle(name, value){
        this.setState({
            [name]: value
        })

        // 设置注册按钮是否为disabled
        /*
        const state = this.state;
        if(state.firstName && state.lastName && state.email && state.confirmEmail && state.password && state.confirmPwd){
            this.setState({
                buttonDisabled: true
            })
        }else{
            this.setState({
                buttonDisabled: false
            })
        }
        */
     }
     // 省市区选择
     pickerChangeHandle(v){
        this.setState({
            cityValue: v,
            cityExtra: true
        })
     }
     // 提交
     submitHandle = () => {
         const form = this.props.form;
         form.validateFields((error, value) => {
            const _firstName = form.getFieldValue('firstName');
            const _email = form.getFieldValue('email');
            const _confirmEmail = form.getFieldValue('confirmEmail');
            const _password = form.getFieldValue('password');
            const _confirmPwd = form.getFieldValue('confirmPwd');

            if(error){
                const fieldNames = ['firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPwd', 'referenceId'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 1)
                        return;
                    }
                })
                return;
            }

            // if(_firstName && RegxRule.trim.test(_firstName)){
            //     Toast.info('姓氏不能包含空格', 1);
            //     return;
            // }

            // 处理输入两次邮箱不一致
            if(_confirmEmail && (_email !== _confirmEmail)){
                Toast.info('两次输入的邮箱不一致', 1);
                return;
            }

            // 处理输入两次密码不一致
            if(_confirmPwd && (_password !== _confirmPwd)){
                Toast.info('两次输入的密码不一致', 1);
                return;
            }

            if(!error){
                this.setState(value)
            }

            const _state = this.state;
            // 如果填写了会员号ID,需先判断是否存在
            if(_state.referenceId){
                const response = getPublic(Urls.UserExist + '/' + _state.referenceId);
                response.then((res) => {
                    console.log(res)
                }).catch((err) => {

                })
                // return;
            }
            // 将数据dispatch过去
            // this.props.dispatch(regConsumer(_state.firstName, _state.lastName, _state.email, _state.password, _state.referenceId))
         })
     }

     render(){
         console.log(this.state)
         const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;

         // 密码
         const isShowPwdCls = classNames({
             icon: true,
             'icon-eye': true,
             'extra-pwd': true,
             'extra-pwd-active': this.state.isShowPwd
         })
         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.cityExtra
         })
         return(
             <div className="ky-scrollable">
                 <div className="m-regMember">
                     <NavBar
                         onLeftClick={this.gohistoryHandle.bind(this)}
                         >注册我的会员帐户</NavBar>
                    <div className="m-regstep">
                        <KYSteps current={1}/>
                        <div className="regcon-info">
                            <h2>填写个人信息</h2>
                            <p>为建立您的帐户我们需要获取您的基本信息</p>
                            <p>请按照以下指示填写相关信息</p>
                        </div>
                    </div>

                    <div className="m-reg-body">
                        <div className="reg-view">
                            <div className="reg-tit">
                                <h2>帐户信息</h2>
                                <p>请填写您的个人信息</p>
                            </div>
                            <div className="ref-form">
                                {getFieldDecorator('firstName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入您的姓氏'
                                    }],
                                  })(
                                    <InputItem
                                        placeholder="请输入您的姓氏"
                                        onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                    >姓氏</InputItem>
                                 )}
                                 {getFieldDecorator('lastName', {
                                     rules: [{
                                         required: true,
                                         message: '请输入您的名字'
                                     }],
                                   })(
                                     <InputItem
                                         placeholder="请输入您的名字"
                                         onChange={this.stateChangeHandle.bind(this, 'lastName')}
                                     >名字</InputItem>
                                 )}
                                 {getFieldDecorator('email', {
                                     rules: [{
                                       type: 'email', message: '请输入正确的邮箱地址',
                                     }, {
                                       required: true, message: '请输入邮箱地址',
                                     }],
                                   })(
                                     <InputItem
                                         placeholder="请输入有效的邮箱地址"
                                         onChange={this.stateChangeHandle.bind(this, 'email')}
                                     >邮箱地址</InputItem>
                                 )}
                                 {getFieldDecorator('confirmEmail', {
                                     rules: [{
                                       type: 'email', message: '请输入正确的邮箱地址',
                                     }, {
                                       required: true, message: '请再次输入您的邮箱地址',
                                     }],
                                   })(
                                     <InputItem
                                         placeholder="请再次输入您的邮箱地址"
                                         onChange={this.stateChangeHandle.bind(this, 'confirmEmail')}
                                     >邮箱确认</InputItem>
                                 )}
                                 {getFieldDecorator('password', {
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
                                         placeholder="您的密码最少为8个字符"
                                         showPwd='true'
                                         extra={<i className={isShowPwdCls} />}
                                         onExtraClick={e=>{}}
                                         onChange={this.stateChangeHandle.bind(this, 'password')}
                                     >帐号密码</InputItem>
                                 )}
                                 {getFieldDecorator('confirmPwd', {
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
                                     >确认密码</InputItem>
                                 )}
                                 {getFieldDecorator('phone')(
                                     <InputItem
                                         type="number"
                                         placeholder="请输入您的手机号"
                                         onChange={this.stateChangeHandle.bind(this, 'phone')}
                                     >手机号</InputItem>
                                 )}
                                 {getFieldDecorator('telephone')(
                                     <InputItem
                                         placeholder="请输入您的固定电话"
                                         onChange={this.stateChangeHandle.bind(this, 'telephone')}
                                     >固定电话</InputItem>
                                 )}
                                 {getFieldDecorator('idCard')(
                                     <InputItem
                                         placeholder="请输入您的身份证号码"
                                         onChange={this.stateChangeHandle.bind(this, 'idCard')}
                                     >身份证号码</InputItem>
                                 )}
                                 <Picker
                                     data={district}
                                     title="选择地区"
                                     extra="请选择您所在的省市区"
                                     value={this.state.cityValue}
                                     onChange={this.pickerChangeHandle.bind(this)}
                                     format={(values) => { return values.join(' '); }}
                                  >
                                     <List.Item arrow="horizontal" className={cityExtraCls}>详细地址</List.Item>
                                 </Picker>
                                 <TextareaItem
                                     title=" "
                                     placeholder="请输入您的所在地址，产品将会寄住此处"
                                     labelNumber={6}
                                     rows={2}
                                 />
                                 {getFieldDecorator('zipCode')(
                                     <InputItem
                                         placeholder="请输入6个数字的邮政编码"
                                         style={{border:'none'}}
                                         onChange={this.stateChangeHandle.bind(this, 'zipCode')}
                                     >邮政编码</InputItem>
                                 )}
                            </div>
                        </div>
                    </div>
                    <div className="m-reg-body">
                        <div className="reg-view">
                            <div className="reg-tit">
                                <h2>推荐人信息</h2>
                                <p>如您是通过凯娅尼会员推荐，请填写他/她的会员号</p>
                            </div>
                            <div className="ref-form">
                                {getFieldDecorator('referenceId')(
                                    <InputItem
                                        placeholder="请输入您的推荐人会员号"
                                        value={this.state.referenceId}
                                        onChange={this.stateChangeHandle.bind(this, 'referenceId')}
                                    >推荐人会员号</InputItem>
                                 )}
                                 {getFieldDecorator('confirmReferenceId')(
                                     <InputItem
                                         placeholder="请再次输入您的推荐人"
                                         style={{border:'none'}}
                                         onChange={this.stateChangeHandle.bind(this, 'confirmReferenceId')}
                                     >确认推荐人</InputItem>
                                  )}
                            </div>
                        </div>

                    </div>
                    {
                        this.state.buttonDisabled
                            ? <Button title="下一步" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                            : <Button title="下一步" className="ky-button-primary regcon-btn" onClick={this.submitHandle} disabled across/>
                    }
                 </div>
            </div>
         );
     }
 }
 const RegConsumerViewWrapper = createForm()(RegConsumerView);

 /*  React 与  Redux 绑定 */
 function mapStateToProps(state){
     return {
         RegModel: state.RegModel
     };
 }

 export default connect(
     mapStateToProps
 )(RegConsumerViewWrapper);
