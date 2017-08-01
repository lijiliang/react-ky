/**
 * @fileOverview 注册会员帐号 选购加入套组
 */
 import React from 'react';
 import { Link, hashHistory } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Urls, RegxRule, Cache } from 'kyCommon';
import { Button, Toast, NavBar} from 'uxComponent';
import { getPublic } from 'FetchData';
import { KYSteps } from 'kyComponent';
import PackItemView from './PackItemView';

import '../resources/RegSelectPackView.less';

class RegSelectPackView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            groupList: [],
            groupId: null,
            groupItem: {}  // 选中的套组
        };
    }
    componentDidMount(){
        // 获取套组
        this._getGroupReg();
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
    // 选中套组
    handleChanges(item, event) {
        this.setState({
            groupId: Number(event.target.value),
            groupItem: item,
        });
    }
    // 立即结算
    submitHandle = () => {
        const _state = this.state;
        if(_state.groupId == null){
            Toast.info('必须要选择一款套组', 1);
            return;
        }
        Toast.loading('加载中...');
        Cache.sessionSet(Cache.sessionKeys.ky_cache_regmember_info, _state);
        setTimeout(() => {
            hashHistory.push('/account/regorder');
            Toast.hide();
        }, 1200)
    }
    // 获取会员注册的套组信息
    _getGroupReg() {
        const response = getPublic(Urls.GroupReg);
        response.then((result) => {
            const res = result.data;
            if(res.success) {
                this.setState({
                    groupList: res.data,
                });
            }
        });
    }
    render(){
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
                             {this.state.groupList.map(item => (
                                <PackItemView icon value={item.groupId} checked={this.state.groupId} listData={item} onChange={this.handleChanges.bind(this, item)}/>
                             ))}

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

export default RegSelectPackView
