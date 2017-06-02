## react es6 推荐默认写法
```js
import React, {Component} from 'react';
class App extends Component {
    // 类型检查
    static propTypes = {
        // ...
    };
    // 默认类型
    static defaultProps = {
        // ...
    };
    constructor(props) {
        super(props);
        this.state = {
            // ...
        };
    }
    // 组件的卸载
    componentWillMount() {
        // ...
    }
    componentDidMount() {
        // ...
    }

    /* 以下是4个是组件更新过程的生命周期 */
    componentWillReceiveProps(nextProps) {
    // this.setState({})
    }
    shouldComponentUpdate(nextProps, nextState) {


        // return true;
    }
    componentWillUpdate(nextProps, nextState) {
        // ...
    }
    componentDidUpdate(prevProps, prevState) {
        // ...
    }

    render() {
        return <div>This is a demo.</div>;
    }
}
```
