import Swiper from 'staticDir/swiper/swiper.min.js';
import ImagesZoom from 'staticDir/imageszoom/imageszoom.js'

$(document).ready(function () {
    setTimeout(() => {
        /** 公司简介 **/
        // 图片放大
        const imgzoomLen = $('.imgzoom-main').length;
        if(imgzoomLen > 0){
            ImagesZoom.init({
                elem: '.imgzoom-main'
            });
        }

        // 幻灯片
        const mySwiper = new Swiper('.swiper-container', {
            // loop: true,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // 分页器
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }, 2000);
});
