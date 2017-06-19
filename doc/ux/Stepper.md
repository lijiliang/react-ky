# Stepper Stepper 步进器 用于商品的加减处理

## API
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| min     | 最小值   | Number | -Infinity        |
| max     | 最大值       | Number      | Infinity           |
| value     | 当前值       | Number      |            |
| step     | 每次改变步数，可以为小数  | Number or String      |  1      |
| defaultValue     | 初始值       | Number      |            |
| onChange     | 变化时回调函数      | (): void      |            |
| disabled     | 禁用       | Boolean      |      false      |
| readOnly     | input 只读       | Boolean      |      false      |
| showNumber(`web only`)    | 是否显示数值，默认不显示  | Boolean      |      false      |
| isRed    | 是否为亮色  |    Boolean   |      false     |
| onOkClick    | 右侧确认回调函数  | (): void      |            |


## 使用举例
```js
<Stepper
    showNumber
    min={1}
    max={500}
    value={this.state.showNumber}
    onChange={this.onChange}
/>

<Stepper
    showNumber
    min={1}
    max={500}
    isRed
    value={this.state.showNumber}
    onChange={this.onChange}
    onOkClick={this.onClickHandle}
/>
```
