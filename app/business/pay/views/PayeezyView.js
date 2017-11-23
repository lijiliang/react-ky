/**
 * @fileOverview 信用卡支付
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Payeezy } from '../action/DataAction';

import { createForm } from 'rc-form';
import classNames from 'classnames';
import { Urls, RegxRule, Cache, ValidData, CountryData} from 'kyCommon';
import { KYSteps } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/PayeezyView.less';
import visa from 'kyBase/resources/images/visa.png';
import masterCard from 'kyBase/resources/images/masterCard.png';

// 信用卡国家数据
const countryData = Cache.getObj(Cache.keys.ky_cache_Country) || [];

 class PayeezyView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             countryData: countryData,  // 信用卡国家数据
             expDate: [],  //有效期
             country: [],  // 国家
             cardType: '1' // 卡类型
         };
     }
     componentDidMount(){
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

     // 信用卡类型选择
     cardTypeChange(cardType){
         this.setState({
             cardType: cardType + ''
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
                        Toast.info(form.getFieldError(item), 1);
                        return;
                    }
                });
                return;
            }

            if(!error){
                this.setState(value);
            }

            const _state = this.state;
            const payment = this.props.payment;
            // 注册会员需要的数据
            const _data = {
                cardInfo: {  //支付信息
                    cardName: _state.cardName, //持卡人姓名
                    cardNumber: _state.cardNumber.replace(/\s+/g, ''), //卡号
                    expDate: _state.expDate.join(''), //有效期
                    cvv: _state.cvv, //发全码
                    addrDetail: _state.payAddrDetail, //账单地址
                    addrPrivonce: _state.province, //省份
                    addrCity: _state.city, //城市
                    postcode: _state.payPostcode, //邮政编码
                    country: _state.country.join(''), //国家
                    cardType: _state.cardType, //卡类型
                },
                payPrice: payment.get('price'), //支付金额
                tradeNo: payment.get('tradeNo')   //主订单号
            };

            this.props.dispatch(Payeezy(_data, (res) => {
                if(res.success){
                    hashHistory.push(`/pay/complete/${res.tradeNo}`);
                }else{
                    Toast.fail(res.errMsg, 1);
                    if(res.tradeNo){
                        setTimeout(function(){
                            hashHistory.push(`/pay/complete/${res.tradeNo}`);
                        }, 1500);
                    }
                }
            }));
        });
     }

     // 信用卡选择
     countryChangeHandle(v){
        this.setState({
            country: v
        })
     }
     // 信用卡国家数据
     onCitykHandle(){
         const _this = this;
         CountryData(function(e){
             _this.setState({
                 countryData: e
             });
         });
     }

     render(){
        //  console.log(this.state)
         const _state = this.state;
         const { getFieldDecorator} = this.props.form;
         const payment = this.props.payment;
         const regOrder = payment.get('regOrder');
         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.expDate.length
         })
         // 信用卡国家样式
         const countryExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.country.length
         })
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-payment">
                         <NavBar onLeftClick={this.gohistoryHandle.bind(this)}>填写支付信息</NavBar>
                         {
                             regOrder
                             ?
                                 <div className="m-regstep">
                                     <KYSteps current={4}/>
                                     <div className="regcon-info">
                                         <h2>填写支付信息</h2>
                                     </div>
                                 </div>
                            : null
                         }
                         {/* 信用卡支付 */}
                         <div className="m-payment-info">
                              <div className="info-tit">信用卡支付</div>
                              <div className="pay-list">
                                  <span
                                      className={this.state.cardType === '1' ? 'card-type cart-active' : 'card-type'} onClick={this.cardTypeChange.bind(this, 1)}>
                                      <img src={visa}/>
                                  </span>
                                  <span
                                      className={this.state.cardType === '2' ? 'card-type cart-active' : 'card-type'}
                                      onClick={this.cardTypeChange.bind(this, 2)}>
                                      <img src={masterCard}/>
                                  </span>
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
                                          type="bankCard"
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
                                               message: '请选择国家'
                                           }],
                                         })(
                                           <Picker
                                               data={this.state.countryData}
                                               cols={1}
                                               title="请选择国家"
                                               extra="国家"
                                               onChange={this.countryChangeHandle.bind(this)}
                                            >
                                               <List.Item className={countryExtraCls} onClick={this.onCitykHandle.bind(this)}>国家</List.Item>
                                           </Picker>
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
                                 应付金额<span className="price">￥{payment.get('price')}</span>
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

const PayeezyViewWrapper = createForm()(PayeezyView);

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        payment: state.PaymentModel
    };
}

export default connect(
    mapStateToProps
)(PayeezyViewWrapper);
