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
        // console.log(nextState,prevState)
        if(nextState.location.pathname=="/login"){
        }
        // checkMember();
    }
}

export default RouterFilter;
