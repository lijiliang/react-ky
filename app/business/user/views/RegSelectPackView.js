/**
 * @fileOverview 注册会员帐号 选购加入套组
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import * as loginAction from '../action/actionTypes';
 import {regConsumer} from '../action/DataAction';

import { Button, Toast, NavBar} from 'uxComponent';
import { KYSteps } from 'kyComponent';

import '../resources/RegSelectPackView.less';

class RegSelectPackView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }

    componentDidMount(){
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }
    render(){
        return(
             <div className="ky-scrollable">
                 <div className="m-selectpack">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                    >注册我的会员帐户</NavBar>
                    <div className="m-regstep">
                        <KYSteps current={2}/>
                        <div className="regcon-info">
                            <h2>选购加入套组</h2>
                            <p>请选购以下其中一款加入套组</p>
                            <p>以注册成为凯娅尼会员</p>
                        </div>
                    </div>
                    <div className="m-pack">
                        <div className="m-pack-item m-pack-active">
                            <div className="m-pack-header">
                                <span className="icon-bg"></span>
                                <strong className="pack-name">卓越套组</strong>
                                <div className="member-price">
                                    <span>会员价</span>
                                    <span className="price">￥10,888.00</span>
                                </div>
                            </div>
                            <div className="m-pack-body">
                                <div className="thumb">
                                    <img src="http://fpoimg.com/660x300?text=img" alt=""/>
                                </div>
                                <div className="pack-content">
                                    <div className="con-tit">内容</div>
                                    <ul className="pack-list">
                                        <li><span className="pack-name">尼多乐(56毫升) </span><span className="pack-num">x1</span></li>
                                        <li><span className="pack-name">新舒康(90粒) </span><span className="pack-num">x8</span></li>
                                        <li><span className="pack-name">新乐思便利装(1安士x30包) </span><span className="pack-num">x1</span></li>
                                        <li><span className="pack-name">尼多乐(56毫升) </span><span className="pack-num">x1</span></li>
                                        <li><span className="pack-name">新舒康(90粒) </span><span className="pack-num">x1</span></li>
                                    </ul>
                                    <ul className="other-list">
                                        <li><span>原价</span><span className="price">¥1,830.00</span></li>
                                        <li><span>积分</span><span>125</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="m-pack-item">
                            <div className="m-pack-header">
                                <span className="icon-bg"></span>
                                <strong className="pack-name">卓越套组</strong>
                                <div className="member-price">
                                    <span>会员价</span>
                                    <span className="price">￥10,888.00</span>
                                </div>
                            </div>
                            <div className="m-pack-body">
                                <div className="thumb">
                                    <img src="http://fpoimg.com/660x300?text=img" alt=""/>
                                </div>
                                <div className="pack-content">
                                    <div className="con-tit">内容</div>
                                    <ul className="pack-list">
                                        <li><span className="pack-name">尼多乐(56毫升) </span><span className="pack-num">x1</span></li>
                                        <li><span className="pack-name">新舒康(90粒) </span><span className="pack-num">x8</span></li>
                                        <li><span className="pack-name">新乐思便利装(1安士x30包) </span><span className="pack-num">x1</span></li>
                                        <li><span className="pack-name">尼多乐(56毫升) </span><span className="pack-num">x1</span></li>
                                        <li><span className="pack-name">新舒康(90粒) </span><span className="pack-num">x1</span></li>
                                    </ul>
                                    <ul className="other-list">
                                        <li><span>原价</span><span className="price">¥1,830.00</span></li>
                                        <li><span>积分</span><span>125</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* m-pack-active */}
                        <div className="m-pack-item">
                            <div className="m-pack-header">
                                <span className="icon-bg"></span>
                                <strong className="pack-name">凯娅尼电子资料包</strong>
                                <div className="member-price">
                                    <span className="price">￥100.00</span>
                                </div>
                            </div>
                            <div className="elect-package">
                                <p>温馨提示 : 当您选择了此套组后，</p>
                                <p>将会失去购买其他更吸引的加入套组的机会</p>
                            </div>
                        </div>

                        <div className="m-pack-other">
                            <p>只须购买100元的会藉或购买以上</p>
                            <p>任何一款的产品套组就马上可以成为凯娅尼会员。</p>
                            <p>成为会员后，可以尽享会员专属折扣和促销活动。</p>
                            <p>现在就马上选购可节省更多。</p>
                        </div>
                    </div>
                    <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                 </div>
             </div>
        );
    }
}

export default RegSelectPackView;
