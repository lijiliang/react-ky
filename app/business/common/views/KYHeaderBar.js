/**
 * @fileOverview 公共头部bar
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../resources/KYHeaderBar.less';

class KYHeaderBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
    }
    menuClickHandle(){
        console.log('a')
    }
    render(){
        return(
            <div>
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
            </header>
            <div className="m-menu">
                {/* <div className="ky-popup-mask"></div> */}
                <div className="ky-popup-wrap">
                    <div className="popup-content">
                        content
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
)(KYHeaderBar);
