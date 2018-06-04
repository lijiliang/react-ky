/**
 * @fileOverview: Input输入框
 */
import React from 'react';
import omit from 'omit.js';

class Input extends React.Component {
    scrollIntoViewTimeout: null;
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
                    document.activeElement.scrollIntoView()
                    // document.activeElement.scrollIntoViewIfNeeded();
                } catch (e) {}
            }, 100);
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
