/**
 * @fileOverview  单品 商品
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { KYGroupProductList } from 'kyComponent';
import { Button, Stepper} from 'uxComponent';
import IndexAddCart from './IndexAddCart';

import '../resources/SubSingleItem.less';

export default class SubGroupItem extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showNumber: 1,
        };
    }
    render(){
        return(
            <div className="sub-single-item">
                <div className="item-name">
                    <h2>诺丽茶5盒装</h2>
                    <img src="http://fpoimg.com/300x300?text=img"/>
                </div>
                <div className="single-product-item">
                    菲柔诗精华素 (30毫升)
                </div>
                <div className="item-other">
                    <ul className="info-list">
                        <li className="price">
                            <span>会员价</span>
                            <span>￥6,888.00</span>
                        </li>
                        <li>
                            <span>原价</span>
                            <span className="center-line">￥6,888.00</span>
                        </li>
                        <li>
                            <span>积分</span>
                            <span>125</span>
                        </li>
                    </ul>
                    <IndexAddCart />
                </div>
            </div>
        );
    }
}
