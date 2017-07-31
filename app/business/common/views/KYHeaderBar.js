/**
 * @fileOverview 公共头部bar
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Cache } from 'kyCommon';

import NavBar from 'kyBase/components/ux/NavBar';
import KYSideBar from './KYSideBar';
import '../resources/KYHeaderBar.less';

class KYHeaderBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isLogin: false
        };
    }
    componentDidMount(){
        // 获取用户是否登录
        const isLogined = Cache.sessionGet('ky_cache_isLogined');
        this.setState({
            isLogin: isLogined
        });
    }
    // 处理menu
    menuClickHandle(){
        const bodyHeight = $(window).height();
        const kyFooter = $('#kyFooter');
        const sideBarWrap = $('.ky-sideBar-wrap');
        $('.ky-popup-mask').show();  //打开遮罩层
        $('.ky-scrollable, .ky-scrollable-white').css('overflow','hidden');
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
        // console.log(this.props)
        const user = this.props.user;
        const isLogined = user.get('isLogined') || false;
        return(
            <header className="ky-view-header">
                <NavBar
                    iconName="nagMenu"
                    mode="top"
                    onLeftClick={this.menuClickHandle.bind(this)}
                    rightContent={
                        isLogined || this.state.isLogin
                        ? <div className="login-info">
                            <Link to='/user'>我的帐户</Link>
                            </div>
                        : <div className="login-info">
                            <Link to='/login'>登录</Link><span>/</span>
                            <Link to='/account/regconsumer'>注册</Link>
                        </div>
                    }
                    ><Link to="/"><i className="icon icon-Kyani"></i></Link></NavBar>
                <KYSideBar />
            </header>
        );
    }

}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        user: state.LoginModel
    };
}

function mapDispatchToProps(dispatch){
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KYHeaderBar);
