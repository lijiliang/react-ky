/**
 * @fileOverview Menu组件
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './KYMenu.less';

class KYMenu extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        $('.menu-submenu-title').on('click', function(){
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
    render(){
        return(
            <div className="ky-menu">
                <ul className="m-menu-main">
                    <li className="m-menu-submenu m-menu-item-selected">
                        <li className="m-menu-item">消费者告知书</li>
                    </li>
                    <li className="m-menu-submenu m-menu-submenu-open">
                        <div className="menu-submenu-title">
                            <span>登入/注册</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            <li className="m-menu-item">登入我的帐号</li>
                            <li className="m-menu-item">消费者帐户</li>
                            <li className="m-menu-item">注册会员帐户</li>
                        </ul>
                    </li>
                    <li className="m-menu-submenu m-menu-submenu-open">
                        <div className="menu-submenu-title">
                            <span>营养补充品</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            <li className="m-menu-item">尼多乐</li>
                            <li className="m-menu-item">至尊尼多乐</li>
                            <li className="m-menu-item">至尊尼多乐冲粉</li>
                            <li className="m-menu-item">新东思（瓶装）</li>
                            <li className="m-menu-item">新东思（便利装)</li>
                            <li className="m-menu-item">新思康</li>
                            <li className="m-menu-item">诺丽茶</li>
                        </ul>
                    </li>
                    <li className="m-menu-submenu m-menu-submenu-open">
                        <div className="menu-submenu-title">
                            <span>护肤产品</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            <li className="m-menu-item">菲柔诗护肤系列套装</li>
                            <li className="m-menu-item">菲柔诗洗面奶</li>
                            <li className="m-menu-item">菲柔诗日霜</li>
                            <li className="m-menu-item">菲柔诗精华素</li>
                            <li className="m-menu-item">菲柔诗晚霜</li>
                            <li className="m-menu-item">菲柔诗眼霜</li>
                        </ul>
                    </li>
                    <li className="m-menu-submenu">
                        <li className="m-menu-item">推广优惠及其它</li>
                    </li>
                    <li className="m-menu-submenu">
                        <li className="m-menu-item">最新消息</li>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>关于我们</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            <li className="m-menu-item">公司简介</li>
                            <li className="m-menu-item">携手关爱计划</li>
                            <li className="m-menu-submenu menu-sub-three">
                                <div className="menu-submenu-title">
                                    <span>研发理念</span>
                                    <i className="i-right"></i>
                                </div>
                                <ul className="m-menu-sub">
                                    <li className="m-menu-item">健康三角组合</li>
                                    <li className="m-menu-item">优质保证</li>
                                    <li className="m-menu-item">科学咨询委员会</li>
                                    <li className="m-menu-item">超强组件成分</li>
                                    <li className="m-menu-item">干细胞研究</li>
                                </ul>
                            </li>
                            <li className="m-menu-item">跨境电子商务</li>
                            <li className="m-menu-item">联系我们</li>
                        </ul>
                    </li>
                    <li className="m-menu-submenu">
                        <div className="menu-submenu-title">
                            <span>帮助中心</span>
                            <i className="i-right"></i>
                        </div>
                        <ul className="m-menu-sub menu-sub-two">
                            <li className="m-menu-submenu menu-sub-three">
                                <div className="menu-submenu-title">
                                    <span>售后服务</span>
                                    <i className="i-right"></i>
                                </div>
                                <ul className="m-menu-sub">
                                    <li className="m-menu-item">退货承诺</li>
                                    <li className="m-menu-item">换货承诺</li>
                                    <li className="m-menu-item">帐户安全</li>
                                </ul>
                            </li>
                            <li className="m-menu-submenu menu-sub-three">
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
                            <li className="m-menu-submenu menu-sub-three">
                                <div className="menu-submenu-title">
                                    <span>政策及程序</span>
                                    <i className="i-right"></i>
                                </div>
                                <ul className="m-menu-sub">
                                    <li className="m-menu-item">消费者告知书</li>
                                    <li className="m-menu-item">海关总署公告</li>
                                    <li className="m-menu-item">跨境商务规范简说</li>
                                    <li className="m-menu-item">网站使用条款</li>
                                    <li className="m-menu-item">法律声明</li>
                                    <li className="m-menu-item">正品保障</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="m-menu-submenu">
                        <li className="m-menu-item">防伪溯源码</li>
                    </li>
                    <li className="m-menu-submenu">
                        <li className="m-menu-item">关注官方微信</li>
                    </li>
                </ul>
            </div>
        );
    }
}

export default KYMenu;
