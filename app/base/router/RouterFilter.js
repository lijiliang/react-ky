import { checkMember } from 'Utils';

const RouterFilter={
    process:function(nextState, replace, callback,prevState){
        RouterFilter.buttomBarFilter(nextState, replace, callback, prevState)
        RouterFilter.loginFilter(nextState, replace, callback, prevState)
        callback();
    },
    buttomBarFilter:function(nextState, replace, callback, prevState){
        // console.log(nextState,prevState)
        // if(nextState.location.pathname=="/login"){
        // }
    },
    loginFilter:function(nextState, replace, callback, prevState){
        const _pathname = nextState.location.pathname;
        // 如果没有登录，跳到登录页面
        if(_pathname.indexOf('user') > -1){
            checkMember();
        }
        // if(_pathname.indexOf('/pay/') > -1){
        //     checkMember();
        // }
    }
};

export default RouterFilter;
