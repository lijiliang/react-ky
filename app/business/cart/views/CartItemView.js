/**
 * @fileOverview 购物车商品单项
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Stepper } from 'uxComponent';

import '../resources/CartItemView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showNumber: 2
        };
        this.handleChange = this.handleChange.bind(this);
        this.delectItemHandle = this.delectItemHandle.bind(this);
    }
    componentDidMount(){

    }
    onChange = (val) => {
        // console.log(val);
        this.setState({ showNumber: val });
    }

    //处理单选框的变化事件
    handleChange(e) {
        //修改那个任务，修改的值是什么
        this.props.changeStatus(this.props.index, e.target.checked);
    }

    // 删除某一项
    delectItemHandle(){
        this.props.deleteItem(this.props.index);
    }

    render(){
        const { ListItem } = this.props;
        const cartItemCls = classNames({
            [`cart-item`]: true,
            [`cart-item-active`]: ListItem.isChecked,
        });
        const radioItemCls = classNames({
            [`icon`]: true,
            [`icon-radio`]: true,
            [`icon-selectFill`]: ListItem.isChecked,
        });
        // console.log(this.props)
        return(
            <div className="cart-item">
                <div className="item-header">
                    <div className="header-name">
                        <label>
                            <div className="pack-radio">
                                <input type="checkbox" value={ListItem.text} checked={ListItem.isChecked} onChange={this.handleChange}/>
                                <i className={radioItemCls}></i>
                            </div>
                        </label>
                        <span className="name">{ListItem.text}</span>
                    </div>
                    <div className="header-price">
                        <span>合计 <i className="price">￥4,200.00</i></span>
                        <i className="icon icon-cancel" onClick={this.delectItemHandle}></i>
                    </div>
                </div>
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
                        <div className="info-subtotal">
                            <span>会员价</span>
                            <span className="price">￥420.00</span>
                        </div>
                        <div className="info-foot">
                            <Stepper
                                showNumber
                                min={1}
                                max={500}
                                value={this.state.showNumber}
                                onChange={this.onChange}
                            />
                            <span className="isstock">有货</span>
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
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
