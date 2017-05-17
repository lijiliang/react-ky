/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { get, past } from 'kyBase/common/fetchData';

import '../resources/IndexView.less';

class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isMore: false
        };
    }
    componentDidMount(){
        console.log('homeInfo: ', this.props.homeInfo);
        /*
        async function axiosGet(){
            try{
                const response = await get(`/api/2`);
                await response;
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        }
        axiosGet();
        */

        const response = get('/api/2', {
            a:1,
            b:2
        });
        console.log(response)
        response.then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    render(){
        return(
            <div className="ky-view-main">
                <header className="ky-view-header">
                    <div className="ky-navbar">
                        <div className="ky-navbar-left">
                            <i className="icon icon-icon"></i>
                        </div>
                        <div className="ky-navbar-center">
                            <img src="https://kyaniyoupaiyun.b0.upaiyun.com/1479211326563.jpg" alt=""/>
                        </div>
                        <div className="ky-navbar-right">
                            <div className="login-info">
                                <a href="">登录</a><span>/</span>
                                <a href="">注册</a>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="ky-view-body">
                    <div className="ky-scrollable">
                        123456<br/>22222222<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>
                        body<br/>
                        09876<br/>
                        sdfghjmnbvcxz<br/>

                    </div>
                </div>
                <footer className="ky-view-footer flex-column">
                    <div className="footer-bar flex-row">
                        <div className="footer-bar-list ky-center-v">
                            <div className="bar-item">
                                <i className="icon icon-zaixiankefu"></i>
                                <div className="bar-item-text">在线客服</div>
                            </div>
                            <div className="bar-item">
                                <i className="icon icon-xiaoxi"></i>
                                <div className="bar-item-text">最新消息</div>
                            </div>
                            <div className="bar-item">
                                <i className="icon icon-shangou"></i>
                                <div className="bar-item-text">产品商城</div>
                            </div>
                            <div className="bar-item">
                                <i className="icon icon-jiarugouwuche"></i>
                                <div className="bar-item-text">购物车</div>
                                <div className="cat-num">10</div>
                            </div>
                        </div>
                    </div>
                </footer>
             </div>
        );
    }

}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        homeInfo: state.HomeModel
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
