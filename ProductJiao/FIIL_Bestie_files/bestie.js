$(document).ready(function () {
    var win = $(window);
    var winHeight = win.height();
    $('.j-nav-bar .nav-back').addClass('no-shadow');
    $('[ data-nav="product"]').addClass('active');
    var footer = $('footer');
    var pageSwiper = new Swiper('.wrapper', {
        slidesPerView: "auto",
        speed: 600,
        direction: 'vertical',
        keyboardControl: true,
        mousewheelControl: true
    });
    var autoHideNavBar = function () {
        var container = $('.content-wrap');
        if ((pageSwiper.activeIndex == 0 || winHeight >= 750) && container.attr('data-hideNav')) {
            container.removeAttr('data-hideNav');
            $('.j-nav-bar').animate({top: 0});
            $('.product-nav').animate({top: 80});
        } else {
            if (winHeight < 750 && pageSwiper.activeIndex > 0) {
                container.attr('data-hideNav', true);
                $('.j-nav-bar').animate({top: -80});
                $('.product-nav').animate({top: 0});
            }
        }
    };
    $(document.body).on('click', '.bottom-next', function () {
        pageSwiper.slideNext();
    }).on('mouseenter', '.color-panel i', function () {
        if (!$(this).hasClass('active')) {
            $('.color-panel .active,.prd-img.active').removeClass('active');
            $(this).addClass('active');
            $('.prd-img:nth-of-type(' + ($(this).index() + 1) + ')').addClass('active');
        }
    }).on('click', '.top-nav [data-index]', function () {
        pageSwiper.slideTo($(this).closest("[data-index]").attr("data-index"));
    });
    pageSwiper.on("slideChangeStart", function (s) {
        var item = s.activeIndex + 1;
        var animItem = $('.swipe-item:nth-child(' + item + ')');
        var animDesc = animItem.find('.prd-desc,.top-desc,.bottom-desc');
        $('.top-nav span.cur').removeClass('cur');
        $('.top-nav span[data-index="' + s.activeIndex + '"]').addClass('cur');
        autoHideNavBar();
        switch (item) {
            case 9:
                animDesc.addClass('show').find('.animated').addClass('fadeInRight');
                break;
            default:
                animDesc.addClass('show').find('.animated').addClass('fadeInUp');
        }
    }).on('transitionEnd', function (s) {
        s.isEnd && s.previousIndex == s.activeIndex && s.activeIndex++;
    });
    var resize = function () {
        winHeight = win.height();
        var height = winHeight - (winHeight < 750 ? 0 : 80);
        height = height > 630 ? height : 630;
        $('.swipe-content,.fixed-product').height(height);
        autoHideNavBar();
    };
    win.resize(resize);
    resize();
});