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

import { Urls, RegxRule, Cache } from 'kyCommon';
import { Button, Toast, NavBar} from 'uxComponent';
import { KYSteps } from 'kyComponent';
import PackItemView from './PackItemView';

import '../resources/RegSelectPackView.less';

class RegSelectPackView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: 'c'
        };
    }

    handleChanges(event) {
        this.setState({value: event.target.value});
    }
    componentDidMount(){
        // 获取session
        const regmember_info = Cache.sessionGet(Cache.sessionKeys.ky_cache_regmember_info);
        if(regmember_info){
            this.setState(regmember_info);
        }
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }
    render(){
        console.log(this.state)
        const data = [
            {value: 'c', label: 'label0'},
            {value: 'd', label: 'label1'},
            {value: 'e', label: 'label2'}
        ];
        return(
             <div className="ky-container-body">
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
                             {/* {data.map( i => (
                                 <label>
                                     {i.label}
                                    <input type="radio" value={i.value} checked = {this.state.value === i.value} onChange={this.handleChanges.bind(this)} />
                                  </label>
                             ))} */}

                             {data.map( i => (
                                <PackItemView icon value={i.value} checked={this.state.value} onChange={this.handleChanges.bind(this)}/>
                             ))}


                            {/* <PackItemView active icon/>
                            <PackItemView icon/>
                            <PackItemView icon listData={{a:123}}/> */}
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
                     </div>
                 </div>
                 <div className="m-foot-fixed">
                     <Button title="立即结算" className="ky-button-primary regcon-btn" onClick={this.submitHandle} across/>
                 </div>
            </div>
        );
    }
}

export default RegSelectPackView;
