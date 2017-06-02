/**
 * @fileOverview 统一管理api url
 */
import profile from './Profiles';

const Urls = {
    Login: profile.server + '/oauth/token',  // 登录
    reg: profile.server + '/oauth/reg',      // 注册
};

export default Urls;
