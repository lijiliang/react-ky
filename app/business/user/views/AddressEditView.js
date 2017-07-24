/**
 * @fileOverview 管理收货地址 - 新增、编辑
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { get, getPublic } from 'kyBase/common/FetchData';
 import { createForm } from 'rc-form';
 import classNames from 'classnames';

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
             cityAreaData: cityAreaData,
             cityExtra: true,
             userName: '李先生',
             phoneNumber: '13594949946',
             idCard: '4408883434',
             telNumber: '020567890954',
             cityValue: ['8','60','619'],
             addrDetail: '林和西路9号耀中广场918号林和西路9号耀中广场918号',
             addrPostcode: '432222',
             isEdit: false,  // 是否可编辑
         };
     }
     componentDidMount(){}
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
     // 点击编辑
     onEditHandle = () => {
         this.setState({
             isEdit: true
         })
     }
     // 提交
     submitHandle = () => {
         const form = this.props.form;
         form.validateFields((error, value) => {
             if(error){
                 const fieldNames = ['userName', 'phoneNumber', 'idCard', 'telNumber', 'cityValue', 'addrDetail', 'addrPostcode'].reverse();
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
                             >编辑收货地址</NavBar>
                         <div className="m-address-edit-view">
                             <div className="m-addressedit-form">
                                 {getFieldDecorator('userName', {
                                     initialValue: this.state.userName,
                                     rules: [{
                                         required: true,
                                         message: '请输入收货人'
                                     }],
                                   })(
                                     <InputItem
                                         placeholder="请输入收货人"
                                         onChange={this.stateChangeHandle.bind(this, 'userName')}
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
                                         maxLength={6}
                                         type="number"
                                         style={{border:'none'}}
                                         onChange={this.stateChangeHandle.bind(this, 'addrPostcode')}
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
 export default AddressEditViewWrapper;
