/**
 * @fileOverview  单个套组的商品列表
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
        return(
            <ul className="group-product-list">
                {/* 只有一条列表的情况 直接加个类名 group-product-single */}
                {/* <ul className="group-product-list group-product-single">
                    <li><span className="pack-name">尼多乐(56毫升) </span><span className="pack-num">x1</span></li>
                </ul> */}
                <li><span className="product-name">尼多乐(56毫升) </span><span className="product-num">x1</span></li>
                <li><span className="product-name">新舒康(90粒) </span><span className="product-num">x8</span></li>
                <li><span className="product-name">新乐思便利装(1安士x30包) </span><span className="product-num">x1</span></li>
                <li><span className="product-name">尼多乐(56毫升) </span><span className="product-num">x1</span></li>
                <li><span className="product-name">新舒康(90粒) </span><span className="product-num">x1</span></li>
            </ul>
        );
    }
}
