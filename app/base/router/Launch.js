/**
 * @fileOverview 加载子页面
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// 引入全站重置代码
import 'kyBase/resources/less/reset.less';

import KYHeaderBar from 'kyBus/common/views/KYHeaderBar';
import KYFooterBar from 'kyBus/common/views/KYFooterBar';

class Launch extends React.Component {
    static defaultProps = {
        vRouteMap: {
            'user/regconsumer': false,     //消费者注册
            'user/regmember': false,       //会员注册
            login: false,                  //登录
            'cart/order': false,           //购物车列表
        }
    }
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            footBarVisible: true,
        }
    }
    componentDidMount(){
        const _this = this;
        window.AppRoot = this;
        _this.updateBBar();
    }
    componentDidUpdate(prevProps, prevState){
        this.updateBBar();
    }
    /**
     * [updateBBar 底部 bar 根据规则显示或隐藏]
     */
    updateBBar(){
        // 获取当前路由
        const currRoute = this.props.location.pathname.replace('/', '');

        //如果该路由配置为要显示底部菜单栏目，默认为显示，如果配置了false,则不显示
        const isVisible = this.props.vRouteMap[currRoute];
        if(this.state.bbarVisible != isVisible){
            this.setState({
                footBarVisible: isVisible
            })
        }else{
            this.setState({
                footBarVisible: true
            })
        }
        console.log(isVisible)

    }
    render(){
        let currPath = this.props.location.pathname;//触发footerbar更新状态

        return(
            <div className="ky-root-container">
                <div className="ky-view-main">
                    <KYHeaderBar  />
                    <div className="ky-view-body">
                        {this.props.children}
                    </div>

                    {this.state.footBarVisible ?
                        <footer className="ky-view-footer flex-column">
                        <KYFooterBar ref="kyFooter" visible={this.state.footBarVisible} currPath = {currPath}/>
                        </footer>
                    : null}

                 </div>
            </div>
        );
    }
}

export default Launch;
