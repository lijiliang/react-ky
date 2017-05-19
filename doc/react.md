## 生命周期
```
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
componentDidMount()
componentWillMount()  // 卸载组件
```

## 组件的生命周期方法

### Mounting(加载组件)
创建组件的实例并将其插入DOM时，会依次调用这些方法：
```
constructor()
componentWillMount()
render()
componentDidMount()
```

### Updating(更新状态)

更新可以由prop或者state的改变引起。在重新渲染组件时依次调用这些方法：
```
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate(
```
### Unmounting(卸载组件)

当从DOM中删除组件时，将调用此方法：
```
componentWillUnmount()
```

## 其它api
```
setState()
forceUpdate()
```

## 组件属性
```
defaultProps
displayName
propType
```

## 实例内部属性
```
props
state
```

## 参考
[组件的生命周期方法](https://segmentfault.com/a/1190000007828783)
