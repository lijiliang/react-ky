/**
 * @fileOverview 订单列表
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import classNames from 'classnames';
import { GetOrderList } from '../action/DataAction';
 //组件
 import { Urls, RegxRule, Cache, AddressData } from 'kyCommon';
 import { Toast, NavBar, Loading} from 'uxComponent';
 import { KYLoadMore } from 'kyComponent';
 import '../resources/OrderView.less';

// 列表单个子项
import OrderItemView from './OrderItemView';

 class OrderView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             pageNum: 1, // 当前第几页
             pageSize: 10,// 一个多少条数据
             pageNext: 2, // 下一页的页码
             orderListData: [],   // 存储列表信息
             hasMore: false, // 记录当前状态下，还有没有更多的数据可供加载
             isLoadingMore: false, // 记录当前状态下，是“加载中...”还是“点击加载更多”
             total: '' //总数
         };
     }
     componentDidMount(){
         // 获取第一页数据
         this.resultHandle(this.state.pageSize, 1);
     }
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 加载更多数据
     loadMoreData(){
         // 记录状态
         this.setState({
             isLoadingMore: true
         });
         const pageNext = this.state.pageNext; // 下一页页码
         this.resultHandle(this.state.pageSize, pageNext);
         // 添加 page 计数
         this.setState({
             pageNext: pageNext + 1,
             isLoadingMore: false
         });
     }
     //数据处理
     resultHandle(pageSize, page){
         // 获取不同的状态
         let _id;
         if(this.props.params.id){
             _id = this.props.params.id;
         }else{
             _id = '0';
         }
         this.props.dispatch(GetOrderList(pageSize, page, _id, (res) => {
             if(!res.isLastPage){
                 this.setState({
                     orderListData: this.state.orderListData.concat(res.data),
                     total: res.total,
                     hasMore: true,
                 });
             }else{
                 this.setState({
                     orderListData: this.state.orderListData.concat(res.data),
                     total: res.total,
                     hasMore: false
                 });
             }
         }));
     }
     render(){
         const _state = this.state;

         // 列表数据
         let orderLayout;
         if(_state.total === '0'){
             orderLayout = <div className="loading-container"><p className="ky-center">暂无订单数据</p></div>;
         }else if(_state.orderListData.length && _state.total > '0'){
             orderLayout = <OrderItemView orderList={_state.orderListData}/>;
         }else{
             orderLayout = <div className="loading-container"><Loading size="large"/></div>;
         }

         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-order">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >全部订单</NavBar>
                         <div className="m-order-view">
                             {orderLayout}
                             {/* {
                                 _state.orderListData.length
                                 ? <OrderItemView orderList={_state.orderListData}/>
                                 : <div className="loading-container"><Loading size="large"/></div>
                             } */}
                             {
                                 _state.hasMore
                                 ? <KYLoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                                 : <div></div>
                             }
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
 )(OrderView);
