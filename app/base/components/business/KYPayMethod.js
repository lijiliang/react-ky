/**
 * @fileOverview 支付方式
 * <KYPayMethod price={_state.actualPrice} defaultPayType={_state.payType} changePayType={this.changePayTypeHandle.bind(this)}/>
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import classNames from 'classnames';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import './KYPayMethod.less';

import payvisacard from 'kyBase/resources/images/payvisacard.png';
import payeco from 'kyBase/resources/images/payeco.png';
export default class KYPayMethod extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-paymethod',
    }
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            payType: ''  // 支付类型
        };
    }
    componentDidMount(){
        this.setState({
            payType: this.props.defaultPayType
        })
    }
    handleChanges(event) {
        this.setState({payType: event.target.value});
        this.props.changePayType(event.target.value);
    }
    render(){
        const { prefixCls, price} = this.props;
        const payList = [
            {
                payType: '29',
                name: '易联支付',
                imgUrl: payeco
            },{
                payType: '27', //payeezy
                name: '信用卡支付',
                imgUrl: payvisacard
            },
        ]
        return(
            <div className={prefixCls}>
                <div className={`${prefixCls}-tit`}>支付方式</div>
                <div className={`${prefixCls}-body`}>
                    {
                        payList.map((item) => {
                            return(
                                <div className="pay-item">
                                    <div className="sel-pay">
                                        <label>
                                            <div className="select-radio">
                                                <input type="radio" value={item.payType} checked={this.state.payType === item.payType} onChange={this.handleChanges.bind(this)}/>
                                                <i className={this.state.payType === item.payType ? 'icon icon-selectFill' : 'icon icon-radio'}></i>
                                          </div>
                                          <span className="name">{item.name}</span>
                                      </label>
                                    </div>
                                    <div className="pay-list">
                                        <img src={item.imgUrl}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`${prefixCls}-foot`}>
                    应付金额<span className="price">￥{price}</span>
                </div>
            </div>
        );
    }
}

KYPayMethod.PropTypes = {
    price: PropTypes.string.isRequired,  // 价格
    defaultPayType: PropTypes.string.isRequired, // 默认支付类型
    changePayType: PropTypes.func.isRequired, // 选择支付类型
}
