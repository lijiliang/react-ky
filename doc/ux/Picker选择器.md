# Picker 省市区选择

## 规则
 - 尽量使用Picker来帮助用户完成输入，避免用户通过键盘直接输入。

## API
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| data    | 数据源        | `Array<{value, label, children: Array}>` |   -  |
| value   | 值, 格式是`[value1, value2, value3]`, 对应数据源的相应级层value    | Array  | - |
| format  | 格式化选中值的函数  | (val): void | `(values) => { return values.join(','); } ` |
| cols    | 列数        | Number |  `3`  |
| onChange | 选中后的回调 | (val): void | - |
| onPickerChange | 每列数据选择变化后的回调函数   | (val): void | - |
| itemStyle | 每列样式  |   Object   | -  |
| children| 通常是 `List.Item` | Object |  `List.Item`  |
| okText  | 选中的文案 | String |  `确定`  |
| dismissText  | 取消选中的文案 | String |  `取消`  |
| title  | 大标题 | String | - |
| extra  | Picker children 建议是 `List.Item`, 如果不是，需要是自定义组件(组件内需处理`onClick`/`extra`属性) | String |  `请选择`  |
| disabled  | 是否不可用 | Boolean | false |

## 例子
```js
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', padding: '0 0.3rem' }}
  >
    <div style={{ display: 'flex', height: '0.9rem', lineHeight: '0.9rem' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color: '#888' }}>{props.extra}</div>
    </div>
  </div>
);

<Picker
    data={district}
    title="选择地区"
    extra="请选择(可选)"
    value={this.state.pickerValue}
    onChange={v => this.setState({ pickerValue: v })}
>
    <CustomChildren>选择地区（自定义 children）</CustomChildren>
</Picker>


// 配合List.Item组件
<Picker
  data={district}
  title="选择地区"
  extra="请选择"
  value={this.state.pickerValue}
  onChange={v => this.setState({ pickerValue: v })}
>
  <List.Item arrow="horizontal">选择地区</List.Item>
</Picker>

<Picker
  data={district}
  title="选择地区"
  extra="请选择"
  value={this.state.pickerValue}
  onChange={v => this.setState({ pickerValue: v })}
  format={(values) => { return values.join(' / '); }}
>
  <List.Item arrow="horizontal">选择地区</List.Item>
</Picker>
```
