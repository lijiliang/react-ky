/**
 * @fileOverview  单个套组的商品列表
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

import './KYGroupProductList.less';

export default class SubGroupItem extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    render(){
        const productList = this.props.productList || [];
        const groupCls = classNames({
            'group-product-list': true,
            'group-product-single': productList.length <= 1
        });
        return(
            <ul className={groupCls}>
                {/* 只有一条列表的情况 直接加个类名 group-product-single */}
                {
                    productList.map((item) => {
                        return (
                            <li><span className="product-name">{item.productName}</span><span className="product-num">x{item.productNum}</span></li>
                        );
                    })
                }
            </ul>
        );
    }
}
