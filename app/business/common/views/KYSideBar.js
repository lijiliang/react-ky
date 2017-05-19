/**
 * @fileOverview 左侧边栏 menu
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../resources/KYSideBar.less';

class KYSideBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){

    }
    // 关闭侧边栏
    closeSideHandle(){
        const sideBarWrap = $('.ky-sideBar-wrap');
        sideBarWrap.css({
            transform: 'translate3d(-100%, 0, 0)'
        });
    }
    render(){
        return(
            <div className="ky-sideBar">
                {/* <div className="ky-popup-mask"></div> */}
                <div className="ky-sideBar-wrap">
                    <div className="sideBar-content">
                        <div className="side-header">
                            <img src="https://kyaniyoupaiyun.b0.upaiyun.com/1479211326563.jpg" alt=""/>
                            <i className="icon icon icon-zaixiankefu" onClick={this.closeSideHandle.bind(this)}></i>
                        </div>
                        <div className="side-main" ref="sideMain">
                            <div className="ky-menu">
                                <ul className="m-menu-main">
                                    <li className="m-menu-submenu">
                                        <div className="menu-submenu-title">
                                            <span>消费者告知书</span>
                                        </div>
                                    </li>
                                    <li className="m-menu-submenu">
                                        <div className="menu-submenu-title">
                                            <span>登入/注册</span>
                                        </div>
                                        <ul className="m-menu-sub">
                                            <li className="m-menu-item">登入我的帐号</li>
                                            <li className="m-menu-item">消费者帐户</li>
                                            <li className="m-menu-item">注册会员帐户</li>
                                            <li className="m-menu-submenu">
                                                <div className="menu-submenu-title">
                                                    <span>研发理念</span>
                                                </div>
                                                <ul className="m-menu-sub">
                                                    <li className="m-menu-item">健康三角组合</li>
                                                    <li className="m-menu-item">优质保证</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
)(KYSideBar);
