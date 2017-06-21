# Accordion 手风琴
可以折叠/展开的内容区域。

## API

## Accordion
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| activeKey        | 当前激活 tab 面板的 key| Array or String   | 默认无，accordion模式下默认第一个元素|
| defaultActiveKey | 初始化选中面板的 key | String   | 无 |
| accordion    | `手风琴`模式 | Boolean | false (`web only`)  |
| onChange      |   切换面板的回调   | (key: string): void |  noop  |
| openAnimation (`web only`)  |  设置自定义切换动画，禁止动画可设为`{}` | Object | 参考 rc-collapse/lib/openAnimationFactory.js 文件  |

## Accordion.Panel

适用平台：WEB

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| key  | 对应 activeKey   | String          | 无     |
| header | 面板头内容 | React.Element or String | 无     |

## 举例
```js
<Accordion className="m-suborder">
    <Accordion.Panel className="pad" header={
        <div className="header-content">
            <span className="name">子订单1</span>
            <div className="bao">
                <span className="icon icon-bao"></span>
                <span className="bao-shop">保税区商品</span>
            </div>
        </div>
    }>
        <div>sadf</div>
    </Accordion.Panel>
    <Accordion.Panel header="header">
        <div>sadf</div>
    </Accordion.Panel>
    <Accordion.Panel header="header">
        Text text text text text text text text text text text text text text text
    </Accordion.Panel>
</Accordion>
```
