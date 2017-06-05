/**
 * @fileOverview 注册消费者帐号 View
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { createForm } from 'rc-form';

 import Button from 'kyBase/components/ux/Button';
 import Toast from 'kyBase/components/ux/Toast';
 import NavBar from 'kyBase/components/ux/NavBar';
 import InputItem from 'kyBase/components/ux/InputItem';

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
         const { getFieldProps } = this.props.form;
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
                                <InputItem
                                    placeholder="提示文字"
                                >标题一</InputItem>
                                <InputItem
                                    {...getFieldProps('inputclear')}
                                    placeholder="推荐人会员号"
                                    clear
                                    editable
                                >推荐人会员号</InputItem>
                                <InputItem
                                    placeholder="推荐人会员号"
                                    clear
                                    disabled
                                >推荐人会员号</InputItem>
                                <InputItem
                                    type="password"
                                    placeholder="请输入密码"
                                    clear
                                    extra="¥"
                                >密码</InputItem>
                                <InputItem
                                    type="phone"
                                    placeholder="手机号码"
                                    clear
                                >手机号码</InputItem>
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
 const RegConsumerViewWrapper = createForm()(RegConsumerView);
 export default RegConsumerViewWrapper;
