/**
 * @fileOverview 公共头部bar
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import KYSideBar from './KYSideBar';
import '../resources/KYHeaderBar.less';

class KYHeaderBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
    }
    // 处理menu
    menuClickHandle(){
        const bodyHeight = $(window).height();
        const kyFooter = $('#kyFooter');
        const sideBarWrap = $('.ky-sideBar-wrap');
        if(kyFooter){
            const footerHeight = kyFooter.height();
            sideBarWrap.css({
                transform: 'translate3d(0, 0, 0)',
                height: bodyHeight-footerHeight
            });
        }else{
            sideBarWrap.css({
                transform: 'translate3d(0, 0, 0)',
                height: '100%'
            });
        }
    }
    render(){
        return(
            <header className="ky-view-header">
                <div className="ky-navbar">
                    <div className="ky-navbar-left">
                        <i className="icon icon-icon" onClick={this.menuClickHandle.bind(this)}></i>
                    </div>
                    <div className="ky-navbar-center">
                        <img src="https://kyaniyoupaiyun.b0.upaiyun.com/1479211326563.jpg" alt=""/>
                    </div>
                    <div className="ky-navbar-right">
                        <div className="login-info">
                            <a href="">登录</a><span>/</span>
                            <a href="">注册</a>
                        </div>
                    </div>
                </div>
                <KYSideBar />
            </header>
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
)(KYHeaderBar);
