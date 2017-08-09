/**
 * @fileOverview 订单详情
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { get, getPublic } from 'kyBase/common/FetchData';
 import { createForm } from 'rc-form';
 import classNames from 'classnames';
 import CopyToClipboard from 'react-copy-to-clipboard';

 //组件
 import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
 import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List} from 'uxComponent';
 const Item = List.Item;
 const Brief = Item.Brief;
 import '../resources/OrderDetailsView.less';

 class AddressView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             isEdit: false,  // 是否可编辑
         };
     }
     componentDidMount(){}
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 点击编辑
     onEditHandle = () => {
         this.setState({
             isEdit: true
         })
     }
     // 复制单号
     copyTextHandle = (text, result) => {
         if(result){
             Toast.success('复制单号成功！', 1);
         }else{
             Toast.fail('不能复制单号，请手动填写！', 1);
         }
     }
     render(){
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-orderdetail">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >子订单信息</NavBar>
                         <div className="m-orderdetail-view">
                             <div className="detail-item">
                                 <div className="orderdetail-head">包裹信息</div>
                                 <div className="orderdetail-body">
                                     <div className="list">
                                         <div className="item">
                                             <div className="name">物流公司</div>
                                             <div className="info">顺丰快递</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">物流单号</div>
                                             <div className="info">
                                                 <span className="order-no">0000000000000000</span>
                                                 <CopyToClipboard text='asdfghjklkjhgf' onCopy={this.copyTextHandle.bind(this)}>
                                                     <span className="copy">复制单号</span>
                                                </CopyToClipboard>
                                             </div>
                                         </div>
                                         <div className="gobtn">快递100官网查询</div>
                                     </div>
                                 </div>
                             </div>
                             <div className="detail-item">
                                 <div className="orderdetail-head">收货人信息</div>
                                 <div className="orderdetail-body">
                                     <div className="list">
                                         <div className="item">
                                             <div className="name">收货人</div>
                                             <div className="info">李生</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">手机号</div>
                                             <div className="info">13500303033</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">收货地址</div>
                                             <div className="info">江苏省泰州市江阴区曲伟胜祥6955号</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">邮政编码</div>
                                             <div className="info">655555</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">固定电话</div>
                                             <div className="info">020-7896787898</div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="detail-item">
                                 <div className="orderdetail-head">送货清单</div>
                                 <div className="order-list-body">
                                     <List small>
                                         <Item extra={'87654345678765435678'} className="orderno">订单编号</Item>
                                         <Item extra={'快递'}>配送方式</Item>
                                         <Item extra={'在线支付'}>支付方式</Item>
                                         <Item extra={'10'}>商品数量</Item>
                                         <Item>商品清单</Item>
                                     </List>
                                     <div className="suborder-box">
                                         <div className="item-content">
                                             <div className="thumb">
                                                 <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                             </div>
                                             <div className="info">
                                                 <div className="info-item">
                                                     <div className="name name-tit">新乐思新乐新乐思新乐</div>
                                                     <div className="number">数量</div>
                                                 </div>
                                                 <div className="info-item">
                                                     <div className="name">
                                                         <p>蓝莓复合果汁饮品(便利装) 900毫升 (30袋)</p>
                                                     </div>
                                                 </div>
                                                 <div className="info-item info-price">
                                                     <div className="name">
                                                         <p>原价&nbsp;&nbsp;&nbsp;<span className="name-price">¥460.00</span></p>
                                                     </div>
                                                 </div>
                                                 <div className="info-item info-price">
                                                     <div className="name">
                                                         <p>会员价<span className="name-price">¥460.00</span></p>
                                                     </div>
                                                     <div className="number">x 4</div>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="item-content">
                                             <div className="thumb">
                                                 <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                             </div>
                                             <div className="info">
                                                 <div className="info-item">
                                                     <div className="name name-tit">新乐思新新乐思新新乐思新乐新乐思新乐</div>
                                                     <div className="number">数量</div>
                                                 </div>
                                                 <div className="info-item">
                                                     <div className="name">
                                                         <p>蓝莓复合果汁饮品(便利装) 900毫升 (30袋)</p>
                                                     </div>
                                                 </div>
                                                 <div className="info-item info-price">
                                                     <div className="name">
                                                         <p>原价&nbsp;&nbsp;&nbsp;<span className="name-price">¥460.00</span></p>
                                                     </div>
                                                 </div>
                                                 <div className="info-item info-price">
                                                     <div className="name">
                                                         <p>会员价<span className="name-price">¥460.00</span></p>
                                                     </div>
                                                     <div className="number">12</div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                     <List small>
                                         <Item extra={'￥21,400.00'}>会员价总额</Item>
                                         <Item extra={'￥21,400.00'}>销售价总额</Item>
                                         <Item extra={'￥0.00'}>进口关税</Item>
                                         <Item extra={'-￥21,400.00'}>总优惠</Item>
                                         <Item extra={'￥0.00'}>运费</Item>
                                         <Item extra={'525'} className="m-quota">总积分</Item>
                                     </List>
                                 </div>
                             </div>
                            <div className="paymethod-price">已付金额：<span class="price">￥10,888.00</span></div>
                         </div>
                     </div>
                 </div>
             </div>
         );
     }
 }

 export default AddressView;
