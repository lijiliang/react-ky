/**
 * @fileOverview 工具类
 */

/*
 * [hideLoading 显示加载状态]
 */
export function showLoading() {

}

/*
 * [hideLoading 关闭加载状态]
 */
export function hideLoading() {

}

/*
 * [debounce 截流]
 * @param  {[Function]} func  [传入一个函数]
 * @param  {[Number]} delay [延迟秒数s
 */
export function debounce(func, delay) {
    let timer;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/*
 * [dedupe 数组去重]
 * @param  {[Array]} array [一个数组]
 * @return {[Object]}      [返回一个处理后的数组]
 */
export function dedupe (array) {
    return Array.from(new Set(array));
}
