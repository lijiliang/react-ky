/**
 * @fileOverview 工具类
 */
import { Toast } from 'uxComponent';
import { Cache } from 'kyCommon';
import { hashHistory } from 'react-router';


function goLogined(flag){
    const _href = window.location.href;
    const _url = window.location.origin + '/#/login';
    if(flag){
        // window.location.href = _url + '?backUrl=' + encodeURIComponent(_href);
        hashHistory.push('/login?backUrl=' + encodeURIComponent(_href))
    }else{
        window.location.href = _url;
    }
}

/*
 * [hideLoading 关闭加载状态]
 */
export function hideLoading() {

}

/*
 * [failLoading 请求服务器错误]
 */
export function failLoading(err) {
    Toast.hide();
    Toast.fail('服务器请求错误!');
}

/*
 * [checkMember 检测用户是否登录]
 */
export function checkMember(){
    const _token = Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token);
    const _isLogined = Cache.sessionGet(Cache.sessionKeys.ky_cache_isLogined);
    console.log(_token, _isLogined)
    if (_token && _isLogined){
        //return true;
    } else {
        console.log('df')
        goLogined(true);
        //goLogined(true);//带返回地址
        // return false;
    }
}

/*
 * [goLogin 跳转到登陆页面]
 * @param  {[Boolean]} flag  [是否需要跳到登录页]
 */
export function goLogin(flag) {
    const _href = window.location.href;
    const _url = window.location.origin + '/#/login';
    if(flag){
        window.location.href = _url + '?backUrl=' + encodeURIComponent(_href);
    }else{
        window.location.href = _url;
    }
}

/*
 * [getQueryString Url查询，获取某个查询]
 * @param  {[String]} name [要查询的key]
 */
export function getQueryString(name){
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.href.substr(1).match(reg);
    console.log('r', r)
    if (r !== null) return unescape(r[2]);
    return null;
}

/*
 * [debounce 截流]
 * @param  {[Function]} func  [传入一个函数]
 * @param  {[Number]} delay [延迟秒数s
 */
export function debounce(func, delay) {
    let timer;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/*
 * [dedupe 数组去重]
 * @param  {[Array]} array [一个数组]
 * @return {[Object]}      [返回一个处理后的数组]
 */
export function dedupe (array) {
    return Array.from(new Set(array));
}

// 导出
// export default {
//     failLoading,
//     debounce,
//     dedupe
// };
