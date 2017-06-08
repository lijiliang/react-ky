/**
 * @fileOverview 业务所有用到本地缓存助手
 * key的格式为ky_cache_[自定义]
 */
const Cache = {
    /**
     * [keys 一些默认localStorage的keys值]
     */
    keys: {
        ky_cache_access_token: 'ky_cache_access_token',   //登陆后记住token
        ky_cache_login_account: 'ky_cache_login_account', //登录用户
        ky_cache_isLogined: 'ky_cache_isLogined',         //是否已登录
        ky_cache_isAccount: 'ky_cache_isAccount',         //记住帐号
        ky_cache_last_login_time: 'ky_cache_last_login_time' //最后一次登录时间
    },
    /*
     * [set 设置localStorage的值]
     * @param {[string]} key   [key值]
     * @param {[string]} value [value值]
     */
    set: function(key, value){
        if(typeof(value)!=="string"){
            value = JSON.stringify(value);
        }
        if(value){
            window.localStorage.removeItem(key);
            window.localStorage.setItem(key, value);
        }
    },
    /*
     * [get 取localStorage的值]
     * @param {[string]} key   [key值]
     */
    get: function(key){
        return window.localStorage.getItem(key);
    },
    /*
     * [getObj 取出localStorage的obj值]
     * @param {[string]} key   [key值]
     */
    getObj: function(key){
        return JSON.parse(window.localStorage.getItem(key));
    },
    /*
     * [remove 删除localStorage的值]
     * @param {[string]} key   [key值]
     */
    remove: function(key){
        return window.localStorage.removeItem(key);
    },

    /*
     * [sessionSet 设置localSession的值]
     * @param {[string]} key   [key值]
     * @param {[string]} value [value值]
     */
    sessionSet: function(key, value){
        if(!value){
            value = null;
        }
        if(key && typeof key === 'string'){
            window.sessionStorage.setItem(key,JSON.stringify(value));
        }
    },
    /*
     * [sessionGet 取localSession的值]
     * @param {[string]} key   [key值]
     */
    sessionGet: function(key){
        return JSON.parse(window.sessionStorage.getItem(key));
    },
    /*
     * [sessionRemove 删除localSession的值]
     * @param {[string]} key   [key值]
     */
    sessionRemove: function(key){
        return window.sessionStorage.removeItem(key);
    }
};

export default Cache;
