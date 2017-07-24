/**
 * @fileOverview 订单列表
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { get, getPublic } from 'kyBase/common/FetchData';
 import classNames from 'classnames';

 //组件
 import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
 import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List, Modal} from 'uxComponent';
 import '../resources/OrderView.less';


 class OrderView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             modal: false, // 弹出层是否显示
             value: 'c',   // 取消订单的原因
         };
     }
     componentDidMount(){}
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
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
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-order">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >全部订单</NavBar>
                         <div className="m-order-view">
                             <div className="order-item">
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
                                     <a href="javascript:;" className="status-btn" onClick={this.showModal('modal')}>取消订单</a>
                                     <a href="" className="status-btn btn-pay">去付款</a>
                                     {/* <a href="" className="status-btn">申请退款</a>
                                     <a href="" className="status-btn btn-order">查看订单</a>
                                     <a href="" className="status-btn">确认收货</a> */}
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
                                 </div>
                             </div>
                             <div className="order-item">
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
                                     {/* <a href="" className="status-btn">申请退款</a>
                                     <a href="" className="status-btn btn-order">查看订单</a>
                                     <a href="" className="status-btn">确认收货</a> */}
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
                             </div>

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
                     </div>
                 </div>
             </div>
         );
     }
 }

 export default OrderView;
