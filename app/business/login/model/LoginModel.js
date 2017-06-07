// import { createReducer } from 'redux-immutablejs';
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

// const initialState = Immutable.fromJS({ });
const map = Immutable.fromJS({
    username: '',  //帐号
    password: '', //密码
    isLogined: false,//是否已登录
    isAccount: false, //是否记住帐号
    token: '',      //用户token
});

export default CreateReducer(map, {
    [type.LOGIN](state, action){
        console.log(action)
        const newState = state.set('username', action.user.username)
                            .set('password', action.user.password)
                            .set('isLogined', action.user.isLogined)
                            .set('isAccount', action.user.isAccount)
                            .set('token', action.user.token)
            ;
        return newState;
    }
});
