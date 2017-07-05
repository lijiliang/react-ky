## mobile 开发设计规范基础约定
 * 开发中使用px为css单位，build后根据`1rem=100px`(dpr=2的情况下)换算rem单位
 * mobile规范使用`flex`布局，意味着一般组件不设置具体的宽度值。不做`media query`等样式设置。
 * 视觉设计不使用同比例放大模式，即任何设备不管宽度多少，组件的高度都设计为同一个值。

## 何为高清
高清就是在高清屏的手机上，`1px`实际显示的物理像素不为1，到时页面显示是会有1px的像素偏差，尤其是边框，比较影响页面的显示效果

* 用脚本设置 html 的 viewport （**不要再写 html meta 标签去设置 viewport**）：在 html > head 里
```html
<!DOCTYPE html>
    <head>
        <meta charset="utf-8" />
        <title>title</title>
        <script>/** 高清方案脚本 */</script>
    </head>
    <body></body>
</html>
```
拷贝引入以下高清方案脚本，**请内联写到所有 css 引用之前, 否则部分安卓机有问题**（此脚本内部称为flex高清模式，支持任意等比缩放、兼容性好)
```js
!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);
flex(100, 1);
```
未压缩源码：
```js
'use strict';

/**
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
const win = window;
export default win.flex = (baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const doc = win.document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  const scale = 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
  doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr * _fontscale}px`;
};
```
* 随后新的样式值都写成和视觉稿上标注的值（视觉稿标注一般以设备物理点为单位，像iphone6 屏幕 750 的宽度）一样即可。
* webpack2 里新增 `pxtorem`配置即可，代码如下：
```js
const pxtorem = require('postcss-pxtorem');


new webpack.LoaderOptionsPlugin({
    options : {
        postcss : function(){
            return [
                pxtorem({
                    rootValue: 100,
                    propWhiteList: [],
                })
            ];
        }
    }
}),
```
* 异常排查：通常以iPhone6模拟器为基准，查看`document.documentElement.clientWidth`（浏览器渲染出来的网页宽度），
  * 如果是750，则代表高清方案设置成功，接下来就是webpack的设置。
  * 如果是350，代表可能写死了meta标签，请先完成动态设置viewport这一步。
  * 如果是980左右，代表没有生成meta标签也没有写死meta标签，按照PC浏览器来渲染网页宽度。请先完成动态设置viewport这一步。

  ## 内联样式如何获取正确的DPR。
    一般情况下，内联样式仅需要直接将px单位换算成rem单位进行设置，即可正确渲染。
    在一些几特殊的场景下，例如需要渲染echart图表，这个时候样式的单位只能是px。这是可以取当前设备渲染后的真实的缩放比例，来设置一个常量，例如DPR。然后对样式进行赋值时做一下倍乘即可。

  ```js
  let isMobile = false;
  if ((/android/i).test(navigator.userAgent) || (/iphone|ipad/i).test(navigator.userAgent)) {
    const meta = document.querySelector('meta[name="viewport"]');
    const content = (meta as any).content;
    if (!(/initial-scale=1,/g.test(content))) {
      isMobile = true;
    }
  }
  DPR = isMobile ? (window.devicePixelRatio || 1) : 1,
  ```
  以上的代码读取当前网页设置的meta信息，如果有设置，且initial-scale不等于1，则认为该设备执行了高清渲染，否则，认为当前网页的DPR设置为了1，即此次渲染没有执行高清方案。

## 附上普遍rem的做法
less设置
```less
/* 定义rem */
@font-size-num:100;
@rem:1rem * @font-size-num;
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <title>kyani Mobile</title>
    <script>
    (function (doc, win) {
        var doc = document;
        var win = window;
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                var fZ = 100 * (clientWidth / 750);
                if (fZ >= 100) {
                    docEl.style.fontSize = 100 + 'px';
                } else if (fZ <= 42) {
                    docEl.style.fontSize = 42 + 'px';
                } else {
                    docEl.style.fontSize = fZ + 'px';
                }
            };
        recalc();

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    </script>
</head>
<body>

</body>
</html>
```

另外一种实现方式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>kyani Mobile</title>
    <script>
    !function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓倍屏为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
    </script>
</head>
<body>
    <div id="root-container" style="height:100%;width: 100%; overflow: hidden;"></div>
</body>
</html>

```

## 参考
[viewport设置](https://github.com/ant-design/ant-design-mobile/wiki/viewport详解)
