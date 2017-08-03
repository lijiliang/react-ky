/**
 * @fileOverview 帐户安全
 */
 import React from 'react';
 import { Link, hashHistory } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';

 import { Button, Toast, NavBar, InputItem, Picker, TextareaItem, List,} from 'uxComponent';
 const Item = List.Item;
 const Brief = Item.Brief;

import '../resources/SafetyView.less';

import Avatar from '../resources/img/avatar.png'

class UserIndexView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.back();
    }
    goSafetyHandle = () => {
        hashHistory.push('/user/safetypwd')
    }
    render(){
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-withe">
                    <div className="m-safety">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            mode="blue"
                            >帐户安全</NavBar>
                        <div className="safety-view">
                            <i className="icon icon-safetyPassword"></i>
                            <h2>修改密码</h2>
                            <div className="safety-info">
                                <p>互联网帐号存在被盗风险，</p>
                                <p>建议您定期重置密码以保护帐户安全。</p>
                            </div>
                            <Button title="修改" type="primaryWhite" onClick={this.goSafetyHandle}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserIndexView;
