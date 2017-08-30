/**
 * @fileOverview 管理收货地址
 */
 import React from 'react';
 import { Link, hashHistory } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { get, getPublic } from 'kyBase/common/FetchData';
 import classNames from 'classnames';
 import { connect } from 'react-redux';
 import { getShipAddress, DeleteShipAddress, DefaultShipAddress } from '../action/DataAction'

 //组件
 import { Button, Toast, NavBar, Modal, Result} from 'uxComponent';
 import '../resources/AddressView.less';

 class AddressView extends React.Component {
     constructor(props, context){
         super(props, context);
         this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
         this.state = {
             addressData: []
         };
     }
     componentDidMount(){
         this._getShipAddress();
     }
     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }
     // 设为默认地址
     radioChange(item, id){
         const _data = {
              addrPrivonce: item.addrPrivonce,// 省id
              addrCity: item.addrCity,   //城市id
              addrCounty: item.addrCounty, // 县/区ID
              addrDetail: item.addrDetail,
              consignee: item.consignee,
              default: true,
              idCard: item.idCard,
              phoneNumber: item.phoneNumber,
              postcode: item.postcode,
              telNumber: item.telNumber,
              id: item.id
         }
         this.props.dispatch(DefaultShipAddress(_data, (res) => {
            //  this._getShipAddress();
             this.state.addressData.forEach((address, index) => {
                 if(address.id === id) {
                     address.default = true;
                     this.setState({
                         random: Math.random()
                     });
                 } else {
                     address.default = false;
                     this.setState({
                         random: Math.random()
                     });
                 }
             });
         }))
     }
     // 删除
     onDeleteHandle(index, id){
        //  this.state.addressData.splice(index, 1);
        //  this.setState({
        //      random: Math.random()
        //  });
        this.props.dispatch(DeleteShipAddress(id, (res) => {
            Toast.success('删除成功！');
            setTimeout(() => {
                this._getShipAddress();
            }, 1000);
        }));
     }
     onEditHandle(id){
         hashHistory.push(`/user/addredit/${id}`)
     }
     // 新增收货地址
     submitHandle = () => {
         hashHistory.push('/user/addredit')
     }
     // 获取地址列表
     _getShipAddress(){
         this.props.dispatch(getShipAddress((res) => {
             this.setState({
                 addressData: res
             })
         }));
     }
     render(){
        //  console.log(this.state)
         return(
             <div className="ky-container-body">
                 <div className="ky-scrollable">
                     <div className="m-address">
                         <NavBar
                             onLeftClick={this.gohistoryHandle.bind(this)}
                             mode="blue"
                             >管理收货地址</NavBar>
                         <div className="m-address-view">
                             {
                                 this.state.addressData.map((item, index) => {
                                     const addressCls = classNames({
                                         [`address-item`]: true,
                                         [`address-item-active`]: item.default
                                     })
                                     const iconCls = classNames({
                                         [`icon`]: true,
                                         [`icon-radio`]: !item.default,
                                         [`icon-selectFill`]: item.default
                                     })
                                     return (
                                         <div className={addressCls}>
                                             <div className="address-border"></div>
                                             <div className="address-body">
                                                 <div className="item">
                                                     <div className="name">收货人</div>
                                                     <div className="info">{item.consignee}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">手机号</div>
                                                     <div className="info">{item.phoneNumber}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">身份证号码</div>
                                                     <div className="info">{item.idCard}</div>
                                                 </div>
                                                 <div className="item">
                                                     <div className="name">收货地址</div>
                                                     <div className="info">{item.addrPrivonceName}{item.addrCityName}{item.addrCountyName}{item.addrDetail}</div>
                                                 </div>
                                             </div>
                                             <div className="address-foot">
                                                <div className="select">
                                                    <label>
                                                        <div className="select-radio">
                                                            <input type="radio" value={item.default} checked={item.default} onChange={this.radioChange.bind(this, item, item.id)}/>
                                                            <i className={iconCls}></i>
                                                      </div>
                                                      <span className="name">{item.default ? '默认地址' : '设为默认'}</span>
                                                  </label>
                                                </div>
                                                <div className="edit-btn">
                                                    <a href="javascript:;" className="btn" onClick={this.onEditHandle.bind(this, item.id)}>编辑</a>
                                                    <a href="javascript:;"
                                                        onClick={() => Modal.alert('删除', '确定删除么?', [
                                                          { text: '取消'},
                                                          { text: '确定', onPress: this.onDeleteHandle.bind(this, index, item.id) },
                                                        ])}
                                                        className="btn">删除</a>
                                                </div>
                                             </div>
                                         </div>
                                     );
                                 })
                             }
                         </div>
                         {
                             this.state.addressData.length <= 0 ? <div className="loading-container">
                                 <Result
                                    img={<i className="icon icon-paymentDone"></i>}
                                    message="您还没有添加收货地址哦，赶紧添加一个吧"
                                  />
                              </div>
                             : null
                         }
                     </div>
                 </div>
                 <div className="m-foot-fixed">
                     <Button title="新增收货地址" type="submit" onClick={this.submitHandle} across/>
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
 )(AddressView);
