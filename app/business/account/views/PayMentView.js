/**
 * @fileOverview 填写支付信息
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
import { Urls, RegxRule, Cache, ValidData } from 'kyCommon';
import { KYSteps } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/PayMentView.less';
import visa from 'kyBase/resources/images/visa.png';
import masterCard from 'kyBase/resources/images/masterCard.png';
 class RegPaymentView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             validSelect: ['05', '29'],  //有效期
         };
     }
     componentDidMount(){
         // 获取session
         const regmember_info = Cache.sessionGet(Cache.sessionKeys.ky_cache_regmember_info);
         if(regmember_info){
             this.setState(regmember_info);
         }
     }

     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }

     // 设置state
     stateChangeHandle(name, value){
         this.setState({
             [name]: value
         });
     }

     // 有效期选择
     validChangeHandle(v){
         this.setState({
             validSelect: v
         });
     }
     submitHandle(){
        const form = this.props.form;
        form.validateFields((error, value) => {
            if(error){
                const fieldNames = ['cardNumber', 'cardName', 'validSelect', 'securityCode'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 1);
                        return;
                    }
                });
                return;
            }

            if(!error){
                this.setState(value);
            }

            // 更新session数据
            Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, this.state);
        });
     }
     render(){
         console.log(this.state)
         const { getFieldDecorator} = this.props.form;

         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.validSelect.length
         })
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-payment">
                         <NavBar onLeftClick={this.gohistoryHandle.bind(this)}>填写支付信息</NavBar>

                         <div className="m-regstep">
                             <KYSteps current={4}/>
                             <div className="regcon-info">
                                 <h2>填写支付信息</h2>
                             </div>
                         </div>

                         {/* 信用卡支付 */}
                         <div className="m-payment-info">
                              <div className="info-tit">信用卡支付</div>
                              <div className="pay-list">
                                  <img src={visa}/>
                                  <img src={masterCard}/>
                              </div>

                              <div className="m-payment-form">

                                  {getFieldDecorator('cardNumber', {
                                      rules: [{
                                          required: true,
                                          message: '请输入您的卡号'
                                      }],
                                    })(
                                      <InputItem
                                          labelNumber={5}
                                          placeholder="请输入您的卡号"
                                          onChange={this.stateChangeHandle.bind(this, 'cardNumber')}
                                      >卡号</InputItem>
                                   )}
                                   {getFieldDecorator('cardName', {
                                       rules: [{
                                           required: true,
                                           message: '请输入持卡人姓名'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           placeholder="请输入持卡人姓名"
                                           onChange={this.stateChangeHandle.bind(this, 'cardName')}
                                       >持卡人姓名</InputItem>
                                    )}

                                    {getFieldDecorator('validSelect', {
                                        initialValue: this.state.validSelect,
                                        rules: [{
                                            required: true,
                                            message: '请选择有效期'
                                        }],
                                      })(
                                       <Picker
                                          data={ValidData}
                                          title="选择有效期"
                                          cascade={false}
                                          extra="请选择有效期"
                                          onChange={this.validChangeHandle.bind(this)}
                                          format={(values) => { return values.join(' / '); }}
                                        >
                                          <List.Item className={cityExtraCls}>有效期</List.Item>
                                        </Picker>
                                    )}

                                   {getFieldDecorator('securityCode', {
                                       rules: [{
                                           required: true,
                                           message: '请输入您的安全码'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           maxLength={3}
                                           placeholder="安全码"
                                           type="number"
                                           extra={<div className="pay-behind">信用卡背后3位数字<i className="icon icon-csc"></i></div>}
                                           onChange={this.stateChangeHandle.bind(this, 'securityCode')}
                                       >安全码</InputItem>
                                    )}
                                   <TextareaItem
                                       title="帐单地址"
                                       placeholder="帐单地址"
                                       labelNumber={5}
                                       rows={2}
                                   />
                                   {getFieldDecorator('city', {
                                       rules: [{
                                           required: true,
                                           message: '城市不能为空'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           placeholder="城市"
                                           onChange={this.stateChangeHandle.bind(this, 'city')}
                                       >城市</InputItem>
                                    )}
                                    {getFieldDecorator('province', {
                                        rules: [{
                                            required: true,
                                            message: '省份不能为空'
                                        }],
                                      })(
                                        <InputItem
                                            labelNumber={5}
                                            placeholder="省份"
                                            onChange={this.stateChangeHandle.bind(this, 'province')}
                                        >省份</InputItem>
                                     )}

                                      {getFieldDecorator('payPostcode',{
                                          initialValue: this.state.payPostcode,
                                          rules: [{
                                              pattern: RegxRule.zipCode,
                                              message: '请输入正确的邮政编码'
                                          },{
                                              required: true,
                                              message: '请输入邮政编码'
                                          }],
                                        })(
                                          <InputItem
                                              placeholder="邮政编码"
                                              labelNumber={5}
                                              maxLength={6}
                                              type="number"
                                              onChange={this.stateChangeHandle.bind(this, 'payPostcode')}
                                          >邮政编码</InputItem>
                                      )}

                                      {getFieldDecorator('country', {
                                          rules: [{
                                              required: true,
                                              message: '国家不能为空'
                                          }],
                                        })(
                                          <InputItem
                                              labelNumber={5}
                                              placeholder="国家"
                                              onChange={this.stateChangeHandle.bind(this, 'country')}
                                          >国家</InputItem>
                                       )}
                              </div>
                         </div>
                         {/* 安全加密 */}
                         <div className="m-payment-safety">
                             <div className="m-safety">
                                 <i className="icon icon-safetyPhone"></i>
                                 <div className="safety-info">
                                     <p>安全加密, 保障您的用卡安全。 </p>
                                     <p>我们注重信息保护, 不授权不对外提供。</p>
                                 </div>
                             </div>
                             <div className="payable">
                                 应付金额<span className="price">￥10,888.00</span>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="m-foot-fixed">
                      <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle.bind(this)} across/>
                 </div>
             </div>
         );
     }
 }

const PaymentViewWrapper = createForm()(RegPaymentView);
export default PaymentViewWrapper;
