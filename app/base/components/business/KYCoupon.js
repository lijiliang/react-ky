/**
 * @fileOverview 优惠券
 *  <KYCoupon products={_state.groupId} clickCouponBtn={this.couponBtnHandle.bind(this)} isReg/>
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import classNames from 'classnames';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { conpouVerify } from 'kyBus/common/action/DataAction'

 import './KYCoupon.less';
import { InputItem, Toast, Modal } from 'uxComponent';

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
       this.setCouponData(value, 0)
    }
    conponBtnHandle(){
        const _this = this;
        let _couponCode = this.state.couponCode;
        const { products, isReg } = this.props;
        if(_couponCode.length < 1){
            Toast.info('优惠券码不能为空', 1)
            return
        }
        const _data = {
            code: _couponCode,
            products: products,
            isReg: isReg || false
        }
        this.props.dispatch(conpouVerify(_data, (res) => {
            if (res.success) {
                const _data = res.data || [];
                let tips = []
                let price = 0  // 默认价格为0
                let conpouCode = _data[0].code
                _data.forEach((item) => {
                    if(item.type.indexOf('gift') > -1){
                        tips.push(`免费获得赠品: ${item.giftName}${item.value}件`)
                    }else if(item.type.indexOf('price') > -1){
                        price += parseInt(item.value)
                        tips.push(`订单减免${item.value}元`)
                    }
                })
                // 判断是否有减免的价格，有则设置
                if (price > 0) {
                    this.setCouponData(conpouCode, price)
                } else {
                    this.setCouponData(conpouCode, 0)
                }

                Modal.alert('提示', <div className="message-success">
                    {
                        tips.map((item, index) => {
                            const tipsLen = tips.length
                            const wrapItemCls = classNames({
                                ['item']: tipsLen > 1,
                                ['item-first']: tipsLen == 1,
                            })
                            return (
                                <div key={index} className={wrapItemCls}>
                                    {tipsLen > 1 && <span className="item-no">{index+1}、</span> }
                                    <p>{item}</p>
                                </div>
                            )
                        })
                    }
                </div>, [
                    {
                        text: '确认',
                        onPress: () => {
                            this.setState({
                                couponCode: conpouCode
                            })
                        }
                    },
                ]);
            } else{
                this.setCouponData('', 0)
                Modal.alert('提示', <p className="message-error">{res.message}</p>, [
                    {
                        text: '确认',
                        onPress: () => {
                            this.setState({
                                couponCode: ''
                            })
                        }
                    },
                ]);
            }
        }))
    }
    /**
     * [setCouponData 修改优惠券相关数据]
     * @param {[string]} couponCode  [优惠券码]
     * @param {[number]} discountPrice [优惠金额]
     */
    setCouponData(couponCode, discountPrice){
        this.props.clickCouponBtn(couponCode, discountPrice)
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
                                value={this.state.couponCode}
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

KYCoupon.PropTypes = {
    products: PropTypes.string.isRequired,  // id 如果是数组，需要转成字符串,用,号分割
    clickCouponBtn: PropTypes.func.isRequired, // 点击“使用优惠券”按钮
    isReg: PropTypes.bool, // 是否注册页面
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
