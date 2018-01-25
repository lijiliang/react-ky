/**
 * @fileOverview 订单详情
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import classNames from 'classnames';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import CopyToClipboard from 'react-copy-to-clipboard';
 import { GetOrderDetail } from '../action/DataAction';
 import { markMoney } from 'kyBase/common/Utils';

 //组件
 import { Button, Toast, NavBar, List} from 'uxComponent';
 const Item = List.Item;
 const Brief = Item.Brief;
 import '../resources/OrderDetailsView.less';

 class OrderDetailsView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
         };
     }
     componentDidMount(){
         const orderNo = this.props.params.id;
         this.props.dispatch(GetOrderDetail(orderNo, (res) => {
             this.setState({
                 ...res
             })
         }))
     }
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 复制单号
     copyTextHandle = (text, result) => {
         if(result){
             Toast.success('复制单号成功！', 1);
         }else{
             Toast.fail('复制单号出错，请手动填写！', 1);
         }
     }
     render(){
         const _state = this.state;
         const _shippingInfo = _state.shippingInfo || {};
         const _productList = _state.productList || [];
         const _orderExpressInfo = _state.orderExpressInfo || {}
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-orderdetail">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >子订单信息</NavBar>
                         <div className="m-orderdetail-view">
                             {
                                 _orderExpressInfo.expressName
                                 ?
                                     <div className="detail-item">
                                         <div className="orderdetail-head">包裹信息</div>
                                         <div className="orderdetail-body">
                                             <div className="list">
                                                 <div className="item">
                                                     <div className="name">物流公司</div>
                                                     <div className="info">{_orderExpressInfo.expressName}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">物流单号</div>
                                                     <div className="info">
                                                         <span className="order-no">{_orderExpressInfo.expressNo}</span>
                                                         {/* <CopyToClipboard text='asdfghjklkjhgf' onCopy={this.copyTextHandle.bind(this)}>
                                                             <span className="copy">复制单号</span>
                                                        </CopyToClipboard> */}
                                                     </div>
                                                 </div>
                                                 <a className="gobtn" href={_orderExpressInfo.kuaidi100Url}>快递100官网查询</a>
                                             </div>
                                         </div>
                                     </div>
                                 : null
                             }

                             <div className="detail-item">
                                 <div className="orderdetail-head">收货人信息</div>
                                 <div className="orderdetail-body">
                                     <div className="list">
                                         <div className="item">
                                             <div className="name">收货人</div>
                                             <div className="info">{_shippingInfo.consignee}</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">手机号</div>
                                             <div className="info">{_shippingInfo.phoneNumber}</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">收货地址</div>
                                             <div className="info">{_shippingInfo.addrPrivonce}{_shippingInfo.addrCity}{_shippingInfo.addrCounty}{_shippingInfo.addrDetail}</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">邮政编码</div>
                                             <div className="info">{_shippingInfo.postcode}</div>
                                         </div>
                                         <div className="item">
                                             <div className="name">固定电话</div>
                                             <div className="info">{_shippingInfo.telNumber}</div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="detail-item">
                                 <div className="orderdetail-head">送货清单</div>
                                 <div className="order-list-body">
                                     <List small>
                                         <Item extra={_state.orderCode} className="orderno">订单编号</Item>
                                         <Item extra={_state.deliveryMethod == 0 ? '快递' : ''}>配送方式</Item>
                                         <Item extra={_state.paymentMethod == 1 ? '在线支付' : ''}>支付方式</Item>
                                         <Item extra={_state.productCount}>商品数量</Item>
                                         <Item>商品清单</Item>
                                     </List>
                                     <div className="suborder-box">
                                         {
                                             _productList.map((item, index) => {
                                                 return(
                                                     <div className="item-content">
                                                         <div className="thumb">
                                                             <img src={item.imgPath}/>
                                                         </div>
                                                         <div className="info">
                                                             <div className="info-item">
                                                                 <div className="name name-tit">{item.name}</div>
                                                                 <div className="number">数量</div>
                                                             </div>
                                                             <div className="info-item">
                                                                 <div className="name">
                                                                     <p>{item.name}</p>
                                                                 </div>
                                                             </div>
                                                             <div className="info-item info-price">
                                                                 <div className="name">
                                                                     <p>原价&nbsp;&nbsp;&nbsp;<span className="name-price">¥{item.originalPrice}</span></p>
                                                                 </div>
                                                             </div>
                                                             <div className="info-item info-price">
                                                                 <div className="name">
                                                                     <p>会员价<span className="name-price">¥{item.salePrice}</span></p>
                                                                 </div>
                                                                 <div className="number">x {item.buyNum}</div>
                                                             </div>
                                                         </div>
                                                     </div>
                                                 )
                                             })
                                         }
                                     </div>
                                     <List small>
                                         <Item extra={markMoney(_state.originalPrice)}>会员价总额</Item>
                                         <Item extra={markMoney(_state.actualPrice)}>销售价总额</Item>
                                         <Item extra={markMoney(_state.importTariff)}>进口关税</Item>
                                         <Item extra={'-' + markMoney(_state.preferential)}>总优惠</Item>
                                         <Item extra={markMoney(_state.expressPrice)}>运费</Item>
                                         {/* <Item extra={'525'} className="m-quota">总积分</Item> */}
                                     </List>
                                 </div>
                             </div>
                            <div className="paymethod-price">已付金额：<span class="price">{markMoney(_state.actualPrice)}</span></div>
                         </div>
                     </div>
                 </div>
             </div>
         );
     }
 }

 /*  React 与  Redux 绑定 */
 function mapStateToProps(state){
     return {
     };
 }

 export default connect(
     mapStateToProps
 )(OrderDetailsView);
