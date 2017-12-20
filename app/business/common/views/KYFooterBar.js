/**
 * @fileOverview 公共底部 view
 * /order/*
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShoppingCarCount, indexItemOpen} from '../action/DataAction'
import { Cache } from 'kyCommon';

import '../resources/KYFooterBar.less';

class KYFooterBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isLogin: false
        };
    }
    componentDidMount(){
        window.KYFooterBar=this;
        // 获取用户是否登录
        const isLogin = Cache.sessionGet('ky_cache_isLogined') || false;
        this.setState({
            isLogin: isLogin
        });
        // 登录后获取购物车总数
        if(isLogin){
            this.props.dispatch(getShoppingCarCount());
        }
    }
    componentWillReceiveProps(nextProps) {
        const isLogin = Cache.sessionGet('ky_cache_isLogined') || false;
        this.setState({
            isLogin: isLogin
        });
    }

    // 跳到首页，并展开首页所有商品
    onGoIndexItemOpen() {
        hashHistory.push('/');
        this.props.dispatch(indexItemOpen());
    }
    render(){
        const { onGoIndexItemOpen } = this.props
        const cartcount = this.props.cartcount.get('cartcount');
        return(
            <div className="footer-bar flex-row">
                <div className="footer-bar-list ky-center-v">
                    <Link to="/news" activeClassName="active" className="bar-item">
                        <i className="icon icon-news"></i>
                        <div className="bar-item-text">最新消息</div>
                    </Link>
                    <a href="http://wpa.qq.com/msgrd?v=3&uin=4004941171&site=qq&menu=yes" className="bar-item">
                        <i className="icon icon-onlineCS"></i>
                        <div className="bar-item-text">在线客服</div>
                    </a>
                    <div className="bar-item" onClick={this.onGoIndexItemOpen.bind(this)}>
                        <i className="icon icon-productlist"></i>
                        <div className="bar-item-text">产品商城</div>
                    </div>
                    <Link to="/cart" activeClassName="active" className="bar-item">
                        <i className="icon icon-shoppingCart"></i>
                        <div className="bar-item-text">购物车</div>
                        <div className="cat-num">{cartcount}</div>
                    </Link>
                </div>
            </div>
        );
    }

}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        cartcount: state.CartCountModel
    };
}

// function mapDispatchToProps(dispatch){
//     return {
//         // 跳到首页，并展开首页所有商品
//         onGoIndexItemOpen: () => {
//             hashHistory.push('/');
//             dispatch({
//                 type: 'INDEXITEMOPEN',
//                 indexItemOpen: {
//                     isChildren: true
//                 }
//             });
//         }
//     };
// }
export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(KYFooterBar);
