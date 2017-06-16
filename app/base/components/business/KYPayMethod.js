/**
 * @fileOverview 支付方式
 */
 import React from 'react';
 import classNames from 'classnames';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import './KYPayMethod.less';

import visa from 'kyBase/resources/images/visa.png';
import masterCard from 'kyBase/resources/images/masterCard.png';
export default class KYPayMethod extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-paymethod',
    }
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){

    }
    render(){
        const { prefixCls, price} = this.props;
        return(
            <div className={prefixCls}>
                <div className={`${prefixCls}-tit`}>支付方式</div>
                <div className={`${prefixCls}-body`}>
                    <div className="sel-pay">
                        <i className="icon-bg"></i>
                        <span>信用卡支付</span>
                    </div>
                    <div className="pay-list">
                        <img src={visa}/>
                        <img src={masterCard}/>
                    </div>
                </div>
                <div className={`${prefixCls}-foot`}>
                    应付金额<span className="price">￥{price}</span>
                </div>
            </div>
        );
    }
}
