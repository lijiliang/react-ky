/**
 * @fileOverview 确认订单及填写收货地址
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import { CheckDealerReg, CheckAddress, UserDealer} from '../action/DataAction';

import { createForm } from 'rc-form';
import classNames from 'classnames';

import PackItemView from './PackItemView';
import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
import { KYSteps, KYPayMethod } from 'kyComponent';
import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import '../resources/RegOrderView.less';

// 省市区数据
const cityAreaData = Cache.getObj(Cache.keys.ky_cache_cityArea) || [];

class RegOrderView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            accouontMask: true,   //帐户信息遮罩
            consigneeMask: true,  //收货信息遮罩
            payType: '29',        //默认支付类型
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

    // 点击获取省市区
    onCitykHandle(){
        const _this = this;
        AddressData(function(e){
            _this.setState({
                cityAreaData: e
            })
        });
    }

    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    // 提交
    submitHandle = () => {
        const _state = this.state;
        if(!_state.accouontMask){
            Toast.info('您修改的帐户信息还没保存', 1);
            return;
        }
        if(!_state.consigneeMask){
            Toast.info('您修改的收货信息还没保存', 1);
            return;
        }
        this._verifyFormHandle(() => {
            const checkAddressData = {
                addrPrivonce: _state.consigneeCityValue[0],//省
                addrCity: _state.consigneeCityValue[1],    //市
                addrCounty: _state.consigneeCityValue[2],  //区
                addrDetail: _state.consigneeAddrDetail,    //详细地址
                consignee: _state.consigneeName,           //收件人
                idCard: _state.consigneeIdCard,            //身份证号
                phoneNumber: _state.consigneePhoneNumber,  //手机号码
                postcode: _state.consigneepostcode,        //邮编
                telNumber: _state.consigneeTelNumber,      //电话号码
                isDefault: true,//是否默认
            };

            // 注册会员需要的数据
            const userDealerData = {
                orderOriginalPrice: _state.groupItem.originalPrice, //订单原金额
                orderPayAmount: _state.groupItem.salePrice,     //订单应付金额
                orderPreferential: _state.groupItem.preferentialPrice,  //订单优惠
                payType: _state.payType,//支付类型
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
                }
            };
            // 确保收货信息里面的收货人与身份证号码相匹配
            // 将数据dispatch过去  验证：收货信息表单
            this.props.dispatch(CheckAddress(checkAddressData, (res) => {
                if(res.success){
                    // 注册用户并跳支付页面
                    this.props.dispatch(UserDealer(userDealerData, (dealeres) => {
                        if(dealeres.success){
                            if(dealeres.memberFlag){
                                window.location.href = dealeres.payUrl;
                            }else{
                                hashHistory.push(`/pay/complete/${dealeres.tradeNo}`)
                            }
                        }else{
                            Toast.info(dealeres.errMsg)
                        }
                    }))
                }
            }))
        });
    }
    //修改帐户信息
    accouontMaskHandle(){
        const _state = this.state;
        // 如果收货信息也在修改状态，提示用户保存
        if(!_state.consigneeMask){
            Toast.info('您修改的收货信息还没保存', 1);
            return;
        }
        if (!_state.accouontMask) {
            this._verifyFormHandle(() => {
                // 将数据dispatch过去
                this.props.dispatch(CheckDealerReg(_state.cityValue[0], _state.cityValue[1], _state.cityValue[2], _state.addrDetail, _state.email, _state.firstName, _state.idCard, _state.lastName, _state.password, _state.phoneNumber, _state.postcode, _state.reRecommender, _state.recommender, _state.telNumber, this.successAccouontFn))
            });
        }else{
            this.setState({
                accouontMask: false
            })
        }
    }
    // 帐户信息 修改成功回调函数
    successAccouontFn = () => {
        Toast.success('修改成功', 1);
        this.setState({
            accouontMask: true
        })
        // 更新session数据
        Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, this.state);
    }

    //修改收货信息
    consigneeMaskHandle(){
        const _state = this.state;
        // 如果帐户信息也在修改状态，提示用户保存
        if(!_state.accouontMask){
            Toast.info('您修改的帐户信息还没保存', 1);
            return;
        }
        if (!_state.consigneeMask) {
            this._verifyFormHandle(() => {
                const checkAddressData = {
                    addrPrivonce: _state.consigneeCityValue[0],//省
                    addrCity: _state.consigneeCityValue[1],    //市
                    addrCounty: _state.consigneeCityValue[2],  //区
                    addrDetail: _state.consigneeAddrDetail,    //详细地址
                    consignee: _state.consigneeName,           //收件人
                    idCard: _state.consigneeIdCard,            //身份证号
                    phoneNumber: _state.consigneePhoneNumber,  //手机号码
                    postcode: _state.consigneepostcode,        //邮编
                    telNumber: _state.consigneeTelNumber,      //电话号码
                    isDefault: true,//是否默认
                };
                // 将数据dispatch过去  验证：收货信息表单
                this.props.dispatch(CheckAddress(checkAddressData, (res) => {
                    if(res.success){
                        Toast.success('修改成功', 1);
                        this.setState({
                            consigneeMask: true
                        })
                        // 更新session数据
                        Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, this.state);
                    }
                }))
            });
        }else{
            this.setState({
                consigneeMask: false
            })
        }
    }

    // 验证表单数据
    _verifyFormHandle(callback) {
        const form = this.props.form;
        form.validateFields((error, value) => {
           if(error){
               const fieldNames = ['cityValue', 'addrDetail', 'postcode', 'phoneNumber', 'recommender', 'reRecommender', 'idCard', 'telNumber', 'consigneeName', 'consigneeCityValue', 'consigneeAddrDetail', 'consigneepostcode', 'consigneePhoneNumber', 'consigneeIdCard', 'consigneeTelNumber'].reverse();
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

           if(callback && typeof callback === 'function'){
               callback();
           }
           // 更新session数据
           //const _state = this.state;
           //Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, this.state);

        })
    }
    // 选择支付方式
    changePayTypeHandle(payType){
        this.setState({
            payType: payType
        })
    }
    render(){
        const _state = this.state;
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
                           <PackItemView active listData={this.state.groupItem}/>
                       </div>
                       <div className="m-userinfo">
                           <div className="userinfo-tit">
                               <h2>帐户信息</h2>
                               <span className="modify" onClick={this.accouontMaskHandle.bind(this)}>
                                   {this.state.accouontMask ? '修改' : '保存' }
                               </span>
                           </div>
                           <div className="userinfo-form">
                               {
                                   this.state.accouontMask ? <div className="form-mask"></div> : null
                               }
                               {getFieldDecorator('cityValue',{
                                   initialValue: this.state.cityValue,
                                   rules: [{
                                       required: true,
                                       message: '请选择您所在的收货地区'
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
                                       <List.Item arrow="horizontal" onClick={this.onCitykHandle.bind(this)} className={cityExtraCls}>收货地区</List.Item>
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
                                       labelNumber={5}
                                       maxLength={6}
                                       type="number"
                                       style={{border:'none'}}
                                       onChange={this.stateChangeHandle.bind(this, 'postcode')}
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
                                       required: false,
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
                                        required: false,
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
                               <span className="modify" onClick={this.consigneeMaskHandle.bind(this)}>
                                   {this.state.consigneeMask ? '修改' : '保存' }
                               </span>
                           </div>
                           <div className="userinfo-form">
                               {
                                   this.state.consigneeMask ? <div className="form-mask"></div> : null
                               }
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
                                        data={this.state.cityAreaData}
                                        title="选择地区"
                                        extra="请选择您所在的省市区"
                                        value={this.state.consigneeCityValue}
                                        onChange={this.pickerConsigneeChangeHandle.bind(this)}
                                        format={(values) => { return values.join(' '); }}
                                     >
                                        <List.Item arrow="horizontal" onClick={this.onCitykHandle.bind(this)} className={cityExtraCls}>收货地区</List.Item>
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

                                {getFieldDecorator('consigneepostcode',{
                                    initialValue: this.state.consigneepostcode,
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
                                        onChange={this.stateChangeHandle.bind(this, 'consigneepostcode')}
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
                        <KYPayMethod price={_state.groupItem ? _state.groupItem.salePrice : '0'} defaultPayType={_state.payType} changePayType={this.changePayTypeHandle.bind(this)}/>
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

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        RegModel: state.RegModel
    };
}

export default connect(
    mapStateToProps
)(RegOrderViewWrapper);
