/**
 * @fileOverview 产品详情页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getProductInfoId} from '../action/DataAction'

import { Urls, Cache } from 'kyCommon';
import { NavBar} from 'uxComponent';
import IndexAddCart from './IndexAddCart';

import '../resources/ProductIdView.less';

class ProductIdView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            groupFlag: false,
            isLogined: false, // 是否登录
            isAccount: false  // 是否会员
        };
    }
    componentDidMount (){
        const productId = this.props.params.id;
        this._getProductInfo(productId);
        this._getIsLogin();
    }
    componentWillReceiveProps(nextProps) {
        const productId = this.props.params.id;
        this._getIsLogin();
        if(productId !== nextProps.params.id){
            this._getProductInfo(nextProps.params.id);
        }
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    // 获取用户是否登录
    _getIsLogin(){
        const isLogin = Cache.sessionGet('ky_cache_isLogined') || false;
        const memberFlag = Cache.sessionGet('ky_cache_memberFlag') || false;
        this.setState({
            isLogined: isLogin,
            isAccount: memberFlag
        });
    }

    // 获取产品详情数据
    _getProductInfo(productId){
        // const productId = this.props.params.id;
        if(productId.indexOf('g') >= 0){
            this.state = {
                groupFlag: true
            };
        }else{
            this.state = {
                groupFlag: false
            };
        }
        this.props.dispatch(getProductInfoId(productId));
    }
    render(){
        const product = this.props.product;
        const imgList = product.get('imgList')[0] || [];
        const specList = product.get('specList')[0] || [];
        const description = product.get('description');
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-white">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                        mode="dark"
                        ><div className="product-tit">
                            <h1>{product.get('name')}</h1>
                            <p>{specList.specName}</p>
                        </div>
                    </NavBar>
                    <div className="m-product-info">
                        <div className="thumb">
                            <img src={imgList.imagePath}/>
                        </div>
                        <div className="info">
                            {
                                this.state.isLogined
                                ? <div className="info-item member-price">
                                    {this.state.isAccount ? '会员价' : '销售价'}：￥<span className="price">{product.get('salePrice')}</span>
                                </div>
                                : <div className="info-item member-price">
                                    销售价：￥<span className="price">{product.get('originalPrice')}</span>
                                </div>
                            }
                            <div className="info-item add-cart">
                                <IndexAddCart productId={product.get('id')} groupFlag={this.state.groupFlag}/>
                            </div>
                        </div>
                        <div className="integral">
                            <p><span>积分</span><span>{product.get('qv')}</span></p>
                            <p><span>原价</span><span className="line">￥{product.get('originalPrice')}</span></p>
                        </div>
                    </div>
                    <div className="m-product-content">
                        <div className="content-guarantee">
                            <p><span>商家承诺100%美国原装正品</span><span><i className="icon icon-bao"></i>保税区商品</span></p>
                            <p>本商品已包含增值税11.9%</p>
                        </div>
                        <div className="content-edit" dangerouslySetInnerHTML={{__html: description}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        product: state.ProductInfoIdModel
    };
}

export default connect(
    mapStateToProps
)(ProductIdView);
