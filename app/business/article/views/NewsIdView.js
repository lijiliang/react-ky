/**
 * @fileOverview 最新消息 详情页 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar } from 'uxComponent';
import { getActicleInfo } from '../action/DataAction'

import '../resources/NewsIdView.less';

class NewsIdView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            title: '',
            content: ''
        };
    }
    componentDidMount(){
        this._getActicleInfo();
    }
    componentWillReceiveProps(nextProps) {
        const _id = this.props.params.id;
        if(_id !== nextProps.params.id){
            this._getActicleInfo();
        }
    }
    _getActicleInfo() {
        const _id = this.props.params.id;
        this.props.dispatch(getActicleInfo(_id, (res) => {
            this.setState({
                title: res.title,
                content: res.content
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
                <div className="m-news-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
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
)(NewsIdView);
