/**
 * @fileOverview 选择信用卡有效期数据
 */

let getYear = String(new Date().getFullYear()).slice(-2);
let month = [];
let year = [];
let ValidData = [];
// 补零
function pad(num) {
    if(num < 10){
        return '0' + num;
    }
    return '' + num;
}

// 获取月
for(let i=1; i<13; i++){
    month.push({
        label: pad(i),
        value: pad(i)
    });
}

// 获取年
for(let i=0; i<20; i++){
    year.push({
        label: '' + (Number(getYear) + i),
        value: '' + (Number(getYear) + i)
    });
}

ValidData.push(month,year);

export default ValidData;
