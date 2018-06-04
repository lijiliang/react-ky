/**
 * @fileOverview 购物车商品单项
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Stepper, Modal } from 'uxComponent';

import '../resources/CartItemView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){

    }

    numItemChangeHandle = (val) => {
        this.props.numItem(this.props.index, val);
    }

    //处理单选框的变化事件
    handleChange = (e) => {
        //修改那个任务，修改的值是什么
        this.props.changeStatus(this.props.index, e.target.checked);
    }

    // 删除某一项
    delectItemHandle = () => {
        this.props.deleteItem(this.props.index);
    }

    render(){
        const { ListItem } = this.props;
        const cartItemCls = classNames({
            [`cart-item`]: true,
            [`cart-item-active`]: ListItem.active,
        });
        const radioItemCls = classNames({
            [`icon`]: true,
            [`icon-radio`]: !ListItem.active,
            [`icon-selectFill`]: ListItem.active,
        });
        if (ListItem.product.groupFlag){
            return(
                <div className="cart-item cart-item-guoups">
                    <div className="item-header">
                        <div className="header-name">
                            <label>
                                <div className="pack-radio">
                                    <input type="checkbox" value={ListItem.text} checked={ListItem.active} onChange={this.handleChange}/>
                                    <i className={radioItemCls}></i>
                                </div>
                            </label>
                            <span className="name">{ListItem.product.name}</span>
                        </div>
                        <div className="header-price">
                            <span>合计 <i className="price">￥{ListItem.totalPrice}</i></span>
                            <i className="icon icon-cancel"
                                onClick={()=>{this.props.deleteItem(this.props.index, ListItem.shoppingCarId)}}
                            ></i>
                        </div>
                    </div>
                    <div className="guoups-item">
                        {
                            ListItem.product.groupItems.map((item, index) => {
                                return(
                                    <div className="item-content">
                                        <div className="thumb">
                                            <img src={item.imgPath}/>
                                        </div>
                                        <div className="info">
                                            <div className="info-item">
                                                <div className="name name-tit">{item.productName}</div>
                                                <div className="number">数量</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="name">
                                                    <p>{item.productName}</p>
                                                    {/* <p>900毫升 (30袋)</p> */}
                                                </div>
                                                <div className="number">x {item.productNum}</div>
                                            </div>
                                            <div className="info-item info-item-member">
                                                <div className="name">
                                                    <span>会员价</span><span className="price">￥{item.salePrice}</span>
                                                </div>
                                                {/* <div className="number">x {item.productNum}</div> */}
                                            </div>
                                            <div className="info-subtotal">
                                                <span>小计&nbsp;&nbsp;</span>
                                                <span className="price">￥{item.productTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/*
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
                                        <p>蓝莓复合果汁饮品(便利装) </p>
                                        <p>900毫升 (30袋)</p>
                                    </div>
                                    <div className="number">12件/套</div>
                                </div>
                                <div className="info-item info-item-member">
                                    <div className="name">
                                        <span>会员价</span><span className="price">￥420.00</span>
                                    </div>
                                    <div className="number">x 1</div>
                                </div>
                                <div className="info-subtotal">
                                    <span>小计&nbsp;&nbsp;</span>
                                    <span className="price">￥420.00</span>
                                </div>
                            </div>
                        </div> */}
                        <div className="info-foot">
                            <Stepper
                                showNumber
                                min={1}
                                max={500}
                                value={ListItem.buyNum}
                                // onChange={this.numItemChangeHandle}
                                onChange={(val)=>{this.props.numItem(this.props.index, val)}}
                            />
                            <span className="isstock">有货</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="cart-item">
                    <div className="item-header">
                        <div className="header-name">
                            <label>
                                <div className="pack-radio">
                                    <input type="checkbox" value={ListItem.text} checked={ListItem.active} onChange={this.handleChange}/>
                                    <i className={radioItemCls}></i>
                                </div>
                            </label>
                            <span className="name">{ListItem.product.name}</span>
                        </div>
                        <div className="header-price">
                            <span>合计 <i className="price">￥{ListItem.totalPrice}</i></span>
                            <i className="icon icon-cancel" onClick={()=>{this.props.deleteItem(this.props.index)}}></i>
                        </div>
                    </div>
                    <div className="item-content">
                        <div className="thumb">
                            <img src={ListItem.product.imgPath}/>
                        </div>
                        <div className="info">
                            <div className="info-item">
                                <div className="name name-tit">{ListItem.product.name}</div>
                                <div className="number">数量</div>
                            </div>
                            <div className="info-item">
                                <div className="name">
                                    <p>{ListItem.product.specName}</p>
                                    {/* <p>900毫升 (30袋)</p> */}
                                </div>
                                {/* <div className="number">12件/套</div> */}
                            </div>
                            <div className="info-subtotal">
                                <span>会员价</span>
                                <span className="price">￥{ListItem.product.salePrice}</span>
                            </div>
                            <div className="info-foot">
                                <Stepper
                                    showNumber
                                    min={1}
                                    max={500}
                                    value={ListItem.buyNum}
                                    // onChange={this.numItemChangeHandle}
                                    onChange={(val)=>{this.props.numItem(this.props.index, val)}}
                                />
                                <span className="isstock">有货</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        // return(
        //     <div className="cart-item">
        //         <div className="item-header">
        //             <div className="header-name">
        //                 <label>
        //                     <div className="pack-radio">
        //                         <input type="checkbox" value={ListItem.text} checked={ListItem.active} onChange={this.handleChange}/>
        //                         <i className={radioItemCls}></i>
        //                     </div>
        //                 </label>
        //                 <span className="name">{ListItem.text}</span>
        //             </div>
        //             <div className="header-price">
        //                 <span>合计 <i className="price">￥4,200.00</i></span>
        //                 <i className="icon icon-cancel" onClick={()=>{this.props.deleteItem(this.props.index)}}></i>
        //             </div>
        //         </div>
        //         <div className="item-content">
        //             <div className="thumb">
        //                 <img src="http://fpoimg.com/230x280?text=img" alt=""/>
        //             </div>
        //             <div className="info">
        //                 <div className="info-item">
        //                     <div className="name name-tit">新乐思新乐新乐思新乐</div>
        //                     <div className="number">数量</div>
        //                 </div>
        //                 <div className="info-item">
        //                     <div className="name">
        //                         <p>蓝莓复合果汁饮品(便利装) </p>
        //                         <p>900毫升 (30袋)</p>
        //                     </div>
        //                     <div className="number">12件/套</div>
        //                 </div>
        //                 <div className="info-subtotal">
        //                     <span>会员价</span>
        //                     <span className="price">￥420.00</span>
        //                 </div>
        //                 <div className="info-foot">
        //                     <Stepper
        //                         showNumber
        //                         min={1}
        //                         max={500}
        //                         value={ListItem.buyNum}
        //                         // onChange={this.numItemChangeHandle}
        //                         onChange={(val)=>{this.props.numItem(this.props.index, val)}}
        //                     />
        //                     <span className="isstock">有货</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
