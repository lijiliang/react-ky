/**
 * @fileOverview 统一管理api url
 */
import profile from './Profiles';

const Urls = {
    Login: profile.server + '/oauth/token',  //登录
    User: profile.server + '/starspower/shop/service/v1/user',           //POST 注册消费者
    UserDealer: profile.server + '/starspower/shop/service/v1/user/dealer',     //POST 注册会员/经销商
    UserCurrent: profile.server + '/starspower/shop/service/v1/user/current',   // GET 获取当前登录会员的消息
    UserLogout: profile.server + '/starspower/shop/service/v1/user/logout',     // 退出登录
    GroupReg: profile.server + '/starspower/shop/service/v1/product/group/reg', // 获取会员注册的套组信息
    CheckDealerReg: profile.server + '/starspower/shop/service/v1/user/check/dealerReg', // 验证：会员注册帐户信息表单
    CheckAddress: profile.server + '/starspower/shop/service/v1/shipAddress/check',      // 验证：收货信息表单
    Address: profile.server + '/starspower/shop/service/v1/address',      //获取所有省市区数据
};

export default Urls;
