# React React开发SPA脚手架

React开发SPA脚手架。 Webapck / ES6 + Babel / Redux / React Router

### 更新
* 2017/4/24 &nbsp; 引入 `cross-env` 解决跨平台问题
* 2017/4/26 &nbsp; 增加对`favicon`文件的支持
* 2017/4/27 &nbsp; 增加四个环境变量：`__DEV__`、`__PROD__`、`__COMPONENT_DEVTOOLS__`、`__WHY_DID_YOU_UPDATE__`
* 2017/5/10 &nbsp; 引入`react-addons-pure-render-mixin`提高react性能 *

## 快速开始
在开始前，希望您已通读如下资料

* [React 文档][react-doc]
* [Redux 文档][redux-doc]
* [React Router 文档][react-router-doc]

## 安装
```shell
$ git clone https://github.com/lijiliang/react-ky.git
$ cd react-frame
$ npm install
```

## 开发模式
```shell
npm start
```
无意外，默认浏览器就会自动打开 `localhost:9092`，您立即可以看到效果

若浏览器没有自动弹出，则请自行手动访问  

## 构建模式
```shell
npm run build
```

## 目录结构
```
.
├─ build/            # Webpack 配置目录
├─ dist/             # build 生成的生产环境下的项目
├─ src/              # 源码目录（开发都在这里进行）
│   ├── static/         # 放置需要经由 Webpack 处理的静态文件
│   ├── components/     # 木偶组件（COMPONENT）
│   ├── containers/     # 智能组件（COMPONENT）
│   ├── constants/      # 放置actions的类型
│   ├── actions/          # （ACTION）
│   ├── reducers/         # （REDUCER）
│   ├── store/            # （STORE）
│   ├── routes/        # 路由（ROUTE）
│   ├── fetch/      # 服务（FETCH，用于统一管理 XHR 请求）
│   ├── utils/         # 工具库（UTIL）
│   ├── app.js         # 启动文件
│   ├── vendor.js      # 公共核心文件
│   ├── index.html     # 静态基页
├── .babelrc         # Babel 转码配置
├── .eslintignore    # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc        # ESLint 配置
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json     #  npm包配置文件
```

## 特色
* 简明的目录结构，更好的模块分离
* 区分开发环境与生产环境
* 生产环境entry文件输出加上hash值
* 第三方库与业务代码分开打包
* 配置favicon
* 引入[React Hot Reload][hot-loader],支持热替换
* 引入 [路径别名] 简化import路径,实现优雅的加载模式
* [Redux Logger][redux-logger] 打印动作及前后状态变化
* 利用[postcss-loader]为各个浏览器自动加前缀
* 利用React-router V4.4作为前端路由
* less
* webpack2
* ES6/7
* redux


## 技术栈
> 详情可参阅 `package.json`

* React 15.5.4
* Redux
* React Router
* Ajax 请求库（Superagent / jQuery-Ajax / ...）
* Webpack
* ES6 + Babel
* jQuery + BootStrap (UI)

***
## 开发
* **路径别名** 的定义位于 `build/webpack.base.conf.js`，好处就是**引入与重构都很方便**
> 例如，在某组件中，引入 `userService` 需要 `import userService from '../../../services/userService'`  
> 但有了路径别名后，只需要 `import userService from 'SERVICE/userService'`  

* 开发环境**全局变量**，由 `webpack.DefinePlugin` 提供（详见 `build/webpack.base.conf.js`）
> 默认有 `__DEV__` / `__PROD__` / `__COMPONENT_DEVTOOLS__` / `__WHY_DID_YOU_UPDATE__` 四个全局变量  
***

***
## 部署
在 `react-frame` 的命令窗口下，敲下 `npm run build`，将会在项目根目录下生成 `dist/`  
> 您可以使用命令行静态资源服务器 [serve](https://github.com/tj/serve) ( `npm i serve -g` )，敲下 `serve dist/ -p [端口]` 来快速查看 build 后的项目  
> 还可以自己配置一个`nginx`服务器进行快速便捷地实现静态资源服务器
>
> 关于生产环境下的部署与优化，后续加上。
***

## 记录
> ps: 默认`.babelrc`配置文件
```
{
  "presets": [["es2015", {"modules": false}], "react", "stage-0"],
  "plugins": ["react-hot-loader/babel", "transform-runtime", "transform-decorators-legacy"]
}

```
## 参考
* [davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
* [探讨 React 项目目录结构](http://marmelab.com/blog/2015/12/17/react-directory-structure.html)

react闲谈——10分钟学会react-redux异步： https://segmentfault.com/a/1190000008063435

[react-doc]: http://reactjs.cn/react/docs/getting-started-zh-CN.html
[redux-doc]: http://camsong.github.io/redux-in-chinese/index.html
[react-router-doc]: http://react-guide.github.io/react-router-cn/
[hot-loader]: https://github.com/gaearon/react-hot-loader
[react-hot-loader]: https://github.com/gaearon/react-hot-loader/issues/218
[webpack 2 打包实战]: http://www.tuicool.com/articles/QJJRrmJ
[webpack-in-action]:  https://github.com/fenivana/webpack-in-action
[html-webpack-plugin]: https://zengxiaotao.github.io/2016/10/26/html-webpack-plugin-%E7%94%A8%E6%B3%95/
[webpack-redux参考]: https://github.com/hyy1115/react-redux-webpack
