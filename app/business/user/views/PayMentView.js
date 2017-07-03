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
import { ValidData } from 'kyCommon';
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
             select: ['08', '12']
         };
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
     render(){
         const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;

         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.select.length
         })
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-payment">
                         <NavBar iconName="">填写支付信息</NavBar>

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
                                  {getFieldDecorator('firstName', {
                                      rules: [{
                                          required: true,
                                          message: '请输入您的卡号'
                                      }],
                                    })(
                                      <InputItem
                                          labelNumber={5}
                                          placeholder="请输入您的卡号"
                                          onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                      >卡号</InputItem>
                                   )}
                                   {getFieldDecorator('firstName', {
                                       rules: [{
                                           required: true,
                                           message: '请输入您的卡号'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           placeholder="请输入您的持卡人姓名"
                                           onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                       >持卡人姓名</InputItem>
                                    )}

                                   <Picker
                                      data={ValidData}
                                      title="选择有效期"
                                      cascade={false}
                                      extra="请选择有效期"
                                      value={this.state.select}
                                      onChange={v => this.setState({ select: v })}
                                    //   onChange={this.pickerChangeHandle.bind(this)}
                                      format={(values) => { return values.join(' / '); }}
                                      onOk={e => console.log('ok', e)}
                                      onDismiss={e => console.log('dismiss', e)}
                                    >
                                      <List.Item className={cityExtraCls}>有效期</List.Item>
                                    </Picker>
                                   {getFieldDecorator('firstName', {
                                       rules: [{
                                           required: true,
                                           message: '请输入您的卡号'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           placeholder="安全码"
                                           extra={<div className="pay-behind">信用卡背后3位数字<i className="icon icon-csc"></i></div>}
                                           onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                       >安全码</InputItem>
                                    )}
                                   <TextareaItem
                                       title="帐单地址"
                                       placeholder=""
                                       labelNumber={5}
                                       rows={2}
                                   />
                                   {getFieldDecorator('firstName', {
                                       rules: [{
                                           required: true,
                                           message: '请输入您的卡号'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           placeholder="城市"
                                           onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                       >城市</InputItem>
                                    )}
                                    {getFieldDecorator('firstName', {
                                        rules: [{
                                            required: true,
                                            message: '请输入您的卡号'
                                        }],
                                      })(
                                        <InputItem
                                            labelNumber={5}
                                            placeholder="省份"
                                            onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                        >省份</InputItem>
                                     )}
                                     {getFieldDecorator('firstName', {
                                         rules: [{
                                             required: true,
                                             message: '请输入您的卡号'
                                         }],
                                       })(
                                         <InputItem
                                             labelNumber={5}
                                             placeholder="省份"
                                             onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                         >邮政编码</InputItem>
                                      )}
                                      {getFieldDecorator('firstName', {
                                          rules: [{
                                              required: true,
                                              message: '请输入您的卡号'
                                          }],
                                        })(
                                          <InputItem
                                              labelNumber={5}
                                              placeholder="省份"
                                              onChange={this.stateChangeHandle.bind(this, 'firstName')}
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
                      <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                 </div>
             </div>
         );
     }
 }

const PaymentViewWrapper = createForm()(RegPaymentView);
export default PaymentViewWrapper;
