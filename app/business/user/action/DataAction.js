import * as types from './actionTypes';
import Base64 from 'js-base64';
import Toast from 'kyBase/components/ux/Toast';
import Urls from 'Urls';

export function login(username,password,isAccount){
    return (dispatch,getState) => {
        const kyaniSecurity = Base64.Base64.encode('kyani-shop:security');
        $.ajax({
            type: 'POST',
            url: Urls.Login,
            data: {
                grant_type : 'password',
                username :username,
                password : password,
                scope : 'read write'
            },
            headers: {
                Authorization: 'Basic ' + kyaniSecurity,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res){
                dispatch({
                    type : types.LOGIN,
                    user:{
                        username:username,
                        password:password,
                        isLogined: true,        // 是否登录
                        isAccount: isAccount,   // 是否记住帐号
                        token:res.access_token
                    }
                });
                $.ajax({
                    type: 'get',
                    url: 'http://10.206.41.67:8012/user',
                    headers: {
                        Authorization: "Bearer "+ res.access_token
                    },
                    success: function(re){
                        console.log(re)
                    }
                });
            },
            error: function(err){
                const response = JSON.parse(err.response);
                if(response.message === 'Bad credentials'){
                    Toast.info('用户名或密码错误！', 2);
                }
            }
        });
    };
}
