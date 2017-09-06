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

    //组件将要加载
    componentWillMount(){

    }

    //组件加载完成执行的动作(第一轮执行)
    componentDidMount() {
        // ...
    }

    /* 以下是4个是组件更新过程的生命周期 */
    componentWillReceiveProps(nextProps) {
        //props更新，用于设置state(第二轮开始执行)
        //注意，这里setState并不会引发新的一轮更新
        // this.setState({})
    }
    shouldComponentUpdate(nextProps, nextState) {
        //决定组件是否更新(第二轮开始执行)

        // return true;
    }
    componentWillUpdate(nextProps, nextState) {
        // 准备更新
    }
    componentDidUpdate(prevProps, prevState) {
        // 更新完成
    }

    // 组件的卸载
    componentWillMount() {
        // ...
    }

    // 箭头函数写法
    // 使用箭头函数后就不用bind(this)了
    onChange = (val) => {

    }

    // 普遍写法
    onHandle(val){

    }

    render() {
        return <div>This is a demo.</div>;
    }
}

Drawer.propTypes = {
    sidebar: PropTypes.element,  //抽屉里的内容
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

## react  无状态组件的写法
```js
const HelloBenson = (props) => <div>Hello {props.name}</div>
```
