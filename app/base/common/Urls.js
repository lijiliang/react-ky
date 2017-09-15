/**
 * @fileOverview 统一管理api url
 */
import profile from './Profiles';

const Urls = {
    Login: profile.server + '/oauth/token',  //登录
    User: profile.server + '/starspower/shop/service/v1/user',           //POST 注册消费者
    UserDealer: profile.server + '/starspower/shop/service/v1/user/dealer',     //POST 注册会员/经销商
    UserCurrent: profile.server + '/starspower/shop/service/v1/user/current',   // GET 获取当前登录会员的消息
    UserLogout: profile.server + '/starspower/shop/service/v1/user/logout',     // PUT 退出登录
    GroupReg: profile.server + '/starspower/shop/service/v1/product/group/reg', // 获取会员注册的套组信息
    CheckDealerReg: profile.server + '/starspower/shop/service/v1/user/check/dealerReg', // 验证：会员注册帐户信息表单
    CheckAddress: profile.server + '/starspower/shop/service/v1/shipAddress/check',      // 验证：收货信息表单
    Address: profile.server + '/starspower/shop/service/v1/address',      //获取所有省市区数据
    Nav: profile.server + '/starspower/shop/service/v1/nav', // 获取左侧菜单(栏目)数据
    Home: profile.server + '/starspower/shop/service/v1/home', // 首页数据
    ShoppingCar: profile.server + '/starspower/shop/service/v1/shoppingcar', // 商品购物车
    ShoppingCarCount: profile.server + '/starspower/shop/service/v1/shoppingcar/count', // 获取购物车总数
    ShipAddress: profile.server + '/starspower/shop/service/v1/shipAddress',      // 收货地址服务
    ShipAddressDefault: profile.server + '/starspower/shop/service/v1/shipAddress/default', // 设为默认地址
    ProductInfoId: profile.server + '/starspower/shop/service/v1/product', // 根据Id获取商品详情
    OrderPreview: profile.server + '/starspower/shop/service/v1/order/preview', // 预览订单
    OrderAdd: profile.server + '/starspower/shop/service/v1/order', // 创建订单
    Payeezy: profile.server + '/starspower/shop/service/v1/payment/payeezy', // payeezy支付
};

export default Urls;
