# git commit 提交注释的规范

为规范团队中使用git commit提交信息的规范性， 以下将整理一些提交信息格式。

## 格式
提交的信息包括三个部分： `Header`, `body`, `Footer`

其中， Header是必需的，Body和Footer可以省略

## Header
Header部分只有一行，包括两个字段： `type`(必需)和`subject`必需

### type
type用于说明commit的类别，可以使用以下类别：

- update: 更新某些内容
- add: 添加某些内容
- remove: 删除某些内容
- feat: 新功能(feature)
- fix: 修补bug
- doc: 文档(document)
- style: 格式(不影响代码运行的变动)
- refactor: 重构(不是新功能，也不是修改bug的代码变动)
- test: 增加测试
- chore: 构建过程或辅助工具的变动

### subject
subject是commit目的的简短描述
- 以动词开头，使用第一人称现在时，比如change
- 第一个字母小写
- 结尾不加句号

## Body
Body是对本次commit的详细描述，可以分成多行

注意：应该说明代码变动的动机，以及与以前行为的对比

## Footer
Footer部分只用于两种情况：
- 关联Issue   如：`Issue #1, #2, #3`
- 关闭Issue   如：`Close #1, #2, #3`
