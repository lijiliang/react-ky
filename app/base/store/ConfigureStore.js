/**
 * @fileOverview 生成store
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';

import rootReducer from '../reducers';   // rootReducer 为顶级的 Reducer

// const initialState = Immutable.fromJS({});

// 叠加中间件
let store;

// 加载reducers
export default function ConfigureStore(initialState){
    if(__DEV__){
        /**
         * 触发Redux DevTools 及 打印 logger
         * 1. Chrome 插件 Redux DevTools（内置）
         * P.S: 独立窗口可调用 window.devToolsExtension.open()
         * window.devToolsExtension ? window.devToolsExtension() : undefined;
         */
        store = createStore(rootReducer, initialState, composeWithDevTools(
            applyMiddleware(
                thunk,
                logger
            )
        ));
    }else{
        store = createStore(rootReducer, initialState, applyMiddleware(
                thunk
            )
        );
    }
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
