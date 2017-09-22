# React React开发SPA脚手架

React开发SPA脚手架。 Webapck / ES6 + Babel / Redux / React Router

### 更新
* 2017/4/24 &nbsp; 引入 `cross-env` 解决跨平台问题
* 2017/4/26 &nbsp; 增加对`favicon`文件的支持
* 2017/4/27 &nbsp; 增加三个环境变量：`__DEV__`、`__PROD__`、`__environment__`
* 2017/5/10 &nbsp; 引入`react-addons-pure-render-mixin`提高react性能

## 快速开始
在开始前，希望您已通读如下资料

* [React 文档][react-doc]
* [Redux 文档][redux-doc]
* [React Router 文档][react-router-doc]

## 安装
```shell
$ git clone https://github.com/lijiliang/react-ky.git
$ cd react-ky
$ npm install
```

## 开发模式
```shell
npm start
```
无意外，默认浏览器就会自动打开 `localhost:9002`，您立即可以看到效果

若浏览器没有自动弹出，则请自行手动访问  

## 构建模式
```shell
npm run build
```

## 目录结构
```
.
├─ build/            # Webpack 配置目录
│   ├─ commonPath.js    # 路径配置
│   ├─ dev.js           # dev环境构建
│   ├─ prod.js          # 生产环境构建
│   ├─ webpack.base.conf.js  # 公共webpack配置文件
│   ├─ webpack.dev.conf.js   # dev环境webpack配置文件
│   ├─ webpack.prod.conf.js  # 生产环境webpack配置文件
├─ dist/             # build 生成的生产环境下的项目
├─ static/           # static 无需处理的静态资源目录
├── app/
│   ├─ base/            # 基础支持
│   │   ├── common/         # 一些公用的方法及函数
│   │   ├── components/     # 组件
│   │   ├──├── business        # 木偶组件
│   │   ├──├── ux              # 智能组件
│   │   ├── resources/      # 静态资源
│   │   ├── reducers/       # reducers,组合整个state
│   │   ├── store/          # 生成store
│   │   ├── router/         # 程序所有可跳转页面的路由配置文件
│   ├─ business/       # 源码目录（按业务进行分片）
│   │   ├── home/           # 一个单独的业务模块
│   │   ├── ├── action/           # action
│   │   ├── ├── model/            # model,其实就是单个的reducers
│   │   ├── ├── resources/        # 业务模块的静态资源
│   │   ├── ├── views/            # 业务界面
│   │   ├── ├── routers.js/       # 业务模块路由
│   │   ├── 更多模块...
│   │   ├── modelIndex.js/  # 各业务模块模型提取文件索引
│   ├── app.js         # 启动文件
│   ├── vendor.js      # 公共核心文件
│   ├── index.html     # 静态基页
├── .eslintrc.yml       # ESLint 配置
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json     #  npm包配置文件
├── README.md        #  README说明文件
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
* px自动转rem
* less
* webpack2
* ES6/7
* redux


## 技术栈
> 详情可参阅 `package.json`

* React 15.5.4
* Redux
* React Router
* Ajax 请求库（axios）
* Webpack
* ES6 + Babel

***
## 开发
* **路径别名** 的定义位于 `build/webpack.base.conf.js`，好处就是**引入与重构都很方便**
> 例如，在某组件中，引入 `userService` 需要 `import userService from '../../../services/userService'`  
> 但有了路径别名后，只需要 `import userService from 'SERVICE/userService'`  

* 开发环境**全局变量**，由 `webpack.DefinePlugin` 提供（详见 `build/webpack.base.conf.js`）
> 默认有 `__DEV__` / `__PROD__` / `__environment__`三个全局变量  
***

***
## 部署
在 `react-ky` 的命令窗口下，敲下 `npm run build`，将会在项目根目录下生成 `dist/`  
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

[react闲谈——10分钟学会react-redux异步]: https://segmentfault.com/a/1190000008063435
[react-doc]: http://reactjs.cn/react/docs/getting-started-zh-CN.html
[redux-doc]: http://camsong.github.io/redux-in-chinese/index.html
[react-router-doc]: http://react-guide.github.io/react-router-cn/
[hot-loader]: https://github.com/gaearon/react-hot-loader
[react-hot-loader]: https://github.com/gaearon/react-hot-loader/issues/218
[webpack 2 打包实战]: http://www.tuicool.com/articles/QJJRrmJ
[webpack-in-action]:  https://github.com/fenivana/webpack-in-action
[html-webpack-plugin]: https://zengxiaotao.github.io/2016/10/26/html-webpack-plugin-%E7%94%A8%E6%B3%95/
[webpack-redux参考]: https://github.com/hyy1115/react-redux-webpack
