/**
 * @fileOverview  套组 商品
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

import '../resources/SubGroupItem.less';

export default class SubGroupItem extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    render(){
        const _item = this.props.data || {};
        const imgPath = _item.imgPath + '!/format/webp';  // 产品图片，用webp图片格式
        return(
            <div className="sub-group-item">
                <div className="item-name">
                    <h2>{_item.name}</h2>
                    <img src={imgPath}/>
                </div>
                <KYGroupProductList productList={_item.groupItems}/>
                <div className="item-other">
                    <ul className="info-list">
                        <li className="price">
                            <span>会员价</span>
                            <span>￥{_item.originalPrice}</span>
                        </li>
                        <li>
                            <span>原价</span>
                            <span className="center-line">￥{_item.salePrice}</span>
                        </li>
                        <li>
                            <span>积分</span>
                            <span>{_item.qv}</span>
                        </li>
                    </ul>
                    <IndexAddCart productId={_item.id} groupFlag={true}/>
                </div>
            </div>
        );
    }
}
