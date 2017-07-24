/**
 * @fileOverview 管理收货地址
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
 import '../resources/AddressView.less';

 import Avatar from '../resources/img/avatar-big.png'

 // 省市区数据
 const cityAreaData = Cache.getObj(Cache.keys.ky_cache_cityArea) || [];
 class AddressView extends React.Component {
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
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable-white">
                     <div className="m-address">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >管理收货地址</NavBar>
                         <div className="m-address-view">
                             sdaS
                         </div>
                     </div>
                 </div>
                 <div className="m-foot-fixed">
                     <Button title="新增收货地址" type="submit" onClick={this.submitHandle} across/>
                 </div>
             </div>
         );
     }
 }

 export default AddressView;
