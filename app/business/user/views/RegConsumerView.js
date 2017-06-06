/**
 * @fileOverview 注册消费者帐号 View
 */
 import React from 'react';
 import { Link } from 'react-router';
 import PureRenderMixin from 'react-addons-pure-render-mixin';
 import { bindActionCreators } from 'redux';
 import { connect } from 'react-redux';
 import { createForm } from 'rc-form';
 import classNames from 'classnames';

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
             surName: '',      //姓
             lastName: '',     //名
             email: '',        //邮箱
             confirmEmail: '', //确认邮箱
             password: '',     //密码
             confirmPwd: '',   //确认密码
             referenceId: '',  //推荐人编号
             isHasReference: false,   //是否有推荐人编号
             confirmEmailDirty: false,//两次邮箱是否一致
             confirmPwdDirty: false,  //两次密码是否一致
         };
     }
     componentDidMount(){
     }

     // 返回上一页
     gohistoryHandle(){
         window.history.go(-1);
     }

    handleEmailConfirmBlur = (value) => {
        this.setState({ confirmEmailDirty: this.state.confirmEmailDirty || !!value });
    }

    // 校验两次邮箱是否一致
    email = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmEmailDirty) {
            form.getFieldValue(['confirmEmail'], { force: true });
        }
        callback();
    }

    // 校验两次邮箱是否一致
    confirmEmail = (rule, value, callback) => {
      const form = this.props.form;
      if(value && value !== form.getFieldValue('email')) {
          callback('两次输入的邮箱不一致，请重新输入！');
      } else {
          callback();
      }
    }

    handlePwdConfirmBlur = (value) => {
        this.setState({ confirmPwdDirty: this.state.confirmPwdDirty || !!value });
    }

    // 校验两次密码是否一致
    password = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmPwdDirty) {
            form.getFieldValue(['confirmPwd'], { force: true });
        }
        callback();
    }

    // 校验两次密码是否一致
     confirmPassword = (rule, value, callback) => {
         const form = this.props.form;
         if(value && value !== form.getFieldsValue().password) {
             callback('两次输入的密码不一致，请重新输入！');
         } else {
             callback();
         }
     }

     // 提交
     submitHandle = () => {
         this.props.form.validateFields((error, value) => {
            // const _surName = this.props.form.getFieldError('surName');  // 获取单个错误信息
            if(error){
                const fieldNames = ['surName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPwd', 'referenceId', 'isHasReference'].reverse();
                fieldNames.map((item, index) => {
                    if(this.props.form.getFieldError(item)){
                        Toast.info(this.props.form.getFieldError(item), 1)
                        return;
                    }
                })
            }else{
                this.setState(value)
            }

             console.log(error, value)
            //  if(error.email){
            //      alert(error.email.errors[0].message)
            //  }
            // const _surName = this.props.form.getFieldError('surName');
            // console.log(_surName)
            // console.log(this.props.form.getFieldError('email'))
            // if(_surName){
            //     Toast.info(_surName, 1)
            // }
            // console.log(this.props.form.getFieldsValue())
         })
     }

     render(){
        //  console.log(this.state)
         const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
         const isShowPwdCls = classNames({
             icon: true,
             'icon-eye': true,
             'extra-pwd': true,
             'extra-pwd-active': this.state.isShowPwd
         })
        //  console.log(this.state)
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
                                <InputItem
                                    {...getFieldProps('surName', {
                                        rules: [{
                                            required: false,
                                            message: '请输入您的姓氏!'
                                        }],
                                    })}
                                    placeholder="请输入您的姓氏"
                                >姓氏</InputItem>
                                <InputItem
                                    {...getFieldProps('lastName', {
                                        rules: [{
                                            required: false,
                                            message: '请输入您的名字!'
                                        }],
                                    })}
                                    placeholder="请输入您的名字"
                                >名字</InputItem>
                                <InputItem
                                    {...getFieldProps('email', {
                                        rules: [{
                                          type: 'email', message: '请输入正确的邮箱地址',
                                        }, {
                                          required: true, message: '请输入邮箱地址',
                                        }, {
                                            validator: this.email
                                        }],
                                     })}
                                    placeholder="请输入有效的邮箱地址"
                                >邮件地址</InputItem>
                                <InputItem
                                    {...getFieldProps('confirmEmail', {
                                        rules: [{
                                          validator: this.confirmEmail
                                        }, {
                                          required: true, message: '请再次输入您的邮箱地址',
                                        }],
                                     })}
                                    placeholder="请再次输入您的邮箱地址"
                                >邮箱确认</InputItem>
                                <InputItem
                                    {...getFieldProps('password', {
                                        rules: [{
                                            required: true,
                                            message: '您的密码最少为8个字符!'
                                        }, {
                                            validator: this.password
                                        }],
                                    })}
                                    type="password"
                                    placeholder="您的密码最少为8个字符"
                                    showPwd='true'
                                    extra={<i className={isShowPwdCls} />}
                                    onExtraClick={e=>{}}
                                    name='password'
                                >帐号密码</InputItem>
                                <InputItem
                                    {...getFieldProps('confirmPwd', {
                                        rules: [{
                                            required: true,
                                            message: '请再次输入您的密码!'
                                        }, {
                                            validator: this.confirmPassword
                                        }],
                                    })}
                                    type="password"
                                    placeholder="请再次输入您的密码"
                                    onBlur={this.handlePwdConfirmBlur}
                                    extra={<i className={isShowPwdCls} />}
                                    showPwd='true'
                                    onExtraClick={e=>{}}
                                    name='confirmPwd'
                                    style={{borderBottom: 'none'}}
                                >确认密码</InputItem>
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
                                <InputItem
                                    {...getFieldProps('referenceId', {
                                        rules: [{
                                            required: true,
                                            message: '请输入推荐人会员号'
                                        }],
                                    })}
                                    placeholder="推荐人会员号"
                                >推荐人会员号</InputItem>
                            </div>
                        </div>
                    </div>
                    {/* <Button title="注册" className="regcon-btn" onClick={this.submitHandle} disabled across/> */}
                    <Button title="注册" className="regcon-btn" onClick={this.submitHandle} across/>
                 </div>
            </div>
         );
     }
 }
 const RegConsumerViewWrapper = createForm()(RegConsumerView);
 export default RegConsumerViewWrapper;
