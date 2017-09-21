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
 * [checkMember 检测用户是否登录,如果没登录就跳到登录页面]
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
 * [hasMember 检测用户是否登录]
 */
export function hasMember(){
    const _token = Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token);
    const _isLogined = Cache.sessionGet(Cache.sessionKeys.ky_cache_isLogined);
    if (_token && _isLogined){
        return true;
    } else {
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

/*
 * [raw 根据一个对象，生成拼接好的字符串]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 * 根据一个对象，返回 aa=aa&bb=bb&cc=cc  的值
 */
export function raw (args) {
    let keys = Object.keys(args);
    let newArgs = {};
    let str = '';

    keys = keys.sort();
    keys.forEach((key) => {
        newArgs[key.toLowerCase()] = args[key];
    });

    for (let k in newArgs) {
        str += '&' + k + '=' + newArgs[k];
    }

    return str.substr(1);
}

/*
 * [ unescapeHTML html转换 ]
 * @param {string} str 未转换的html字符串
 * @returns {string}
*/
export function unescapeHTML(str){
    const _str = str;
    return _str.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, '\'');
}

/*
 * [getIdCardAge 根据身份证号码计算年龄]
 * @param  {[string]} idCard [身份证号]
 * @return {[number]}        [返回年龄]
 */
export function getIdCardAge(idCard){
    const len= (idCard + '').length;
    if(len === 0){
        return 0;
    }else {
        if((len !== 15) && (len !== 18)){  // 身份证号码只能为15位或18位，其它不合法
            return 0;
        }
    }

    let strBirthday = '';
    if(len === 18){
        strBirthday = idCard.substr(6, 4) + '/' + idCard.substr(10, 2) + '/' + idCard.substr(12, 2);
    }
    if(len === 15){
        strBirthday = '19' + idCard.substr(6, 2) + '/' + idCard.substr(8, 2) + '/' + idCard.substr(10, 2);
    }
    // 时间字符串里，必须是'/'
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    if(nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())){
        age--;
    }
    return age;
}
// 导出
// export default {
//     hideLoading,
//     failLoading,
//     checkMember
// };
