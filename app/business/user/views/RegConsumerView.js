/**
 * @fileOverview 注册消费者帐号 View
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';

 import Button from 'kyBase/components/ux/Button';
 import Toast from 'kyBase/components/ux/Toast';
 import NavBar from 'kyBase/components/ux/NavBar';

 import '../resources/RegConsumerView.less';

 class RegConsumerView extends React.Component{
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
                 <div className="m-regConsumer">
                     <NavBar
                         onLeftClick={this.gohistoryHandle.bind(this)}
                         >注册我的消费者帐户</NavBar>
                    <div className="regcon-info">
                        <p>为建立您的帐户我们需要获取您的基本信息</p>
                        <p>请按照以下指示填写相关信息</p>
                    </div>
                    <div className="m-reg-body">
                        <div className="reg-view">
                            <div className="reg-tit">
                                <h2>帐户信息</h2>
                                <p>请填写您的个人信息</p>
                            </div>
                            <div className="ref-form">
                                sdfsadsadsad
                            </div>
                        </div>
                    </div>
                    <div className="m-reg-body">
                        <div className="reg-view">
                            <div className="reg-tit">
                                <h2>推荐人信息</h2>
                                <p>如您是通过凯娅尼会员推荐，请填写他/她的会员号</p>
                            </div>
                            <div className="ref-form">
                                sdfsadsadsad
                            </div>
                        </div>
                    </div>
                    <Button title="注册" className="regcon-btn" disabled across/>
                 </div>
            </div>
        )
     }
 }

 export default RegConsumerView;
