import Immutable from "immutable";

const CreateReducer = (initialState, handlers, setInitialStateActions = []) => {
    //加入 setInitialStateActions 方便将model重置成初始化状态
    // setInitialStateActions 为数组，以应付不同的组合情况
    let __initialState;
    // 判断是否 immtable 对象
    if (initialState.hasOwnProperty('__altered')) {
        //immtable 对象
        __initialState = initialState.set('__initialState', JSON.stringify(initialState.toJS()));

    } else {
        //普通对象
        //深复制
        initialState['__initialState'] = Immutable.Map(initialState).toJS();
        __initialState = initialState
    }
    setInitialStateActions.forEach(function(actionType) {
        handlers[actionType] = (state, action) => {
            //恢复初始化状态
            // 判断是否 immtable 对象
            if (state.hasOwnProperty('__altered')) {
                //immtable 对象
                let __initialStateJS = state.get('__initialState');
                let __initialStateImmutable = Immutable.Map(JSON.parse(__initialStateJS));
                let __reInitialState = __initialStateImmutable.set('__initialState', __initialStateJS);
                return __reInitialState
            } else {
                //普通对象
                //深复制
                let __initialStateJS = state['__initialState']
                __initialStateJS['__initialState'] = Immutable.Map(__initialStateJS).toJS();
                return __initialStateJS

            }
        }
    })

    return function(state = __initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}
export default CreateReducer
