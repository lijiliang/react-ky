/**
 * @fileOverview login 路由配置文件
 */
module.exports = {
    path: '/login(/:isVisitor)',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./views/LoginView'))
        },"kyBus/login/views/LoginView")
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, childRoutes)
        })
    }
}
