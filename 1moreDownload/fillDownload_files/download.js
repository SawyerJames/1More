$(document).ready(function () {
    var win = $(window);
    $('[data-nav="service"],[data-nav="download"]').addClass('active');
    // $('footer').css({position: 'fixed', bottom: "-700%"});
    var mobileSwiper = new Swiper('.mobile-viewer', {
        slidesPerView: 1,
        speed: 600,
        direction: 'vertical'
    });
    if(!__isEn) {
        mobileSwiper.on("slideChangeStart", function (s) {
            if (s.previousIndex != 0) {
                var video = $(".float-mobile .swiper-slide:nth-child(" + (s.previousIndex + 1) + ") video");
                video.hide();
                video[0].pause();
                video[0].load();
            }
        });
        mobileSwiper.on("slideChangeEnd", function (s) {
            if (s.activeIndex != 0) {
                var video = $(".float-mobile .swiper-slide:nth-child(" + (s.activeIndex + 1) + ") video");
                video.show();
                video[0].play();
            }
        });
    }
    var pageSwiper = new Swiper('.wrapper', {
        slidesPerView: 1,
        speed: 600,
        direction: 'vertical',
        pagination: '.pagination',
        keyboardControl: true,
        paginationClickable: true,
        mousewheelControl: true
    });
    pageSwiper.on("slideChangeStart", function (s) {
        if (s.activeIndex == 6) {
            var y = __isEn ? 65 : 100;
            $('.float-mobile').css({transform: "translateY(-" + y + "%)", "z-index": 0});
            // $('footer').animate({bottom: "-600%"});
            $('.pagination').animate({right: -50});
        } else {
            mobileSwiper.slideTo(s.activeIndex);
            $('.float-mobile').css({transform: "", "z-index": ""});
            // $('footer').animate({bottom: "-700%"});
            $('.pagination').animate({right: "40px"});
        }
    });
    win.resize(function () {
        $('.float-mobile .swiper-slide').height($('.float-mobile .swiper-wrapper').height());
    });
});