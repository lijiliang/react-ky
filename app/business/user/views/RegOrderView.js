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
            firstName: 'firstName',
            cityValue: ["5", "22", "32"],    //省市区数据
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
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }
    render(){
        console.log(this.state)
        const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;

        const cityExtraCls = classNames({
            ['picker-city']: true,
            ['picker-city-active']: this.state.cityExtra
        })
        return(
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

                           <Picker
                               data={district}
                               title="选择地区"
                               extra="请选择您所在的省市区"
                               {...getFieldProps('cityValue', {
                                    initialValue: this.state.cityValue,
                                })}
                               value={this.state.cityValue}
                               onChange={this.pickerChangeHandle.bind(this)}
                               format={(values) => { return values.join(' '); }}
                               onOk={e => console.log('ok', e)}
                               onDismiss={e => console.log('dismiss', e)}
                            >
                               <List.Item className={cityExtraCls}>收货地区</List.Item>
                           </Picker>

                           <TextareaItem
                               title="详细地址"
                               placeholder="请输入您的所在地址，产品将会寄住此处"
                               labelNumber={5}
                               rows={2}
                           />

                           {getFieldDecorator('zipCode')(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入6个数字的邮政编码"
                                   style={{border:'none'}}
                                   onChange={this.stateChangeHandle.bind(this, 'zipCode')}
                               >邮政编码</InputItem>
                           )}
                           {getFieldDecorator('phone')(
                               <InputItem
                                   labelNumber={5}
                                   type="number"
                                   placeholder="请输入您的手机号"
                                   onChange={this.stateChangeHandle.bind(this, 'phone')}
                               >手机号</InputItem>
                           )}
                           {getFieldDecorator('firstName', {
                               initialValue: this.state.firstName,
                               rules: [{
                                   required: true,
                                   message: '请输入您的姓氏'
                               }],
                             })(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入您的姓氏"
                                   onChange={this.stateChangeHandle.bind(this, 'firstName')}
                               >推荐人编号</InputItem>
                            )}
                            {getFieldDecorator('firstName', {
                                initialValue: this.state.firstName,
                                rules: [{
                                    required: true,
                                    message: '请输入您的姓氏'
                                }],
                              })(
                                <InputItem
                                    labelNumber={5}
                                    placeholder="请输入您的姓氏"
                                    onChange={this.stateChangeHandle.bind(this, 'firstName')}
                                >确认推荐人</InputItem>
                             )}
                             {getFieldDecorator('idCard')(
                                 <InputItem
                                     labelNumber={5}
                                     placeholder="请输入您的身份证号码"
                                     onChange={this.stateChangeHandle.bind(this, 'idCard')}
                                 >身份证号码</InputItem>
                             )}
                            {getFieldDecorator('telephone')(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入您的固定电话"
                                   onChange={this.stateChangeHandle.bind(this, 'telephone')}
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
                           {getFieldDecorator('firstName', {
                               initialValue: this.state.firstName,
                               rules: [{
                                   required: true,
                                   message: '请输入您的姓氏'
                               }],
                             })(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入您的姓氏"
                                   onChange={this.stateChangeHandle.bind(this, 'firstName')}
                               >收货人姓名</InputItem>
                            )}
                           <Picker
                               data={district}
                               title="选择地区"
                               extra="请选择您所在的省市区"
                               {...getFieldProps('cityValue', {
                                    initialValue: this.state.cityValue,
                                })}
                               value={this.state.cityValue}
                               onChange={this.pickerChangeHandle.bind(this)}
                               format={(values) => { return values.join(' '); }}
                               onOk={e => console.log('ok', e)}
                               onDismiss={e => console.log('dismiss', e)}
                            >
                               <List.Item className={cityExtraCls}>收货地区</List.Item>
                           </Picker>

                           <TextareaItem
                               title="详细地址"
                               placeholder="请输入您的所在地址，产品将会寄住此处"
                               labelNumber={5}
                               rows={2}
                           />

                           {getFieldDecorator('zipCode')(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入6个数字的邮政编码"
                                   style={{border:'none'}}
                                   onChange={this.stateChangeHandle.bind(this, 'zipCode')}
                               >邮政编码</InputItem>
                           )}
                           {getFieldDecorator('phone')(
                               <InputItem
                                   labelNumber={5}
                                   type="number"
                                   placeholder="请输入您的手机号"
                                   onChange={this.stateChangeHandle.bind(this, 'phone')}
                               >手机号</InputItem>
                           )}
                           {getFieldDecorator('firstName', {
                               initialValue: this.state.firstName,
                               rules: [{
                                   required: true,
                                   message: '请输入您的姓氏'
                               }],
                             })(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入您的姓氏"
                                   onChange={this.stateChangeHandle.bind(this, 'firstName')}
                               >安置人编号</InputItem>
                            )}
                            {getFieldDecorator('telephone')(
                               <InputItem
                                   labelNumber={5}
                                   placeholder="请输入您的固定电话"
                                   onChange={this.stateChangeHandle.bind(this, 'telephone')}
                               >固定电话</InputItem>
                            )}
                       </div>
                   </div>
                    <KYPayMethod price="10,888.00"/>
                   <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                </div>
            </div>
        );
    }
}
const RegOrderViewWrapper = createForm()(RegOrderView);
export default RegOrderViewWrapper;
