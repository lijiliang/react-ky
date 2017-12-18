/**
 * @fileOverview 注册会员帐号 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionTypes from '../action/actionTypes';
import { CheckDealerReg } from '../action/DataAction';

import { createForm } from 'rc-form';
import classNames from 'classnames';
import { get, getPublic } from 'kyBase/common/FetchData';
import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
import { getIdCardAge } from 'Utils';

//组件
import { KYSteps, KYRegTips} from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/RegMemberView.less';

// 省市区数据
const cityAreaData = Cache.getObj(Cache.keys.ky_cache_cityArea) || [];

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
             phoneNumber: '',  //手机号
             telNumber: '',    //固定电话
             idCard: '',       //身份证号码
             cityValue: [],    //省市区数据
             addrDetail: '',   //详细地址
             postcode: '', //邮政编码
             recommender: '',  //推荐人编号
             reRecommender: '',//确认推荐人(安置人)
             buttonDisabled: true,     // 注册按钮是否可点
             cityExtra: false,         // 是否已选择过省市区
             consigneeName: '',        // 收货人姓名
             consigneeCityValue: '',   // 收货人省市区数据
             consigneeAddrDetail: '',  // 收货人详细地址
             consigneepostcode: '',// 收货人邮编
             consigneePhoneNumber: '', // 收货人手机号码
             consigneeIdCard: '',      // 收货人身份证号码
             consigneeTelNumber: '',   // 收货人固定电话号码
             cityAreaData: cityAreaData, // 全部省市区数据
             recommenderTimes: 0,  // 推荐人编号为空次数
         };
     }

     componentDidMount(){
         // 获取session
         const regmember_info = Cache.sessionGet(Cache.sessionKeys.ky_cache_regmember_info);
         if(regmember_info){
             this.setState(regmember_info);
         }

         // 每次进来先设置推荐人编号为空次数
         this.setState({
             recommenderTimes: 0
         })
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
     }
     // 省市区选择
     pickerChangeHandle(v){
        this.setState({
            cityValue: v,
            cityExtra: true
        })
     }
     // 点击获取省市区
     onCitykHandle(){
         const _this = this;
         AddressData(function(e){
             _this.setState({
                 cityAreaData: e
             })
         });
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
            const _recommender = form.getFieldValue('recommender');
            const _idCard = form.getFieldValue('idCard');

            if(error){
                const fieldNames = ['firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPwd', 'phoneNumber', 'telNumber', 'idCard', 'cityValue', 'addrDetail', 'postcode', 'recommender', 'reRecommender'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 1)
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
                        return;
                    }
                })
                return;
            }

            // if(_firstName && RegxRule.trim.test(_firstName)){
            //     Toast.info('姓氏不能包含空格', 1);
            //     return;
            // }

            // 如果年龄小于18岁，不能通过
            if(getIdCardAge(_idCard) < 18){
                Toast.info('身份证号码不符', 1);
                return;
            }

            if(!error){
                this.setState(value)
            }

            const _state = this.state;
            // 处理数据并保存到session
            const consigneeInfo = {
                consigneeName: _state.consigneeName ?  _state.consigneeName : value.firstName + value.lastName,    // 收货人姓名
                consigneeCityValue: _state.consigneeCityValue ?  _state.consigneeCityValue : value.cityValue,       // 收货人省市区数据
                consigneeAddrDetail: _state.consigneeAddrDetail ?  _state.consigneeAddrDetail : value.addrDetail,     // 收货人详细的街道门牌号等
                consigneepostcode: _state.consigneepostcode ?  _state.consigneepostcode : value.postcode,             // 收货人邮编
                consigneePhoneNumber: _state.consigneePhoneNumber ?  _state.consigneePhoneNumber : value.phoneNumber,   // 收货人手机号码
                consigneeIdCard: _state.consigneeIdCard ?  _state.consigneeIdCard : value.idCard,             // 收货人身份证号码
                consigneeTelNumber: _state.consigneeTelNumber ?  _state.consigneeTelNumber : value.telNumber,       // 收货人固定电话号码
            }
            const regMemberInfo = Object.assign(this.state, consigneeInfo);
            Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, regMemberInfo);

            // 如果推荐人号没填，则需要点击两次“下一步”按钮才能进入下一步
            if(_recommender){
                // 推荐人会员号存在，直接将数据dispatch过去
                this.props.dispatch(CheckDealerReg(_state.cityValue[0], _state.cityValue[1], _state.cityValue[2], _state.addrDetail, _state.email, _state.firstName, _state.idCard, _state.lastName, _state.password, _state.phoneNumber, _state.postcode, _state.reRecommender, _state.recommender, _state.telNumber, this.successFn))
            }else{
                let recommenderTimes = this.state.recommenderTimes;
                if(recommenderTimes < 2) {
                    Toast.info('请输入推荐人会员号', 1)
                    recommenderTimes++;
                    this.setState({
                        recommenderTimes: recommenderTimes
                    })
                }else{
                    // 将数据dispatch过去
                    this.props.dispatch(CheckDealerReg(_state.cityValue[0], _state.cityValue[1], _state.cityValue[2], _state.addrDetail, _state.email, _state.firstName, _state.idCard, _state.lastName, _state.password, _state.phoneNumber, _state.postcode, _state.reRecommender, _state.recommender, _state.telNumber, this.successFn))
                }

            }
         })
     }
     // 下一步 验证数据成功的回调
     successFn = () => {
         hashHistory.push('/account/regselectpack')
     }
     render(){
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
             <div className="ky-container-body">
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
                                        initialValue: this.state.firstName,
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
                                         initialValue: this.state.lastName,
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
                                         initialValue: this.state.email,
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
                                         initialValue: this.state.confirmEmail,
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
                                             placeholder="您的密码最少为8个字符"
                                             showPwd='true'
                                             extra={<i className={isShowPwdCls} />}
                                             onExtraClick={e=>{}}
                                             onChange={this.stateChangeHandle.bind(this, 'password')}
                                         >帐号密码</InputItem>
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
                                         >确认密码</InputItem>
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
                                     {getFieldDecorator('telNumber',{
                                         initialValue: this.state.telNumber,
                                         rules: [{
                                             pattern: RegxRule.telPhone,
                                             message: '请输入正确的固定电话'
                                         }]
                                       })(
                                         <InputItem
                                             placeholder="请输入您的固定电话"
                                             onChange={this.stateChangeHandle.bind(this, 'telNumber')}
                                         >固定电话</InputItem>
                                     )}
                                     {getFieldDecorator('idCard',{
                                         initialValue: this.state.idCard,
                                         rules: [{
                                             pattern: RegxRule.idCard,
                                             message: '请输入正确的身份证号'
                                         },{
                                             required: true,
                                             message: '请输入您的身份证号码'
                                         }],
                                       })(
                                         <InputItem
                                             placeholder="请输入您的身份证号码"
                                             onChange={this.stateChangeHandle.bind(this, 'idCard')}
                                         >身份证号码</InputItem>
                                     )}
                                     {getFieldDecorator('cityValue',{
                                         initialValue: this.state.cityValue,
                                         rules: [{
                                             required: true,
                                             message: '请选择您所在的省市区'
                                         }],
                                       })(
                                         <Picker
                                             data={this.state.cityAreaData}
                                             title="选择地区"
                                             extra="请选择您所在的省市区"
                                             value={this.state.cityValue}
                                             onChange={this.pickerChangeHandle.bind(this)}
                                             format={(values) => { return values.join(' '); }}
                                          >
                                             <List.Item arrow="horizontal" onClick={this.onCitykHandle.bind(this)} className={cityExtraCls}>详细地址</List.Item>
                                         </Picker>
                                     )}

                                     {getFieldDecorator('addrDetail',{
                                         initialValue: this.state.addrDetail,
                                         rules: [{
                                             required: true,
                                             message: '请输入详细地址'
                                         }],
                                       })(
                                         <TextareaItem
                                             title=" "
                                             placeholder="请输入您的所在地址，产品将会寄住此处"
                                             labelNumber={6}
                                             rows={2}
                                             value={this.state.addrDetail}
                                             onChange={this.stateChangeHandle.bind(this, 'addrDetail')}
                                         />
                                     )}
                                     {getFieldDecorator('postcode',{
                                         initialValue: this.state.postcode,
                                         rules: [{
                                             pattern: RegxRule.zipCode,
                                             message: '请输入正确的邮政编码'
                                         },{
                                             required: true,
                                             message: '请输入邮政编码'
                                         }],
                                       })(
                                         <InputItem
                                             placeholder="请输入6个数字的邮政编码"
                                             maxLength={6}
                                             type="number"
                                             style={{border:'none'}}
                                             onChange={this.stateChangeHandle.bind(this, 'postcode')}
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
                                    {getFieldDecorator('recommender',{
                                        initialValue: this.state.recommender,
                                        rules: [{
                                            pattern: RegxRule.referenceId,
                                            message: '推荐人会员号不正确'
                                        },{
                                            required: false,
                                            message: '请输入推荐人会员号'
                                        }],
                                      })(
                                        <InputItem
                                            placeholder="请输入您的推荐人会员号"
                                            value={this.state.referenceId}
                                            onChange={this.stateChangeHandle.bind(this, 'recommender')}
                                        >推荐人会员号</InputItem>
                                     )}
                                     {getFieldDecorator('reRecommender',{
                                         initialValue: this.state.reRecommender,
                                         rules: [{
                                             pattern: RegxRule.referenceId,
                                             message: '推荐人会员号不正确'
                                         },{
                                             required: false,
                                             message: '请再次输入您的推荐人'
                                         }],
                                       })(
                                         <InputItem
                                             placeholder="请再次输入您的推荐人"
                                             style={{border:'none'}}
                                             onChange={this.stateChangeHandle.bind(this, 'reRecommender')}
                                         >确认推荐人</InputItem>
                                      )}
                                </div>
                            </div>
                        </div>
                        <KYRegTips />
                     </div>
                </div>
                <div className="m-foot-fixed">
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
