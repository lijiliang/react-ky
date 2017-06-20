# List 列表

单个连续模块垂直排列，显示当前内容，状态和可进行的操作

## 规则
- 一般由主要信息、主要操作、次要信息、次要操作组成。
- 主要信息和主要操作放在左边，次要信息和次要操作放在列表右边。

## API

### List
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| renderHeader | list header | ():void | 无 |
| renderFooter | list footer | ():void | 无 |

### List.Item

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| thumb       | 缩略图(当为 string 类型时作为 img src)  | String/React.Element |  无  |
| iconName    | icon图标 | String |  无  |
| extra      | 右边内容        | String/React.Element |  无  |
| arrow      | 箭头方向(右,上,下), 可选`horizontal`,`up`,`down`,`empty`，如果是`empty`则存在对应的dom,但是不显示   | String |   无  |
| align    |    Flex 子元素垂直对齐，可选`top`,`middle`,`bottom`  | String   | `middle` |
| onClick    | 点击事件的回调函数 | (): void |  无  |
| error(`web only`)    | 报错样式,右侧文字颜色变成橙色 | Boolean  | `false`  |
| multipleLine    | 多行 | Boolean  | `false`  |
| wrap    | 是否换行，默认情况下，文字超长会被隐藏， | Boolean  | `false`  |
| activeStyle(`web only`)    | 自定义active的样式 | Object  |   |
| platform (`web only`) |  设定组件的平台特有样式, 可选值为 `android`, `ios`， 默认为 `cross`， 即组件会自动检测设备 UA 应用不同平台的样式    | String | `'cross'`|
| small |  小列表，专门放左右信息，行高70， 购物车页面用到   | Boolean | `false`|

### List.Item.Brief

辅助说明

## 举例
```js
import List from 'kyBase/components/ux/List';
const Item = List.Item;
const Brief = Item.Brief;

<List renderHeader={() => '基本样式'} className="my-list">
  <Item extra={'内容内容'}>标题文字</Item>
</List>
<List renderHeader={() => '带副标题'} className="my-list">
    <Item arrow="horizontal" multipleLine>
      标题文字 <Brief>副标题</Brief>
    </Item>
    <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {}}
          platform="android"
    >
          ListItem （Android）<Brief>设置了Click事件会有material水波纹点击效果</Brief>
    </Item>
    <Item
      arrow="horizontal"
      thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
      multipleLine
      onClick={() => {}}
    >
      标题文字 <Brief>副标题</Brief>
    </Item>
</List>
<List renderHeader={() => '右侧自定义（无内容 / 文字 / 图片）'} className="my-list">
    <Item>标题文字</Item>
    <Item arrow="horizontal" onClick={() => {}}>标题文字</Item>
    <Item extra="内容内容" arrow="horizontal" onClick={() => {}}>标题文字</Item>
    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
      标题文字 <Brief>副标题</Brief>
    </Item>
  </List>
  <List renderHeader={() => '垂直居中对齐'} className="my-list">
    <Item multipleLine extra="内容内容">
      标题文字 <Brief>副标题</Brief>
    </Item>
  </List>
  <List renderHeader={() => '左侧带图标'}>
 <Item
   thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
   arrow="horizontal"
   onClick={() => {}}
 >我的钱包</Item>
 <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">我的花销占比</Item>
</List>
<List renderHeader={() => '文字换行'} className="my-list">
 <Item data-seed="logId">单行模式，文字超长则隐藏；文本内容文本内容文本内容文本内容</Item>
 <Item wrap>多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容</Item>
 <Item extra="内容内容" multipleLine align="top" wrap>
   多行标题文字超长直接折行，文字可能比较长、文字可能比较长、
 </Item>
 <Item extra="没有箭头" arrow="empty" className="spe" wrap>
   极个别情况下，单行标题文字可能比较长，文字可能比较长、文字可能比较长、靠近右边会折行
 </Item>
</List>
<List renderHeader={() => '其他'} className="my-list">
 <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>点击禁用</Item>
 <Item>
   <select defaultValue="1">
     <option value="1">这是原生 html select</option>
     <option value="2" disabled>不可选</option>
     <option value="3">选项3</option>
   </select>
 </Item>
</List>
```
