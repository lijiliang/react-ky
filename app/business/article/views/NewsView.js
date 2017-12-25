/**
 * @fileOverview 最新消息 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar } from 'uxComponent';
import { getActicleNews } from '../action/DataAction'

import '../resources/NewsView.less';

class NewsView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: []
        };
    }
    componentDidMount(){
        this.props.dispatch(getActicleNews((res) => {
            this.setState({
                list: res
            });
        }));
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.back();
    }
    render(){
        return(
            <div className="ky-scrollable">
                <NavBar leftContent=""
                    mode="dark"
                    onLeftClick={this.gohistoryHandle.bind(this)}
                    >最新消息</NavBar>
                <div className="m-news">
                    {
                        this.state.list.map((item) => {
                            const newsHref = '/info/' + item.id;
                            return(
                                <Link to={newsHref} className="news-item">
                                    <div className="thumb">
                                        <img src={item.img}/>
                                    </div>
                                    <div className="info">
                                        <h2>{item.title}</h2>
                                        <p>上载日期：{item.date}</p>
                                    </div>
                                    <div className="more">
                                        <span>了解更多</span>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}


export default connect(
    mapStateToProps
)(NewsView);
