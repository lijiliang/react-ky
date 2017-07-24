/**
 * @fileOverview 订单列表
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
 import '../resources/OrderView.less';


 class AddressView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
         };
     }
     componentDidMount(){}
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     render(){
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable-white">
                     <div className="m-order">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >全部订单</NavBar>
                         <div className="m-order-view">
                             sdaS
                         </div>
                     </div>
                 </div>
             </div>
         );
     }
 }

 export default AddressView;
