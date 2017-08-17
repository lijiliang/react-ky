/**
 * @fileOverview Menu组件
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {hasMember} from 'Utils';
import './KYMenu.less';

class KYMenu extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        $(document).on('click', '.menu-submenu-title', function(){
        // $('.menu-submenu-title').on('click', function(){
            const mMenuSub = $(this).siblings('.m-menu-sub');
            if(!mMenuSub.hasClass('m-menu-open')){
                mMenuSub.addClass('m-menu-open');
                $(this).find('.i-right').addClass('i-up');
            }else{
                const ChilderSubLen = $(this).parent().find('.m-menu-sub').length;
                mMenuSub.removeClass('m-menu-open');
                $(this).find('.i-right').removeClass('i-up');
                // 如果当前的有子类，也要把所有的子类关闭
                if(ChilderSubLen > 1){
                    $(this).parent().find('.m-menu-sub').removeClass('m-menu-open');
                    $(this).parent().find('.i-right').removeClass('i-up');
                }
            }
        });
    }
    goUrl(url, event){
        event.preventDefault();
        // 关闭侧边栏
        const sideBarWrap = $('.ky-sideBar-wrap');
        $('.ky-scrollable, .ky-scrollable-white').attr('style', []);
        sideBarWrap.css({
            transform: 'translate3d(-100%, 0, 0)'
        });
        $('.ky-popup-mask').hide();  //关闭遮罩层

        hashHistory.push(url);
    }
    render(){
        const isLogin = this.props.isLogin;  // 是否登录
        const _nav = this.props.nav;
        const groupProduct = _nav.get('groupProduct') || [];
        const about = _nav.get('about')|| [];
        const help = _nav.get('help')|| [];
        const singleProduct = _nav.get('singleProduct')|| [];
        const skinProduct = _nav.get('skinProduct')|| [];    // 护肤产品
        return(
            <div className="ky-menu">
                <ul className="m-menu-main">
                    <li className="m-menu-submenu m-menu-item-selected">
                        <div className="menu-submenu-title">
                            <span>消费者告知书</span>
                        </div>
                    </li>
                    {
                        !isLogin ?
                                <li className="m-menu-submenu m-menu-submenu-open">
                                    <div className="menu-submenu-title">
                                        <span>登入/注册</span>
                                        <i className="i-right"></i>
                                    </div>
                                    <ul className="m-menu-sub menu-sub-two">
                                        <li className="m-menu-item" onClick={this.goUrl.bind(this, '/login')}>登入我的帐号</li>
                                        <li className="m-menu-item" onClick={this.goUrl.bind(this, '/account/regconsumer')}>消费者帐户</li>
                                        <li className="m-menu-item" onClick={this.goUrl.bind(this, '/account/regmember')}>注册会员帐户</li>
                                    </ul>
                                </li>
                        : null
                    }

                    <li className="m-menu-submenu m-menu-submenu-open">
                        <div className="menu-submenu-title">
                            <span>营养补充品</span>
                            <i className="i-right"></i>
                        </div>

                        {
                            isLogin ?
                                <ul className="m-menu-sub menu-sub-two">
                                <li className="m-menu-submenu menu-sub-three">
                                    <div className="menu-submenu-title">
                                        <span>套组</span>
                                        <i className="i-right"></i>
                                    </div>
                                    <ul className="m-menu-sub">
                                        {
                                            groupProduct.map((item) => {
                                                return(
                                                    <li className="m-menu-item" data-id={item.id}>{item.name}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                                <li className="m-menu-submenu menu-sub-three">
                                    <div className="menu-submenu-title">
                                        <span>单品</span>
                                        <i className="i-right"></i>
                                    </div>
                                    <ul className="m-menu-sub">
                                        {
                                            singleProduct.map((item) => {
                                                return(
                                                    <li className="m-menu-item" data-id={item.id}>{item.name}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                                </ul>
                            :
                                singleProduct.map((item) => {
                                    return(
                                        <ul className="m-menu-sub menu-sub-two">
                                            <li className="m-menu-item" data-id={item.id}>{item.name}</li>
                                        </ul>
                                    );
                                })
                        }
                    </li>
                    <li className="m-menu-submenu m-menu-submenu-open">
                        <div className="menu-submenu-title">
                            <span>护肤产品</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            {
                                skinProduct.map((item) => {
                                    return(
                                        <li className="m-menu-item" data-id={item.id}>{item.name}</li>
                                    );
                                })
                            }
                        </ul>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>推广优惠及其它</span>
                        </div>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>最新消息</span>
                        </div>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>关于我们</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            {
                                about.map((item) => {
                                    if(item.sub && item.sub.length>0){
                                        return(
                                            <li className="m-menu-submenu menu-sub-three">
                                                <div className="menu-submenu-title">
                                                    <span>{item.name}</span>
                                                    <i className="i-right"></i>
                                                </div>
                                                <ul className="m-menu-sub">
                                                    {
                                                        item.sub.map((subItem) => {
                                                            return(
                                                                <li className="m-menu-item" data-id={subItem.id}>{subItem.name}</li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        );
                                    }else{
                                        return(
                                            <li className="m-menu-item" data-id={item.id}>{item.name}</li>
                                        );
                                    }
                                })
                            }
                        </ul>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>帮助中心</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            {help.map((item) => {
                                return(
                                    <li className="m-menu-submenu menu-sub-three">
                                        <div className="menu-submenu-title">
                                            <span>{item.name}</span>
                                            <i className="i-right"></i>
                                        </div>
                                        <ul className="m-menu-sub">
                                            {
                                                item.sub.map((subItem) => {
                                                    return(
                                                        <li className="m-menu-item" data-id={subItem.id}>{subItem.name}</li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </li>
                                );
                            })}

                             {/* <li className="m-menu-submenu menu-sub-three">
                                <div className="menu-submenu-title">
                                    <span>购物指南</span>
                                    <i className="i-right"></i>
                                </div>
                                <ul className="m-menu-sub">
                                    <li className="m-menu-item">购物流程</li>
                                    <li className="m-menu-item">常见问题</li>
                                    <li className="m-menu-item">微信支付教学</li>
                                </ul>
                            </li> */}
                        </ul>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>防伪溯源码</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        nav: state.NavModel
    };
}
export default connect(
    mapStateToProps,
)(KYMenu);
