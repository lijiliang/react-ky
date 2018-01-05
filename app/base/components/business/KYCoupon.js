/**
 * @fileOverview 优惠券
 *  <KYCoupon clickCouponBtn={this.couponBtnHandle.bind(this)}/>
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import classNames from 'classnames';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { conpouVerify } from 'kyBus/common/action/DataAction'

 import './KYCoupon.less';
import { InputItem, Toast } from 'uxComponent';

class KYCoupon extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-coupon',
    }
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            couponCode: ''
        };
    }
    componentDidMount(){
    }
    // 设置state
    stateChangeHandle(name, value){
       this.setState({
           [name]: value
       })
    }
    conponBtnHandle(){
        let _couponCode = this.state.couponCode;
        const { products } = this.props;
        if(_couponCode.length < 1){
            Toast.info('优惠券码不能为空', 1)
            return
        }
        const _data = {
            code: _couponCode,
            products: products,
            isReg: false
        }
        this.props.dispatch(conpouVerify(_data, (res) => {
            console.log(res)
        }))
        this.props.clickCouponBtn(_couponCode)
    }
    render(){
        const { prefixCls } = this.props;
        return(
            <div className={prefixCls}>
                <div className="m-item-tit">
                    <div className="tit-content">
                        <h2>优惠券</h2>
                    </div>
                </div>
                <div className="ky-coupon-con">
                    <div className="conpon-info">
                        <p>如果您有优惠券，请在下方输入优惠券码</p>
                        <p>注意：优惠券在您提交订单后将消耗</p>
                    </div>
                    <div className="conpon-code">
                        <div className="conpon-input">
                            <InputItem
                                placeholder="请输入优惠券码"
                                onChange={this.stateChangeHandle.bind(this, 'couponCode')}
                            />
                        </div>
                        <div className="conpon-btn" onClick={this.conponBtnHandle.bind(this)}>
                            <span>使用优惠券码</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// KYCoupon.PropTypes = {
//
// }

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

export default connect(
    mapStateToProps
)(KYCoupon);
