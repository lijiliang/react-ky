/**
 * @fileOverview 生成store
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';   // rootReducer 为顶级的 Reducer

// 叠加中间件
let creatStoreWithMiddleware;
if(__DEV__){
    /*
       触发Redux DevTools
       1. Chrome 插件 Redux DevTools（默认）
       P.S: 独立窗口可调用 window.devToolsExtension.open()
    */
    window.devToolsExtension ? window.devToolsExtension() : undefined;

    creatStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(createLogger())
    )(createStore);
}else{
    creatStoreWithMiddleware = compose(
        applyMiddleware(thunk)
    )(createStore);
}

// 加载reducers
export default function ConfigureStore(initialState){
    const store = creatStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
