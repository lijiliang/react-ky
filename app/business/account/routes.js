/**
 * @fileOverview user 路由配置文件
 */
const childRoutes = [
    //消费者注册
    {
        path: '/user/regconsumer',
        getComponents(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./views/RegConsumerView'));
            }, 'kyBus/user/views/RegConsumerView');
        }
    },
    //消费者注册成功
    {
        path: '/user/regsuccess',
        getComponents(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('./views/RegSuccessView'));
            }, 'kyBus/user/views/RegSuccessView');
        }
    }
];

module.exports = {
    path: 'user',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./views/IndexView'))
        }, 'kyBus/user/views/IndexView')
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, childRoutes)
        })
    }
}
