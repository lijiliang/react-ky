/**
 * @fileOverview 业务所有用到本地缓存助手
 * key的格式为ky_cache_[自定义]
 */
const Cache = {
    /**
     * [keys 一些默认localStorage的keys值]
     */
    keys: {
        ky_cache_login_account: 'ky_cache_login_account', //登录用户
        ky_cache_isAccount: 'ky_cache_isAccount',         //记住帐号
        ky_cache_cityArea: 'ky_cache_cityArea',           //省市区 城市信息
    },
    /**
     * [sessionKeys 一些默认sessionStorage的keys值]
     */
    sessionKeys: {
        ky_cache_access_token: 'ky_cache_access_token',   //登陆后记住token
        ky_cache_memberFlag: 'ky_cache_memberFlag',       //是否会员 true是会员，false是消费者
        ky_cache_realName: 'ky_cache_realName',           //真实名称
        ky_cache_userName: 'ky_cache_userName',           //用户帐号
        ky_cache_isLogined: 'ky_cache_isLogined',         //是否已登录
        ky_cache_last_login_time: 'ky_cache_last_login_time', //最后一次登录时间
        ky_cache_customer_username: 'ky_cache_customer_username', //会员名
        ky_cache_customer_id: 'ky_cache_customer_id',         //会员Id
        ky_cache_customer_type: 'ky_cache_customer_type',     //会员类型 0代表消费者，1代表会员
        ky_cache_regmember_info: 'ky_cache_regmember_info',   //注册会员相关信息，用于会员注册相关步骤的数据保存
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
