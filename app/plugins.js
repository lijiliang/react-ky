import Swiper from 'swiper/dist/js/swiper.min.js';
import PhotoSwipe from 'photoswipe/dist/photoswipe.min.js'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min.js'
import ImagesZoom from 'staticDir/imageszoom/imageszoom.js'

window.onload = function(){
    setTimeout(() => {
        let openPhotoSwipe = function() {
            let pswpElement = document.querySelectorAll('.pswp')[0];
            // build items array
            const items = [
                {
                    src: 'https://kyaniyoupaiyun.b0.upaiyun.com/mapcn2017.jpg',
                    w: 1500,
                    h: 825
                }
            ];
            // define options (if needed)
            const options = {
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            const gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        // openPhotoSwipe();
        // document.getElementById('photoswipe-about').onclick = openPhotoSwipe;

        ImagesZoom.init({
					"elem": ".photoswipe"
				});

        // 公司简介
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
};
