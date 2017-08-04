/**
 * @fileOverview 登录model
 */
// import { createReducer } from 'redux-immutablejs';
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

// const initialState = Immutable.fromJS({ });
const map = Immutable.fromJS({
    userName: '',   //用户帐号
    memberFlag: '', //是否会员
    realName: '',   //真实名称
    isLogined: false,//是否已登录
    isAccount: false, //是否记住帐号
    token: '',      //用户token
});

export default CreateReducer(map, {
    [type.LOGIN](state, action){
        const newState = state.set('userName', action.user.userName)
                            .set('memberFlag', action.user.memberFlag)
                            .set('realName', action.user.realName)
                            .set('isLogined', action.user.isLogined)
                            .set('isAccount', action.user.isAccount)
                            .set('token', action.user.token)
            ;
        return newState;
    }
});
