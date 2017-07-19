/**
 * @fileOverview 重置密码成功 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

//组件
import { Button, NavBar} from 'uxComponent';

import '../resources/ForgetSuccessView.less';

class ForgetpwdView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    componentDidMount(){}

    render() {
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-white">
                    <div className="m-forget-success">
                        <NavBar
                            iconName={false}
                            mode="blue"
                            >重置密码成功</NavBar>
                        <div className="forget-success-view">
                            <i className="icon icon-selectFill"></i>
                            <h2>恭喜您，重置密码成功！</h2>
                            <p>请妥善保管好您的密码，请勿告诉他人。</p>
                            <Button title="返回登录页面" type="primaryWhite"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgetpwdView;
