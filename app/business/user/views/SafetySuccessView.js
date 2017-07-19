/**
 * @fileOverview 修改密码 成功页
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';

 import { Button, NavBar} from 'uxComponent';

import '../resources/SafetySuccessView.less';

class UserIndexView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    render(){
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-withe">
                    <NavBar
                        iconName={false}
                        mode="blue"
                        >修改密码成功</NavBar>
                    <div className="m-safety-success">
                        <i className="icon icon-selectFill"></i>
                        <h2>恭喜您，重置密码成功！</h2>
                        <p>请妥善保管好您的密码，请勿告诉他人。</p>
                        <Button title="返回帐户中心" type="primaryWhite"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserIndexView
