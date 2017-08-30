/**
 * @fileOverview 管理收货地址 - 新增、编辑
 */
 import React from 'react';
 import { Link, hashHistory } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { get, getPublic } from 'kyBase/common/FetchData';
 import { createForm } from 'rc-form';
 import classNames from 'classnames';
 import { connect } from 'react-redux';
 import { AddShipAddress, GetIdShipAddress, SaveShipAddress } from '../action/DataAction'

 //组件
 import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
 import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
 import '../resources/AddressEditView.less';

 // 省市区数据
 const cityAreaData = Cache.getObj(Cache.keys.ky_cache_cityArea) || [];
 class AddressEditView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             title: '',
             cityAreaData: cityAreaData,
             cityExtra: true
         };
     }
     componentDidMount(){
         const edit = this.props.params.edit;
         if(edit == null) {
             // 新增
             this.setState({
                 title: '新增收货地址',
                 cityExtra: false,
                 consignee: '',
                 phoneNumber: '',
                 idCard: '',
                 telNumber: '',
                 cityValue: [],
                 addrDetail: '',
                 postcode: '',
                 default: false
             })
         } else {
             // 编辑
             this.props.dispatch(GetIdShipAddress(edit, (res)=>{
                 this.setState({
                     title: '编辑收货地址',
                     consignee: res.consignee,
                     phoneNumber: res.phoneNumber,
                     idCard: res.idCard,
                     telNumber: res.telNumber,
                     cityValue: [res.addrPrivonce, res.addrCity, res.addrCounty],
                     addrDetail: res.addrDetail,
                     postcode: res.postcode,
                     id: res.id,
                     default: res.default
                 })
             }))
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
             if(error){
                 const fieldNames = ['consignee', 'phoneNumber', 'idCard', 'telNumber', 'cityValue', 'addrDetail', 'postcode'].reverse();
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
             const _data = {
                  addrPrivonce: _state.cityValue[0],// 省id
                  addrCity: _state.cityValue[1],   //城市id
                  addrCounty: _state.cityValue[2], // 县/区ID
                  addrDetail: _state.addrDetail,
                  consignee: _state.consignee,
                  default: _state.default,
                  idCard: _state.idCard,
                  phoneNumber: _state.phoneNumber,
                  postcode: _state.postcode,
                  telNumber: _state.telNumber
             }

             const edit = this.props.params.edit;
             if(edit == null){
                 // 新添地址
                 this.props.dispatch(AddShipAddress(_data, (res) => {
                     Toast.success('添加地址成功！');
                     setTimeout(() => {
                         hashHistory.push('/user/address');
                     }, 1000);
                 }))
             }else{
                 // 编辑地址
                 const _id = {
                     id: _state.id
                 }
                 let saveData = Object.assign(_data, _id)
                 this.props.dispatch(SaveShipAddress(saveData, (res) => {
                    Toast.success('编辑地址成功！');
                    setTimeout(() => {
                        hashHistory.push('/user/address');
                    }, 1000);
                 }))
             }
         })
     }
     render(){
         const { getFieldDecorator} = this.props.form;

         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.cityExtra
         })
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable-white">
                     <div className="m-address-edit">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >{this.state.title}</NavBar>
                         <div className="m-address-edit-view">
                             <div className="m-addressedit-form">
                                 {getFieldDecorator('consignee', {
                                     initialValue: this.state.consignee,
                                     rules: [{
                                         required: true,
                                         message: '请输入收货人'
                                     }],
                                   })(
                                     <InputItem
                                         placeholder="请输入收货人"
                                         onChange={this.stateChangeHandle.bind(this, 'consignee')}
                                     >收货人</InputItem>
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
                                         placeholder="请输入您的详细地址"
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
                                 <span></span>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="m-foot-fixed">
                     <Button title="提交" type="submit" onClick={this.submitHandle} across/>
                 </div>
             </div>
         );
     }
 }

 const AddressEditViewWrapper = createForm()(AddressEditView);

 /*  React 与  Redux 绑定 */
 function mapStateToProps(state){
     return {
     };
 }

 export default connect(
     mapStateToProps
 )(AddressEditViewWrapper);
