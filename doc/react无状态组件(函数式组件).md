# react无状态组件(函数式组件)

## 特征
- 不需要声明类，可以避免大量的譬如extends或者constructor这样的代码
- 不需要显示声明this关键字，在es6的类声明中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特征，我们不需要再强制绑定
```js
// es6 组件
import React from 'react'
import PropTypes from 'prop-types';

class HelloWorld extends React.Component {
    constructor(props){
        super(props)
    }

    sayHi(event){
        console.log(`Hi ${this.props.name}`)
    }

    render() {
        return(
            <div>
                <a href="#" onClick={this.sayHi.bind(this)}>Say Hi</a>
            </div>
        )
    }
}
HelloWorld.propTypes = {
    name: PropTypes.string.isrRequired
};

export default HelloWorld


// 无状态组件
import React from 'react'
import PropTypes from 'prop-types';

const HelloWorld = (props) => {
    const sayHi = (event) => {
        console.log(`Hi ${props.name}`)
    }
    return (
        <div>
            <a href="#" onClick={sayHi}>Say Hi</a>
        </div>
    )
}
HelloWorld.propTypes = {
    name: PropTypes.string.isrRequired
};

export default HelloWorld
```
另外，在无状态的组件函数中，我们也可以访问Context的
```js
const Text = (props, context) =>
  <p style={context}>props.children</p>;
Text.contextTypes = {
  fontFamily: PropTypes.string
};
```

## 无状态组件适用场景
- 无需state,即不处理用户的输入，组件的所有数据都是依赖props的传入的
- 不需要用到生命周期函数
