/**
 * @fileOverview 左侧边栏 menu
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import KYMenu from 'kyBase/components/business/KYMenu';

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
        $('.ky-scrollable, .ky-scrollable-white').attr('style', []);
        sideBarWrap.css({
            transform: 'translate3d(-100%, 0, 0)'
        });
        $('.ky-popup-mask').hide();  //关闭遮罩层
    }
    goUrl(url, event){
        event.preventDefault();
        // 关闭侧边栏
        this.closeSideHandle();

        // 区别外链与本地链接的跳转
        if(url.indexOf('http') > -1) {
            window.location.href= url;
        }else{
            hashHistory.push(url);
        }
    }
    render(){
        return(
            <div className="ky-sideBar">
                <div className="ky-popup-mask" onClick={this.closeSideHandle.bind(this)}></div>
                <div className="ky-sideBar-wrap">
                    <div className="sideBar-content">
                        <div className="side-header">
                            <i className="icon icon-Kyani" onClick={this.goUrl.bind(this, '/')}></i>
                            <i className="icon icon-close" onClick={this.closeSideHandle.bind(this)}></i>
                        </div>
                        <div className="side-main" ref="sideMain">
                            <KYMenu isLogin={this.props.isLogin}/>
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
        CommonModel: state.CommonModel
    };
}


export default connect(
    mapStateToProps,
)(KYSideBar);
