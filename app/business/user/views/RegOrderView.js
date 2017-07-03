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

import PackItemView from './PackItemView';
import { Urls, RegxRule, Cache } from 'kyCommon';
import { KYSteps, KYPayMethod } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/RegOrderView.less';

import datas from 'kyBase/components/ux/data'
const district = datas;
class RegOrderView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    componentDidMount(){
        // 获取session
        const regmember_info = Cache.sessionGet(Cache.sessionKeys.ky_cache_regmember_info);
        if(regmember_info){
            this.setState(regmember_info);
        }
    }
    // 设置state
    stateChangeHandle(name, value){
        this.setState({
            [name]: value
        });
    }

    // 省市区选择
    pickerChangeHandle(v){
        this.setState({
            cityValue: v,
            cityExtra: true
        });
    }

    // 收货信息省市区选择
    pickerConsigneeChangeHandle(v){
        this.setState({
            consigneeCityValue: v,
            cityExtra: true
        });
    }

    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    // 提交
    submitHandle = () => {
        const form = this.props.form;
        form.validateFields((error, value) => {
           if(error){
               const fieldNames = ['cityValue', 'addrDetail', 'addrPostcode', 'phoneNumber', 'recommender', 'reRecommender', 'idCard', 'telNumber', 'consigneeName', 'consigneeCityValue', 'consigneeAddrDetail', 'consigneeAddrPostcode', 'consigneePhoneNumber', 'consigneeIdCard', 'consigneeTelNumber'].reverse();
               fieldNames.map((item, index) => {
                   if(form.getFieldError(item)){
                       Toast.info(form.getFieldError(item), 1)
                       return;
                   }
               })
               return;
           }

           if(!error){
               this.setState(value)
           }

           const _state = this.state;

           // 更新session数据
           Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, this.state);

        })
    }

    render(){
        console.log(this.state)
        const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;

        const cityExtraCls = classNames({
            ['picker-city']: true,
            ['picker-city-active']: this.state.cityExtra
        })
        return(
            <div className="ky-container-body">
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
                               <span className="modify">修改</span>
                           </div>
                           <div className="userinfo-form">

                               {getFieldDecorator('cityValue',{
                                   initialValue: this.state.cityValue,
                                   rules: [{
                                       required: true,
                                       message: '请选择您所在的收货地区'
                                   }],
                                 })(
                                   <Picker
                                       data={district}
                                       title="选择地区"
                                       extra="请选择您所在的省市区"
                                       value={this.state.cityValue}
                                       onChange={this.pickerChangeHandle.bind(this)}
                                       format={(values) => { return values.join(' '); }}
                                    >
                                       <List.Item arrow="horizontal" className={cityExtraCls}>收货地区</List.Item>
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
                                       title="详细地址"
                                       placeholder="请输入您的所在地址，产品将会寄住此处"
                                       labelNumber={5}
                                       rows={2}
                                       value={this.state.addrDetail}
                                       onChange={this.stateChangeHandle.bind(this, 'addrDetail')}
                                   />
                               )}

                               {getFieldDecorator('addrPostcode',{
                                   initialValue: this.state.addrPostcode,
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
                                       labelNumber={5}
                                       maxLength={5}
                                       type="number"
                                       style={{border:'none'}}
                                       onChange={this.stateChangeHandle.bind(this, 'addrPostcode')}
                                   >邮政编码</InputItem>
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
                                       labelNumber={5}
                                       placeholder="请输入您的手机号"
                                       onChange={this.stateChangeHandle.bind(this, 'phoneNumber')}
                                       maxLength={11}
                                   >手机号</InputItem>
                               )}

                               {getFieldDecorator('recommender',{
                                   initialValue: this.state.recommender,
                                   rules: [{
                                       pattern: RegxRule.referenceId,
                                       message: '推荐人编号不正确'
                                   },{
                                       required: true,
                                       message: '请输入推荐人编号'
                                   }],
                                 })(
                                   <InputItem
                                       labelNumber={5}
                                       placeholder="请输入您的推荐人编号"
                                       value={this.state.referenceId}
                                       onChange={this.stateChangeHandle.bind(this, 'recommender')}
                                   >推荐人编号</InputItem>
                                )}

                                {getFieldDecorator('reRecommender',{
                                    initialValue: this.state.reRecommender,
                                    rules: [{
                                        pattern: RegxRule.referenceId,
                                        message: '推荐人会员号不正确'
                                    },{
                                        required: true,
                                        message: '请再次输入您的推荐人'
                                    }],
                                  })(
                                    <InputItem
                                        labelNumber={5}
                                        placeholder="请再次输入您的推荐人"
                                        style={{border:'none'}}
                                        onChange={this.stateChangeHandle.bind(this, 'reRecommender')}
                                    >确认推荐人</InputItem>
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
                                         labelNumber={5}
                                         placeholder="请输入您的身份证号码"
                                         onChange={this.stateChangeHandle.bind(this, 'idCard')}
                                     >身份证号码</InputItem>
                                 )}

                                 {getFieldDecorator('telNumber',{
                                     initialValue: this.state.telNumber,
                                     rules: [{
                                         pattern: RegxRule.telPhone,
                                         message: '请输入正确的固定电话'
                                     }]
                                   })(
                                     <InputItem
                                         labelNumber={5}
                                         placeholder="请输入您的固定电话"
                                         onChange={this.stateChangeHandle.bind(this, 'telNumber')}
                                     >固定电话</InputItem>
                                 )}

                           </div>
                       </div>
                       <div className="m-userinfo">
                           <div className="userinfo-tit">
                               <h2>收货信息</h2>
                               <span className="modify">修改</span>
                           </div>
                           <div className="userinfo-form">
                               {getFieldDecorator('consigneeName', {
                                   initialValue: this.state.consigneeName,
                                   rules: [{
                                       required: true,
                                       message: '请输入收货人姓名'
                                   }],
                                 })(
                                   <InputItem
                                       labelNumber={5}
                                       placeholder="请输入收货人姓名"
                                       onChange={this.stateChangeHandle.bind(this, 'consigneeName')}
                                   >收货人姓名</InputItem>
                                )}

                                {getFieldDecorator('consigneeCityValue',{
                                    initialValue: this.state.consigneeCityValue,
                                    rules: [{
                                        required: true,
                                        message: '请选择您所在的收货地区'
                                    }],
                                  })(
                                    <Picker
                                        data={district}
                                        title="选择地区"
                                        extra="请选择您所在的省市区"
                                        value={this.state.consigneeCityValue}
                                        onChange={this.pickerConsigneeChangeHandle.bind(this)}
                                        format={(values) => { return values.join(' '); }}
                                     >
                                        <List.Item arrow="horizontal" className={cityExtraCls}>收货地区</List.Item>
                                    </Picker>
                                )}

                                {getFieldDecorator('consigneeAddrDetail',{
                                    initialValue: this.state.consigneeAddrDetail,
                                    rules: [{
                                        required: true,
                                        message: '请输入详细地址'
                                    }],
                                  })(
                                    <TextareaItem
                                        title="详细地址"
                                        placeholder="请输入您的所在地址，产品将会寄住此处"
                                        labelNumber={5}
                                        rows={2}
                                        value={this.state.consigneeAddrDetail}
                                        onChange={this.stateChangeHandle.bind(this, 'consigneeAddrDetail')}
                                    />
                                )}

                                {getFieldDecorator('consigneeAddrPostcode',{
                                    initialValue: this.state.consigneeAddrPostcode,
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
                                        labelNumber={5}
                                        maxLength={5}
                                        type="number"
                                        style={{border:'none'}}
                                        onChange={this.stateChangeHandle.bind(this, 'consigneeAddrPostcode')}
                                    >邮政编码</InputItem>
                                )}

                                {getFieldDecorator('consigneePhoneNumber', {
                                    initialValue: this.state.consigneePhoneNumber,
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
                                        labelNumber={5}
                                        placeholder="请输入您的手机号"
                                        onChange={this.stateChangeHandle.bind(this, 'consigneePhoneNumber')}
                                        maxLength={11}
                                    >手机号</InputItem>
                                )}

                                  {getFieldDecorator('consigneeIdCard',{
                                      initialValue: this.state.consigneeIdCard,
                                      rules: [{
                                          pattern: RegxRule.idCard,
                                          message: '请输入正确的身份证号'
                                      },{
                                          required: true,
                                          message: '请输入您的身份证号码'
                                      }],
                                    })(
                                      <InputItem
                                          labelNumber={5}
                                          placeholder="请输入您的身份证号码"
                                          onChange={this.stateChangeHandle.bind(this, 'consigneeIdCard')}
                                      >身份证号码</InputItem>
                                  )}

                                  {getFieldDecorator('consigneeTelNumber',{
                                      initialValue: this.state.consigneeTelNumber,
                                      rules: [{
                                          pattern: RegxRule.telPhone,
                                          message: '请输入正确的固定电话'
                                      }]
                                    })(
                                      <InputItem
                                          labelNumber={5}
                                          placeholder="请输入您的固定电话"
                                          onChange={this.stateChangeHandle.bind(this, 'consigneeTelNumber')}
                                      >固定电话</InputItem>
                                  )}

                           </div>
                       </div>
                        <KYPayMethod price="10,888.00"/>
                    </div>
                </div>
                <div className="m-foot-fixed">
                     <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                </div>
            </div>
        );
    }
}
const RegOrderViewWrapper = createForm()(RegOrderView);
export default RegOrderViewWrapper;
