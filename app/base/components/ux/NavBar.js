/**
 * @fileOverview NavBar 导航栏
 * 位于 app 内容区的上方，系统状态栏的下方，并且提供在一系列页面中的导航能力
 *
 * 参数说明：
 * @param  {[any]} children [导航内容]
 * @param {[string]} mode [导航模式]  默认值： dark  可选{'dark', 'light', 'tran', 'success', 'error'}
 * @param {[string/false/null]} iconName [左边的 iconname (设置为 false/null 不渲染此图标)]  默认值：'left'
 * @param {[any]} leftContent [导航左边内容]
 * @param {[any]} rightContent [导航右边内容]
 * @param {[function]} onLeftClick [导航左边点击回调]
 *
 * 使用举例：
   <NavBar leftContent=""
     iconName="nagMenu"
     mode="top"
     onLeftClick={this.menuClickHandle.bind(this)}
     rightContent={
         <div className="login-info">
             <a href="">登录</a><span>/</span>
             <a href="">注册</a>
         </div>
     }
     ><Link to="/"><i className="icon icon-Kyani"></i></Link></NavBar>

     <NavBar>注册成功</NavBar>

     <NavBar
         mode="success"
         iconName={false}
         >支付成功</NavBar>

     <NavBar
         mode="error"
         iconName={false}
         >支付失败</NavBar>
 */
 import React from 'react';
 import classNames from 'classnames';
 import './NavBar.less';

class NavBar extends React.Component{
    static defaultProps = {
        prefixCls: 'ky-navbar',
        mode: 'dark',
        iconName: 'left',
        onLeftClick(){}
    }
    render(){
        const {
            prefixCls, className, children, mode, iconName, leftContent, rightContent, onLeftClick,...restProps,
        } = this.props;
        const wrapCls = classNames({
            [className]: className,
            [prefixCls]: true,
            [`${prefixCls}-${mode}`]: true,
        })
        return(
            <div {...restProps} className={wrapCls}>
                <div className={`${prefixCls}-left`} role="button" onClick={onLeftClick}>
                    {
                      iconName && (
                        <span className={`${prefixCls}-left-icon`}>
                          <i className={`icon icon-${iconName}`}></i>
                        </span>
                      )
                    }
                    <span className={`${prefixCls}-left-content`}>{leftContent}</span>
                </div>
                <div className={`${prefixCls}-title`}>{children}</div>
                <div className={`${prefixCls}-right`}>
                  {rightContent}
                </div>
            </div>
        );
    }
}


export default NavBar;
