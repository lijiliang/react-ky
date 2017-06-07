/**
 * @fileOverview 通用正则
 */

const regxRule = {
    password: /^(?=.*[0-9].*)(?=.*[A-Z].*)[0-9a-zA-Z]{8,20}$/,  // 密码 -> 密码必须是数字和英文字母组合,必须有一个大写字母
    trim: /(^\s+)|(\s+$)/g,   // 空格
    phone: /^((1\d{10})|(\d{3,10}(-\d{7,8})?))$/,               // 手机号
};

export default regxRule;
