/**
 * @fileOverview 工具类
 */
import { Toast } from 'uxComponent';
import { Cache } from 'kyCommon';
import { hashHistory } from 'react-router';

/*
 * [hideLoading 关闭加载状态]
 */
export function hideLoading() {

}

/*
 * [failLoading 请求服务器错误]
 */
export function failLoading(err) {
    const response = err.response || {};
    Toast.hide();
    if(response.status === 0){
        Toast.fail('服务器连接失败!');
        return;
    }
    if(response.status === 401 && response.data.error === 'invalid_token'){
        Toast.fail('登录超时，请重新登录!', 1);
        clearUserSession();
        setTimeout(() => {
            checkMember();
        }, 1000);
    }else{
        Toast.fail(`服务器请求错误!`);
    }
}

/*
 * [checkMember 检测用户是否登录]
 */
export function checkMember(){
    const _token = Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token);
    const _isLogined = Cache.sessionGet(Cache.sessionKeys.ky_cache_isLogined);
    if (_token && _isLogined){
        return true;
    } else {
        goLogin(true); //带返回地址
        return false;
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
    const _url = window.location.href;
    const _str = _url.substring(_url.indexOf('?'));
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = _str.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}

/*
 * [clearUserSession 清除用户相关sessionStorage]
 */
export function clearUserSession() {
    Cache.sessionRemove(Cache.sessionKeys.ky_cache_access_token);
    Cache.sessionRemove(Cache.sessionKeys.ky_cache_realName);
    Cache.sessionRemove(Cache.sessionKeys.ky_cache_userName);
    Cache.sessionRemove(Cache.sessionKeys.ky_cache_memberFlag);
    Cache.sessionRemove(Cache.sessionKeys.ky_cache_isLogined);
    Cache.sessionRemove(Cache.sessionKeys.ky_cache_last_login_time);
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
//     hideLoading,
//     failLoading,
//     checkMember
// };
