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

    // 箭头函数写法
    onChange = (val) => {

    }

    // 普遍写法
    onHandle(val){

    }

    render() {
        return <div>This is a demo.</div>;
    }
}
```
## 子级调用父级函数
```js
//子级调用父级函数
numItemChangeHandle = (val) => {
    this.props.numItem(this.props.index, val);
}
onChange={this.numItemChangeHandle}

// 与上面功能一样
onChange={(val)=>{this.props.numItem(this.props.index, val)}}
```

## 传递参数
```js
onChange={this.numItemChangeHandle.bind(this, 参数一，参数二,...)}

//接收
numItemChangeHandle(参数一，参数二, e){

}
```
