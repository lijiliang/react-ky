/**
 * @fileOverview 基本信息
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
 import '../resources/BasicInfoView.less';

 import Avatar from '../resources/img/avatar-big.png'

 // 省市区数据
 const cityAreaData = Cache.getObj(Cache.keys.ky_cache_cityArea) || [];
 class BasicInfoView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             cityAreaData: cityAreaData,
             cityExtra: true,
             cityValue: ['8','60','619'],
             addrDetail: '林和西路9号耀中广场918号林和西路9号耀中广场918号',
             addrPostcode: '432222',
             chatNumber: '13599699696',
             phoneNumber: '13594949946',
             email: '23456532@qq.com',
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
                 const fieldNames = ['cityValue', 'addrDetail', 'addrPostcode', 'chatNumber', 'phoneNumber', 'email'].reverse();
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

        const basicFormCls = classNames({
            ['m-basic-form']: true,
            ['m-basic-diablad']: !this.state.isEdit
        })
         const cityExtraCls = classNames({
             ['picker-city']: true,
             ['picker-city-active']: this.state.cityExtra
         })
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable-white">
                     <div className="m-basic">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >基本信息</NavBar>
                         <div className="m-basic-view">
                             <div className="account-info">
                                 <div className="account-thumb">
                                     <img src={Avatar} alt=""/>
                                     <div className="modify">点此修改头像</div>
                                 </div>
                                 <div className="account-name">
                                     <p className="tit">姓名</p>
                                     <p className="name">丛征</p>
                                 </div>
                             </div>
                             <div className={basicFormCls}>
                                 {
                                     !this.state.isEdit ? <div className="basic-mask"></div> : null
                                 }
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
                                         <List.Item onClick={this.onCitykHandle.bind(this)} className={cityExtraCls}>所在地</List.Item>
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
                                         labelNumber={5}
                                         autoHeight
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
                                         labelNumber={5}
                                         placeholder="请输入6个数字的邮政编码"
                                         maxLength={6}
                                         type="number"
                                         style={{border:'none'}}
                                         onChange={this.stateChangeHandle.bind(this, 'addrPostcode')}
                                     >邮政编码</InputItem>
                                 )}
                                 {getFieldDecorator('chatNumber', {
                                     initialValue: this.state.chatNumber,
                                     rules: [{
                                         pattern: RegxRule.phone,
                                         message: '请输入正确的手机号'
                                     },{
                                         required: true,
                                         message: '请输入您的手机号'
                                     }],
                                   })(
                                     <InputItem
                                         labelNumber={5}
                                         placeholder="请输入您的微信号"
                                         onChange={this.stateChangeHandle.bind(this, 'chatNumber')}
                                     >微信号</InputItem>
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
                                         labelNumber={5}
                                         type="number"
                                         placeholder="请输入您的手机号"
                                         onChange={this.stateChangeHandle.bind(this, 'phoneNumber')}
                                         maxLength={11}
                                     >手机号</InputItem>
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
                                         labelNumber={5}
                                         placeholder="请输入有效的邮箱地址"
                                         onChange={this.stateChangeHandle.bind(this, 'email')}
                                     >邮箱地址</InputItem>
                                 )}
                             </div>
                             {
                                 !this.state.isEdit ? <div className="basic-edit">
                                     <span className="edit-btn" onClick={this.onEditHandle}>编辑</span>
                                 </div> : ''
                             }

                         </div>
                     </div>
                 </div>
                 {
                     this.state.isEdit ? <div className="m-foot-fixed">
                         <Button title="提交" type="submit" onClick={this.submitHandle} across/>
                     </div> : ''
                 }
             </div>
         );
     }
 }

 const BasicInfoViewWrapper = createForm()(BasicInfoView);
 export default BasicInfoViewWrapper;
