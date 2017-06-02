/**
 * @fileOverview 定义api访问域名
 */
const profiles = {
    local: {
        preffix: '',
        host : '10.206.41.67:8012',
        sercureEnable: false
    },
    prod: {
        preffix: '',
        host: 'api.kyani.cn',
        sercureEnable: true
    }
};

const currentProKey = __environment__;

const profile = profiles[currentProKey];

profile.server = 'http://' + profile.host + profile.preffix;

if(profile.sercureEnable){
    profile.server = 'https://' + profile.host + profile.preffix;
}else{
    profile.server = 'http://' + profile.host + profile.preffix;
}

export default profile;
