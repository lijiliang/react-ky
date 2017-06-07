/**
 * @fileOverview 统一管理api url
 */
import profile from './Profiles';

const Urls = {
    Login: profile.server + '/oauth/token',  // 登录
    user: profile.server + '/user',     // POST 注册消费者, GET 获取当前登录会员的消息
};

export default Urls;
