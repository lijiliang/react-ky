/**
 * @fileOverview Menu组件
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames'
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

        // 区别外链与本地链接的跳转
        if(url.indexOf('http') > -1) {
            window.location.href= url;
        }else{
            hashHistory.push(url);
        }
    }
    render(){
        const isLogin = this.props.isLogin;  // 是否登录
        const _nav = this.props.nav;
        const _list = _nav.get('list')

        const groupProduct = _nav.get('groupProduct') || [];
        const about = _nav.get('about')|| [];
        const help = _nav.get('help')|| [];
        const singleProduct = _nav.get('singleProduct')|| [];
        const skinProduct = _nav.get('skinProduct')|| [];    // 护肤产品
        return(
            <div className="ky-menu">
                <ul className="m-menu-main">
                    <li className="m-menu-submenu m-menu-item-selected" onClick={this.goUrl.bind(this, '/help/134')}>
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

                    {
                        _list.map((item, index) => {
                            const _itemTwo = item.sub || [];
                            const _twoLen = item.sub.length;
                            const submenuTitle = classNames({
                                'menu-submenu-title': true,
                                'title-weight': item.name === '推广优惠及其他'
                            });
                            return(
                                _twoLen > 0
                                ?
                                    <li className="m-menu-submenu m-menu-submenu-open">
                                        <div className="menu-submenu-title">
                                            <span>{item.name}</span>
                                            <i className="i-right"></i>
                                        </div>
                                        <ul className="m-menu-sub menu-sub-two">
                                            {
                                                _itemTwo.map((itemTwo) => {
                                                    const _itemThree = itemTwo.sub || [];
                                                    const _threeLen = itemTwo.sub.length;
                                                    return(
                                                        _threeLen > 0
                                                        ?
                                                            <li className="m-menu-submenu menu-sub-three">
                                                               <div className="menu-submenu-title">
                                                                   <span>{itemTwo.name}</span>
                                                                   <i className="i-right"></i>
                                                               </div>
                                                               <ul className="m-menu-sub">
                                                                   {
                                                                       _itemThree.map((itemThree) => {
                                                                           return(
                                                                               <li className="m-menu-item" onClick={this.goUrl.bind(this, itemThree.url)} data-id={itemThree.id}>{itemThree.name}</li>
                                                                           );
                                                                       })
                                                                   }
                                                               </ul>
                                                           </li>
                                                         :
                                                             <li className="m-menu-submenu menu-sub-three">
                                                                <div className="menu-submenu-title" onClick={this.goUrl.bind(this, itemTwo.url)} data-id={itemTwo.id}>
                                                                    <span>{itemTwo.name}</span>
                                                                </div>
                                                            </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </li>
                                :
                                    <li className="m-menu-submenu">
                                        <div className={submenuTitle} onClick={this.goUrl.bind(this, item.url)} data-id={item.id}>
                                            <span>{item.name}</span>
                                        </div>
                                    </li>
                            );
                        })
                    }

                    {/* <li className="m-menu-submenu m-menu-submenu-open">
                        <div className="menu-submenu-title">
                            <span>护肤产品</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            {
                                skinProduct.map((item) => {
                                    const  url = '/product/' + item.id;
                                    return(
                                        <li className="m-menu-item" onClick={this.goUrl.bind(this, url)} data-id={item.id}>{item.name}</li>
                                    );
                                })
                            }
                        </ul>
                    </li> */}


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
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>防伪溯源码</span>
                        </div>
                    </li> */}
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
