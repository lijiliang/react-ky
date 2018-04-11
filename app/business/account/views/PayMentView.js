/**
 * @fileOverview 填写支付信息
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import { UserDealer } from '../action/DataAction';

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
             expDate: [],  //有效期
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
         window.history.back();
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
             expDate: v
         });
     }
     submitHandle(){
        const form = this.props.form;
        form.validateFields((error, value) => {
            if(error){
                const fieldNames = ['cardNumber', 'cardName', 'expDate', 'cvv', 'payAddrDetail', 'city', 'province', 'payPostcode', 'country'].reverse();
                fieldNames.map((item, index) => {
                    if(form.getFieldError(item)){
                        Toast.info(form.getFieldError(item), 2);
                        return;
                    }
                });
                return;
            }

            if(!error){
                this.setState(value);
            }

            const _state = this.state;
            // 注册会员需要的数据
            const _data = {
                orderOriginalPrice: _state.groupItem.originalPrice, //订单原金额
                orderPayAmount: _state.groupItem.salePrice,     //订单应付金额
                orderPreferential: _state.groupItem.preferential,  //订单优惠
                payType: '1',//支付类型
                productGroupId: _state.groupId, // 产品套组ID
                dealer: {  //会员信息
                    addrPrivonce: _state.cityValue[0], //省
                    addrCity: _state.cityValue[1], //市
                    addrCounty: _state.cityValue[2], //县/区
                    addrDetail: _state.addrDetail, //详细地址
                    email: _state.email, // 邮箱
                    firstName: _state.firstName, //姓氏
                    idCard: _state.idCard, //身份证号码
                    lastName: _state.lastName, //名字
                    password: _state.password, //密码
                    phoneNumber: _state.phoneNumber,//手机号码
                    postcode: _state.postcode, //邮编
                    reRecommender: _state.reRecommender, //确认推荐人（安置人)
                    recommender: _state.recommender, //推荐人，KID，例如：CN123456或123456
                    telNumber: _state.telNumber //固定电话号码
                },
                shippingInfo: {  //收货信息
                    addrPrivonce: _state.consigneeCityValue[0],  // 省
                    addrCity: _state.consigneeCityValue[1], //市
                    addrCounty: _state.consigneeCityValue[2], //区
                    addrDetail: _state.consigneeAddrDetail, //详细地址
                    consignee: _state.consigneeName, //收件人
                    idCard: _state.consigneeIdCard, //身份证号码
                    isDefault: true, //是否默认
                    phoneNumber: _state.consigneePhoneNumber, //手机号码
                    postcode: _state.consigneepostcode, //邮编
                    telNumber: _state.consigneeTelNumber, //固定电话号码
                },
                payCardInfo: {  //支付信息
                    cardName: _state.cardName, //持卡人姓名
                    cardNumber: _state.cardNumber, //卡号
                    expDate: _state.expDate.join(''), //有效期
                    cvv: _state.cvv, //发全码
                    addrDetail: _state.payAddrDetail, //账单地址
                    addrPrivonce: _state.province, //省份
                    addrCity: _state.city, //城市
                    postcode: _state.payPostcode, //邮政编码
                    country: _state.country, //国家
                    cardType: '1', //卡类型
                }
            };
            // 更新session数据
            Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, _state);

            this.props.dispatch(UserDealer(_data));
        });
     }
     render(){
         const _state = this.state;
         const { getFieldDecorator} = this.props.form;

         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.expDate.length
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
                                      initialValue: this.state.cardNumber,
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
                                       initialValue: this.state.cardName,
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

                                    {getFieldDecorator('expDate', {
                                        initialValue: this.state.expDate,
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

                                   {getFieldDecorator('cvv', {
                                       initialValue: this.state.cvv,
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
                                           onChange={this.stateChangeHandle.bind(this, 'cvv')}
                                       >安全码</InputItem>
                                    )}
                                    {getFieldDecorator('payAddrDetail',{
                                        initialValue: this.state.payAddrDetail,
                                        rules: [{
                                            required: true,
                                            message: '请输入帐单地址'
                                        }],
                                      })(
                                       <TextareaItem
                                           title="帐单地址"
                                           placeholder="帐单地址"
                                           labelNumber={5}
                                           rows={2}
                                           value={this.state.payAddrDetail}
                                           onChange={this.stateChangeHandle.bind(this, 'payAddrDetail')}
                                       />
                                   )}
                                   {getFieldDecorator('city', {
                                       initialValue: this.state.city,
                                       rules: [{
                                           required: true,
                                           message: '请输入城市'
                                       }],
                                     })(
                                       <InputItem
                                           labelNumber={5}
                                           placeholder="城市"
                                           onChange={this.stateChangeHandle.bind(this, 'city')}
                                       >城市</InputItem>
                                    )}
                                    {getFieldDecorator('province', {
                                        initialValue: this.state.province,
                                        rules: [{
                                            required: true,
                                            message: '请输入省份'
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
                                          initialValue: this.state.country,
                                          rules: [{
                                              required: true,
                                              message: '请输入国家'
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
                                 应付金额<span className="price">￥{_state.groupItem ? _state.groupItem.salePrice : '0'}</span>
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

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        RegModel: state.RegModel
    };
}

export default connect(
    mapStateToProps
)(PaymentViewWrapper);
