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
                                <i className="icon icon-radioSelect"></i>
                                <strong className="pack-name">卓越套组</strong>
                                <div className="member-price">
                                    <span>会员价</span>
                                    <span className="price">￥10,888.00</span>
                                </div>
                            </div>
                            <div className="m-pack-body">
                                sdafsadf
                            </div>
                        </div>

                        <div className="m-pack-item">
                            <div className="m-pack-header">
                                <i className="icon icon-radio"></i>
                                <strong className="pack-name">卓越套组</strong>
                                <div className="member-price">
                                    <span>会员价</span>
                                    <span className="price">￥10,888.00</span>
                                </div>
                            </div>
                            <div className="m-pack-body">
                                sdafsadf
                            </div>
                        </div>

                    </div>
                 </div>
             </div>
        );
    }
}

export default RegSelectPackView;
