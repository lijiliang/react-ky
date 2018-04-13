/**
 * @fileOverview  单品 商品
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { KYGroupProductList } from 'kyComponent';
import { Button, Stepper} from 'uxComponent';
import IndexAddCart from './IndexAddCart';
import ItemInfoList from './ItemInfoListView';

import '../resources/SubSingleItem.less';

export default class SubGroupItem extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    goProduct(item) {
        const {groupFlag, id} = item;
        let url = '';
        if (groupFlag) {
            url = `/product/g${id}`;
        } else {
            url = `/product/${id}`;
        }
        hashHistory.push(url);

    }
    render(){
        const _item = this.props.data || {};
        //const imgPath = _item.imgPath + '!/fwfh/600x600/format/webp';  // 产品图片，用webp图片格式
        const imgPath = _item.imgPath + '!/fwfh/600x600';
        return(
            <div className="sub-single-item">
                <div className="item-name" onClick={this.goProduct.bind(this, _item)}>
                    <h2>{_item.name}</h2>
                    <img src={imgPath}/>
                </div>
                <div className="single-product-item">{_item.specName}</div>
                <div className="item-other">
                    <ItemInfoList salePrice={_item.salePrice} originalPrice={_item.originalPrice} qv={_item.qv}/>
                    <IndexAddCart productId={_item.id} groupFlag={_item.groupFlag}/>
                </div>
            </div>
        );
    }
}
