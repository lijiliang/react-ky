/**
 * @fileOverview  单个商品，会员价、原价、积分区块
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Cache } from 'kyCommon';

class ItemInfoList extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isLogined: false, // 是否登录
            isAccount: false  // 是否会员
        };
    }
    componentDidMount(){
        this._getIsLogin();
    }
    componentWillReceiveProps(nextProps) {
        this._getIsLogin();
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
    render(){
        const {salePrice, originalPrice, qv, loginInfo} = this.props;
        const {isLogined, isAccount} = this.state
        return(
            <ul className="info-list">
                {
                    isLogined
                    ?
                        <li className="price">
                            <span>{isAccount ? '会员价' : '销售价'}</span>
                            <span>￥{salePrice}</span>
                        </li>
                    : null
                }{
                    isLogined
                    ? <li>
                        <span>原价</span>
                        <span className="center-line">￥{originalPrice}</span>
                    </li>
                    : <li className="price">
                        <span>销售价</span>
                        <span>￥{originalPrice}</span>
                    </li>
                }
                <li>
                    <span>积分</span>
                    <span>{qv}</span>
                </li>
            </ul>
        );
    }
}


/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        loginInfo: state.LoginModel
    };
}

export default connect(
    mapStateToProps
)(ItemInfoList);
