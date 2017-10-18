/**
 * @fileOverview  加载更多
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './KYLoadMore.less';

class LoadMore extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const isLoadingMore = this.props.isLoadingMore;
        return(
            <div className="load-more" ref="wrapper">
                {
                    isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle.bind(this)}>点击加载更多</span>
                }
            </div>
        );
    }
    loadMoreHandle(){
        // 执行传递过来的loadMoreData函数
        this.props.loadMoreFn();
    }
    componentDidMount(){
        const loadMoreFn = this.props.loadMoreFn;
        const wrapper = this.refs.wrapper; // 拿到React dom
        let timeoutId;
        function callback(){
            const top = wrapper.getBoundingClientRect().top;  // 获取元素到项部的距离
            const windowHeight = window.screen.height;
            if(top && top < windowHeight){
                // 当 wrapper 已经被滚动到暴露在页面的可视范围之内就触发
                loadMoreFn();
            }
        }
        // 触发滚动
        window.addEventListener('scroll', function(){
            // 如果正在加载中，则不处理
            if(this.props.isLoadingMore){
                return;
            }

            // 节流
            if(timeoutId){
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(callback, 50);
        }.bind(this), false);
    }
}


export default LoadMore;
