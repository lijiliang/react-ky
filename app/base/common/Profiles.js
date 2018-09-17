/**
 * @fileOverview 定义api访问域名
 */
const profiles = {
    local: {
        preffix: '',
        host: 'dev.kyani.cn:8100',
        // host: '10.206.41.146:8012',
        // host: '10.206.41.82:8012',
        sercureEnable: false
    },
    beta: {
        preffix: '',
        host: '10.206.41.146:8012',
        // host: 'dev.kyani.cn:8100',
        sercureEnable: false
    },
    prod: {
        preffix: '',
        // host: '10.206.41.102:8012',
        // host: 'cjmgxp.natappfree.cc',
        // host: 'dev.kyani.cn:8100',
        // host: '54.223.215.188',
        host: 'api.shop.kyani.cn',
        //sercureEnable: true
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

