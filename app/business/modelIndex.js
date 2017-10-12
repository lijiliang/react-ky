/**
 * @fileOverview 引入全部的 reducers
 */

// 首页 reducers
export {default as HomeModel} from './home/model/HomeModel';

export {default as ProductInfoIdModel} from './home/model/ProductInfoIdModel';  // 商品详情

// common 数据模型MODEL
export {default as NavModel} from './common/model/NavModel.js';    //菜单导航数据
export {default as CartCountModel} from './common/model/CartCountModel';   // 购物车总数
export {default as IndexItemOpenModel} from './common/model/IndexItemOpenModel'; // 首页展开所有商品

// 登录的数据模型MODEL
export {default as LoginModel} from './login/model/LoginModel';

// 注册的数据模型MODEL
export {default as RegModel} from './account/model/RegModel';

// 购物车的数据模型MODEL
export {default as ShappingModel} from './cart/model/ShappingModel';
export {default as PaymentModel} from './cart/model/PaymentModel';  // 支付信息
export {default as PayCompleteModel} from './pay/model/PayCompleteModel';  // 订单支付后回调完成页，支付成功/失败
