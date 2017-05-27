// import { createReducer } from 'redux-immutablejs';
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

// const initialState = Immutable.fromJS({ });
const map = Immutable.Map({
    account: '',  //帐号
    password: '', //密码
    isLogined: false,//是否已登录
    autoLogin: true, //是否自动登录
    token: '',      //用户token
});

export default CreateReducer(map, {
    [type.LOGIN](state, action){
        console.log(action)
        const newState = state.set('account', action.user.username)
                            .set('password', action.user.password)
                            .set('isLogined', action.isLogined)
                            .set('autoLogin', action.autoLogin)
                            .set('token', action.user.token)
            ;
        return newState;
    }
});
