/**
 * @fileOverview 取消订单弹出层
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { GetOrderList, payAgainBtn } from '../action/DataAction';

//组件
import { Button, Toast, InputItem, Modal, TextareaItem} from 'uxComponent';
import '../resources/OrderView.less';


 class OrderCancelTypeView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             value: 'c',   // 取消订单的原因
         };
     }
     componentDidMount(){

     }
     reasonChange = () => {
         this.setState({value: event.target.value});
     }
     pressHandle(){
         console.log('sdf')
     }
     otherChangeHandle = () => {
         console.log(event.target.value)
     }
     render(){
         const data = this.props.cancelType;
         console.log(this.props)
         return(
             <div>
                 {/* 弹出层 */}
                 <Modal
                  className="m-order-modal"
                  title="取消订单原因"
                  transparent
                  maskClosable={false}
                  visible={this.props.isVisible}
                  closable={true}
                  animationType='slide'
                  onClose={()=> {this.props.onClose()()}}
                  transparent={true}
                  footer={[{ text: '确定取消订单', onPress: ()=> {this.props.onClose()()} }]}
                >
                  <div className="reason-list">
                      {
                          data.map((item, index) => {
                              const reasonCls = classNames({
                                  [`reason-radio`]: true,
                                  [`reason-radio-active`]: item.value === this.state.value,
                              })
                              console.log(item.value, this.props.value)
                              return(
                                  <div className="reason-item">
                                      <label>
                                          <div className={reasonCls}>
                                              <input type="radio" value={item.value} checked={this.props.value} onChange={this.props.reasonItemChange}/>
                                              <i className="icon icon-radio"></i>
                                        </div>
                                    </label>
                                    <span className="name">{item.label}</span>
                                 </div>
                              )
                          })
                      }
                      <div className="reason-item-other">
                          <TextareaItem placeholder="请输入其它原因" autoHeight rows="2" onChange={this.otherChangeHandle}/>
                      </div>
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
 )(OrderCancelTypeView);
