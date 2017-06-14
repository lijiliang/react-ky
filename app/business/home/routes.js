/**
 * @fileOverview home 路由配置文件
 */
module.exports = {
    path: '/',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./views/IndexView'))
        },"kyBus/home/views/IndexView")
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./views/IndexView'))
        })
    }
}
