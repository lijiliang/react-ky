/**
 * @fileOverview 公共底部 view
 * /order/*
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../resources/KYFooterBar.less';

class KYFooterBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        window.KYFooterBar=this;
    }
    render(){
        return(
            <div className="footer-bar flex-row">
                <div className="footer-bar-list ky-center-v">
                    <Link to="/user" activeClassName="active" className="bar-item">
                        <i className="icon icon-news"></i>
                        <div className="bar-item-text">最新消息</div>
                    </Link>
                    <a href="http://wpa.qq.com/msgrd?v=3&uin=1951828835&site=qq&menu=yes" className="bar-item">
                        <i className="icon icon-onlineCS"></i>
                        <div className="bar-item-text">在线客服</div>
                    </a>
                    <div className="bar-item">
                        <i className="icon icon-productlist"></i>
                        <div className="bar-item-text">产品商城</div>
                    </div>
                    <Link to="/cart" activeClassName="active" className="bar-item">
                        <i className="icon icon-shoppingCart"></i>
                        <div className="bar-item-text">购物车</div>
                        <div className="cat-num">10</div>
                    </Link>
                </div>
            </div>
        );
    }

}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KYFooterBar);
