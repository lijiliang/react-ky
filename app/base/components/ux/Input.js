/**
 * @fileOverview: Input输入框
 */
import React from 'react';
import omit from 'omit.js';

var bfscrolltop = document.body.scrollTop;
class Input extends React.Component {
    scrollIntoViewTimeout: null;
    scrollTopBodyInterval: null;
    constructor(props) {
        super(props);
        this.state = {
            focused: props.focused || false
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('focused' in nextProps) {
            this.setState({
                focused: nextProps.focused,
            });
        }
    }

    componentDidMount() {
        if (this.props.autoFocus || this.state.focused) {
            this.refs.input.focus();
        }
        // 解决手机输入框被软键盘遮住的问题
        // https://blog.csdn.net/github_37533433/article/details/66471962
        // https://segmentfault.com/q/1010000012361207
        // ios手机
        var timer = null;
        $('input').on('focus', function() {
            clearInterval(timer);
            var index = 0;
            timer = setInterval(function() {
                if(index>5) {
                    $('body').scrollTop(1000000);
                    clearInterval(timer);
                }
                index++;
            }, 50)
        })

        // android手机
        var winHeight = $(window).height(); // 获取当前页面高度
        $(window).resize(function() {
            var resizeHeight = $(this).height();
            if (winHeight - resizeHeight > 50) {
                // 软键盘弹出
                $('body').css('height', winHeight + 'px');
            } else {
                //软键盘收起
                $('body').css('height', '100%');
            }
        });
    }

    componentWillUnmount() {
        if (this.scrollIntoViewTimeout) {
            clearTimeout(this.scrollIntoViewTimeout);
            this.scrollIntoViewTimeout = null;
        }
    }

    componentDidUpdate() {
        if (this.state.focused) {
            this.refs.input.focus();
        }
    }

    onInputBlur = (e) => {
        if (!('focused' in this.props)) {
            this.setState({
                focused: false,
            });
        }
        const value = e.target.value;
        if (this.props.onBlur) {
            this.props.onBlur(value);
        }

        // if (this.scrollTopBodyInterval) {
        //     clearInterval(this.scrollTopBodyInterval);//清除计时器
        //     document.body.scrollTop = bfscrolltop; //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
        // }
    }

    onInputFocus = (e) => {
        if (!('focused' in this.props)) {
            this.setState({
                focused: true,
            });
        }

        const value = e.target.value;
        if (this.props.onFocus) {
            this.props.onFocus(value);
        }
        if (document.activeElement.tagName.toLowerCase() === 'input') {
            this.scrollIntoViewTimeout = setTimeout(() => {
                try {
                    // document.activeElement.scrollIntoView()
                    document.activeElement.scrollIntoViewIfNeeded(true);
                } catch (e) {}
            }, 100);
            // this.scrollTopBodyInterval = setInterval(() =>{
            //     document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
            // }, 100)
        }

    }

    render() {
        const otherProps = omit(this.props, ['onBlur', 'onFocus', 'focused', 'autoFocus'])
        return (
            <input
                ref = "input"
                onBlur = {this.onInputBlur}
                onFocus = {this.onInputFocus}
                {...otherProps}
            />
        );
    }
}

export default Input;
