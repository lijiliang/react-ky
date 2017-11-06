/**
 * @fileOverview 订单列表 单项
 */
 import React from 'react';
 import { Link, hashHistory } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import classNames from 'classnames';
import { GetOrderList, payAgainBtn } from '../action/DataAction';
// import { getPayAgain } from 'kyBus/pay/action/DataAction';

 //组件
 import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
 import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List, Modal} from 'uxComponent';
 import '../resources/OrderView.less';


 class OrderItemView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             modal: false, // 弹出层是否显示
             value: 'c',   // 取消订单的原因
         };
     }
     componentDidMount(){

     }
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 去付款
     goPayHandle(tradeNo, tradePrice){
         this.props.dispatch(payAgainBtn(tradeNo, tradePrice, (res) => {
             console.log(tradeNo, tradePrice)
             hashHistory.push('/pay/types');  // 跳到选择支付方式页面
         }));
     }
     // 打开弹出层
     showModal = key => (e) => {
         e.preventDefault();
         this.setState({
             [key]: true,
         });
     }
     // 关闭弹出层
     onClose = key => () => {
         this.setState({
            [key]: false,
         });
     }
     reasonChange = () => {
         this.setState({value: event.target.value});
     }
     render(){
         const data = [
             {value: 'a', label: '现在不想买'},
             {value: 'b', label: '商品价格较贵'},
             {value: 'c', label: '价格波动'},
             {value: 'd', label: '商品缺货'},
             {value: 'e', label: '重新下单'},
             {value: 'f', label: '添加或删除商品'},
             {value: 'g', label: '收货人信息有误'},
             {value: 'h', label: '送货时间过长'},
             {value: 'i', label: '其它原因'},
         ];
         const { orderList } = this.props;
         return(
             <div className="m-order-item-view">
                 {
                     orderList.map((item, index) => {
                         let orderStatus;
                         switch(item.tradeStatus){
                             case '0':
                                 orderStatus = <div className="order-status">
                                     <a href="javascript:;" className="status-btn" onClick={this.showModal('modal')}>取消订单</a>
                                     <a className="status-btn btn-pay" onClick={this.goPayHandle.bind(this, item.tradeNo, item.tradePrice)}>去付款</a>
                                 </div>
                                 break;
                             case '1':
                                 orderStatus = <div className="order-status">
                                     <a href="" className="status-btn">已支付</a>
                                     <a href="" className="status-btn">申请退款</a>
                                 </div>
                                 break;
                            case '2':
                                orderStatus = <div className="order-status">
                                    <a href="" className="status-btn">已发货</a>
                                </div>
                                break;
                            case '3':
                                orderStatus = <div className="order-status">
                                    <a href="" className="status-btn">已完成</a>
                                </div>
                                break;
                            case '4':
                                orderStatus = <div className="order-status">
                                    <a href="" className="status-btn">已取消</a>
                                </div>
                                break;
                            default:
                                orderStatus = <div></div>
                         }
                         return(
                             <div className="order-item">
                                 <div className="order-header">
                                     <div className="orderno">
                                        <p>主订单编号：{item.tradeNo}</p>
                                        <p><span>下单时间：{item.createTime}</span><span>收货人：{item.consignee}</span></p>
                                     </div>
                                     <div className="lump-sum">
                                        <p className="name">订单总额</p>
                                        <p className="price">￥{item.tradePrice}</p>
                                     </div>
                                 </div>
                                 {orderStatus}
                                 {/* <div className="order-status">
                                     <a href="javascript:;" className="status-btn" onClick={this.showModal('modal')}>取消订单</a>
                                     <a href="" className="status-btn btn-pay">去付款</a>
                                     <a href="" className="status-btn">申请退款</a>
                                     <a href="" className="status-btn btn-order">查看订单</a>
                                     <a href="" className="status-btn">确认收货</a>
                                 </div> */}
                                 <div className="order-body">
                                     {
                                         item.orderList.map((subitem, subindex) => {
                                             let statusName;
                                             if(subitem.orderStatus == '0'){
                                                 statusName = '待付款'
                                             }else if(subitem.orderStatus == "1" || subitem.orderStatus == "5" || subitem.orderStatus == "6"){
                                                 statusName = '已付款未发货'
                                             }else if(subitem.orderStatus == "19" || subitem.orderStatus == "20"){
                                                 statusName = '已付款待清关'
                                             }else if(subitem.orderStatus == '21'){
                                                 statusName = '清关中'
                                             }else if(subitem.orderStatus == '22'){
                                                 statusName = '清关失败'
                                             }else if(subitem.orderStatus == '2'){
                                                 statusName = '已发货'
                                             }else if(subitem.orderStatus == '3'){
                                                 statusName = '已完成'
                                             }else if(subitem.orderStatus == '4'){
                                                 statusName = '已取消'
                                             }else if(subitem.orderStatus == '7'){
                                                 statusName = '退货审核中'
                                             }else if(subitem.orderStatus == '8'){
                                                 statusName = '同意退换货'
                                             }else if(subitem.orderStatus == '9'){
                                                 statusName = '拒绝退货'
                                             }else if(subitem.orderStatus == '10'){
                                                 statusName = '待商家收货'
                                             }else if(subitem.orderStatus == '11'){
                                                 statusName = '退货结束'
                                             }else if(subitem.orderStatus == '12'){
                                                 statusName = '已处理待退款'
                                             }else if(subitem.orderStatus == '15'){
                                                 statusName = '退款审核中'
                                             }else if(subitem.orderStatus == '13'){
                                                 statusName = '拒绝退款'
                                             }else if(subitem.orderStatus == '14'){
                                                 statusName = '已提交退货审核'
                                             }else if(subitem.orderStatus == '16'){
                                                 statusName = '商家收货失败'
                                             }else if(subitem.orderStatus == '17'){
                                                 statusName = '已退款'
                                             }else if(subitem.orderStatus == '18'){
                                                 statusName = '退款成功'
                                             }else if(subitem.orderStatus == '23'){
                                                 statusName = '换货审核中'
                                             }else if(subitem.orderStatus == '24'){
                                                 statusName = '拒绝换货'
                                             }else if(subitem.orderStatus == '25'){
                                                 statusName = '换货完成'
                                             }
                                             return(
                                                 <div className="suborder-item">
                                                     <div className="suborder-info">
                                                        <h2>子订单编号: {subitem.orderNo}</h2>
                                                        {
                                                            subitem.items.map((items, indexs) => {
                                                                return(
                                                                    <div className="suborder-content">
                                                                        <div className="thumb">
                                                                            <img src={items.imgPath}/>
                                                                        </div>
                                                                        <div className="content">
                                                                            <p>{items.productName}</p>
                                                                            <p>数量: {items.buyNum}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                     </div>
                                                     <div className="suborder-status">
                                                         <span className="status">{statusName}</span>
                                                         <div className="suborder-btn">
                                                             <a href="" className="status-btn btn-order">查看订单</a>
                                                             {/* <a href="" className="status-btn btn-order">状态码: {subitem.orderStatus}</a> */}
                                                         </div>
                                                     </div>
                                                 </div>
                                             )
                                         })
                                     }
                                 </div>
                             </div>
                         )
                     })
                 }
                 {/* <div className="order-item">
                     <div className="order-header">
                         <div className="orderno">
                            <p>主订单编号：2017182828282817391719</p>
                            <p><span>下单时间：2017-05-11</span><span>收货人：李生</span></p>
                         </div>
                         <div className="lump-sum">
                            <p className="name">订单总额</p>
                            <p className="price">￥1,000</p>
                         </div>
                     </div>
                     <div className="order-status">
                         <a href="" className="status-btn">确认收货</a>
                         <a href="" className="status-btn">申请退款</a>
                         <a href="" className="status-btn btn-order">查看订单</a>
                         <a href="" className="status-btn">确认收货</a>
                     </div>
                     <div className="order-body">
                         <div className="suborder-item">
                             <div className="suborder-info">
                                <h2>子订单编号: 20170511201900730</h2>
                                <div className="suborder-content">
                                    <div className="thumb">
                                        <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                    </div>
                                    <div className="content">
                                        <p>新乐思蓝莓复合果汁饮品(便利装) 900毫升 (30袋)</p>
                                        <p>数量 4</p>
                                    </div>
                                </div>
                                <div className="suborder-content">
                                    <div className="thumb">
                                        <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                    </div>
                                    <div className="content">
                                        <p>新乐思蓝莓复合果汁饮品(便利装) 900毫升 (30袋)</p>
                                        <p>数量 4</p>
                                    </div>
                                </div>
                             </div>
                             <div className="suborder-status">
                                 <span className="status">待付款</span>
                                 <div className="suborder-btn">
                                     <a href="" className="status-btn btn-order">查看订单</a>
                                     <a href="" className="status-btn btn-order">查看订单</a>
                                 </div>
                             </div>
                         </div>
                         <div className="suborder-item">
                             <div className="suborder-info">
                                <h2>子订单编号: 20170511201900730</h2>
                                <div className="suborder-content">
                                    <div className="thumb">
                                        <img src="http://fpoimg.com/230x280?text=img" alt=""/>
                                    </div>
                                    <div className="content">
                                        <p>新乐思蓝莓复合果汁饮品(便利装) 900毫升 (30袋)</p>
                                        <p>数量 4</p>
                                    </div>
                                </div>
                             </div>
                             <div className="suborder-status">
                                 <span className="status">待付款</span>
                                 <div className="suborder-btn">
                                     <a href="" className="status-btn btn-order">查看订单</a>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div> */}

                 {/* 弹出层 */}
                 <Modal
                  className="m-order-modal"
                  title="取消订单原因"
                  transparent
                  maskClosable={false}
                  visible={this.state.modal}
                  closable={true}
                  animationType='slide'
                  onClose={()=> {this.onClose('modal')()}}
                  transparent={true}
                  footer={[{ text: '确定取消订单', onPress: () => { console.log('ok'); this.onClose('modal')(); } }]}
                >
                  <div className="reason-list">
                      {
                          data.map((item, index) => {
                              const reasonCls = classNames({
                                  [`reason-radio`]: true,
                                  [`reason-radio-active`]: item.value === this.state.value,
                              })
                              return(
                                  <div className="reason-item">
                                      <label>
                                          <div className={reasonCls}>
                                              <input type="radio" value={item.value} checked={this.state.value} onChange={this.reasonChange}/>
                                              <i className="icon icon-radio"></i>
                                        </div>
                                    </label>
                                    <span className="name">{item.label}</span>
                                 </div>
                              )
                          })
                      }
                  </div>
                </Modal>
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
 )(OrderItemView);
