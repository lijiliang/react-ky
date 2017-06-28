# Modal对话框

用法显示系统重要信息，并请求用户进行操作反馈。如,操作某个重要内容时，弹出Modal进行二次确认。

## API

适用平台：WEB、React-Native

### Modal

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| prefixCls (web only)      | 样式类名前缀 |    String   | `ky-modal`      |
| visible      | 对话框是否可见 | Boolean          | false           |
| onClose      | 点击 x 或 mask 回调       | (): void   | 无 |
| title (only transparent)       | 标题           | React.Element    | 无           |
| closable    | 是否显示关闭按钮 | Boolean    | `false`        |
| maskClosable (only transparent) | 点击蒙层是否允许关闭 | Boolean   | true       |
| footer  (only not transparent)     | 底部内容       |  Array [{text, onPress}]    | [] |
| transparent | 是否弹窗模式       | Boolean   |  false |
| animationType (`rn only`) | 可选: 'slide-down/up'(transparent 模式下) / 'fade' / 'slide'(仅非 tranparent) | String |   fade |
| style (`web only`) |  样式    | Object | 透明模式下: {width: '286px', height: 'cross'}, <br />非透明模式:  {width: '100%', height: '100%'} (web)|

### Modal.alert(title, message, actions?)

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| title        | 标题                      | String 或 React.Element   | 无            |
| message      | 提示信息                  | String 或 React.Element    | 无    |
| actions         | 按钮组, [{text, onPress, style}]       | Array | 无            |

`Modal.alert(title, message, actions?).close()` 可以在外部关闭 Alert

### Modal.prompt(title, message, callbackOrActions, type?, defaultValue?)

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| title        | 标题                      | String 或 React.Element   | 无            |
| message      | 提示信息                  | String 或 React.Element                    | 无    |
| callbackOrActions  | 按钮组 [{text, onPress}] 或回调函数      | Array or Function | 无            |
| type       | prompt 的样式   | String (`default`, `secure-text`, `login-password`)|  `default`  |
| defaultValue       | 默认值(input 为 password 类型不支持)   | String |   -  |

Modal.prompt(title, message, callbackOrActions, type?, defaultValue?).close()` 可以在外部关闭 prompt

### Modal.operation(actions?)

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| actions         | 按钮组, [{text, onPress, style}]       | Array | 无            |

Modal.operation(actions?).close()` 可以在外部关闭 operation

## 使用举例
```js
import { Button, Modal, Toast} from 'uxComponent';
const alert = Modal.alert;
const prompt = Modal.prompt;

this.state = {
    modal1: false,
    modal3: false,
};

showModal = key => (e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
        [key]: true,
    });
}
onClose = key => () => {
    this.setState({
        [key]: false,
    });
}


const showAlert = () => {
  const alertInstance = alert('删除', '确定删除么???', [
    { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
    { text: 'OK', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 2000);
};

// 默认对话框
<Button title="默认对话框" onClick={this.showModal('modal1')}/>
<Modal
  title="这是 title"
  transparent
  maskClosable={true}
  visible={this.state.modal1}
  onClose={this.onClose('modal1')}
  footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
>
  这是内容...<br />
  这是内容...<br />
</Modal>

<Button title="Modal 对话框" onClick={this.showModal('modal3')} />
<Modal
title="这是 title"
transparent
maskClosable={false}
visible={this.state.modal3}
onClose={this.onClose('modal3')}
footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal3')(); } }]}
/>

// 警告弹窗
<Button title="自定义按钮" onClick={showAlert} />
<Button title="确认对话框" onClick={() => alert('删除', '确定删除么???', [
   { text: '取消', onPress: () => console.log('cancel') },
   { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
 ])}
/>

<Button title="按钮 Promise" onClick={() => alert('删除', '确定删除么???', [
    { text: '取消', onPress: () => console.log('cancel') },
    {
     text: '确定',
     onPress: () => new Promise((resolve) => {
       Toast.info('onPress Promise', 1);
       setTimeout(resolve, 1000);
     }),
     style: { fontWeight: 'bold' },
    },
])}
/>
<Button title="弹出多个按钮"  onClick={() => alert('多个按钮情况', <div>这里有好多个按钮, 你试试</div>, [
    { text: '按钮一', onPress: () => console.log('第0个按钮被点击了') },
    { text: '按钮二', onPress: () => console.log('第1个按钮被点击了') },
    { text: '按钮三', onPress: () => console.log('第2个按钮被点击了') },
])}
/>

//输入弹窗
<Button title="按钮 Promise"  onClick={() => prompt('输入名字', '这是名字的 message',
  [
    { text: '取消' },
    {
      text: '提交',
      onPress: value => new Promise((resolve) => {
        Toast.info('onPress promise', 1);
        setTimeout(() => {
          resolve();
          console.log(`value:${value}`);
        }, 1000);
      }),
    },
  ])}
/>

<Button title="输入框默认值" onClick={() => prompt('默认值', '默认值 defaultValue 类型', [
  { text: '取消' },
  { text: '提交', onPress: value => console.log(`输入的内容:${value}`) },
], 'plain-text', '100')}
/>

<Button title="输入框密码形式" onClick={() => prompt(
      '输入密码',
      '这是密码message,可以不要',
      password => console.log(`password: ${password}`),
      'secure-text',
    )}
/>

<Button title="自定义按钮形式" onClick={() => prompt(
      '输入密码',
      '这是密码message,可以不要',
      [
        { text: '取消' },
        { text: '提交', onPress: password => console.log(`密码为:${password}`) },
      ],
      'secure-text',
    )}
/>

<Button title="输入框登录形式" onClick={() => prompt(
      '登录',
      '输入用户名和密码',
      (login, password) => console.log(`login: ${login}, password: ${password}`),
      'login-password',
    )}
/>

// 操作弹窗
<Button title="操作按钮" onClick={() => operation([
  { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
  { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
])}
/>
```
