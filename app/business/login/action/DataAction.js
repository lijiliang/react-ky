import * as types from './actionTypes';
import Base64 from 'js-base64';
export function login(username,password){
    return (dispatch,getState)=>{
        const kyaniSecurity = Base64.Base64.encode('kyani-shop:security');
        $.ajax({
            type: 'POST',
            url: 'http://10.206.41.67:8012/oauth/token',
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
                console.log(res)
                dispatch({
                    type : types.LOGIN,
                    user:{
                        username:username,
                        password:password,
                        token:res.access_token
                    }
                })
            }
        });


    }

}
