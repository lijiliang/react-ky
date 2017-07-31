/**
 * @fileOverview 统一管理api url
 */
import profile from './Profiles';

const Urls = {
    Login: profile.server + '/oauth/token',  //登录
    User: profile.server + '/starspower/shop/service/v1/user',           //POST 注册消费者
    UserCurrent: profile.server + '/starspower/shop/service/v1/user/current',   // GET 获取当前登录会员的消息
    UserLogout: profile.server + '/starspower/shop/service/v1/user/logout',     // 退出登录
    CheckDealerReg: profile.server + '/starspower/shop/service/v1/user/check/dealerReg',     // 验证：会员注册帐户信息表单
    Address: profile.server + '/starspower/shop/service/v1/address',      //获取所有地址数据
};

export default Urls;
