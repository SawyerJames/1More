$(document).ready(function () {
    console.log(__isEn);
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
    var toggleNextBtn = function (force) {
        $('.bottom-next').fadeOut();
        setTimeout(function () {
            var idx = pageSwiper.activeIndex;
            ((force || idx > 1) && idx < $('.swipe-item').length) && $('.bottom-next').fadeIn();
        }, 1500);
    };
    var timeShort = [{start: 0.5, end: 10}, {start: 10, end: 16}, {start: 16, end: 22}];
    var videoTime = {};
    $('.learn-more-vdo video').on("timeupdate", function () {
        if (this.currentTime > videoTime.end) {
            this.pause();
        }
    });
    $(document.body).on('click', '.bottom-next', function () {
        pageSwiper.slideNext();
        toggleNextBtn();
    }).on('mouseenter', '.learn-more-vdo li', function (e) {
        e = e || window.event;
        var target = $(e.target || e.srcElement).closest('li');
        var vdo = $('.learn-more-vdo video')[0];
        videoTime = timeShort[target.index()];
        vdo.currentTime = videoTime.start;
        vdo.play();
    }).on('mouseleave', '.learn-more-vdo li', function () {
        $('.learn-more-vdo video')[0].pause();
    }).on('mouseenter', '.color-panel i', function () {
        if (!$(this).hasClass('active')) {
            $('.color-panel .active,.prd-img.active').removeClass('active');
            $(this).addClass('active');
            $('.prd-img:nth-of-type(' + ($(this).index() + 1) + ')').addClass('active');
        }
    }).on('click', '.top-nav [data-index]', function () {
        pageSwiper.slideTo($(this).closest("[data-index]").attr("data-index"));
    });
    var played = {};
    pageSwiper.on("slideChangeStart", function (s) {
        var item = s.activeIndex + 1;
        var animItem = $('.swipe-item:nth-child(' + item + ')');
        var animDesc = animItem.find('.prd-desc,.top-desc,.bottom-desc');
        toggleNextBtn();
        $('.top-nav span.cur').removeClass('cur');
        $('.top-nav span[data-index="' + s.activeIndex + '"]').addClass('cur');
        autoHideNavBar();
        switch (item) {
            case 2:
                !played[item] && animItem.find('video:nth-of-type(1)').attr("autoplay", true)[0].load();
                played[item] = true;
                break;
            case 3:
            case 7:
            case 8:
                animDesc.addClass('show').find('.animated').addClass('fadeInUp');
                break;
            case 4:
                animItem.find('.bottom-img').attr('src', animItem.find('.bottom-img').attr('src'));
                animDesc.addClass('show').find('.animated').addClass('fadeInUp');
                break;
            case 11:
                animDesc.addClass('show').find('.animated').addClass('fadeInUp');
                break;
            case 5:
                setTimeout(function () {
                    $('.swipe-item:nth-child(' + item + ') video')[0].play();
                    animDesc.addClass('show').find('.animated').addClass('fadeIn');
                }, 500);
                break;
            case 6:
                animDesc.addClass('show').find('.animated').addClass('fadeInLeft');
                break;
            case 9:
            case 10:
                animDesc.addClass('show').find('.animated').addClass('fadeIn');
                break;
        }
    }).on("slideChangeEnd", function (s) {
        var item = s.previousIndex + 1;
        var animItem = $('.swipe-item:nth-child(' + item + ')');
        var animDesc = animItem.find('.prd-desc');
        switch (item) {
            case 5:
                animItem.find('video')[0].pause();
                animDesc.removeClass('show').find('.animated').removeClass('fadeIn');
                break;
        }
    }).on('transitionEnd', function (s) {
        s.isEnd && s.previousIndex == s.activeIndex && s.activeIndex++;
        toggleNextBtn();
    });
    $('.swipe-item:nth-child(1) video').on('ended', function () {
        toggleNextBtn(true);
        $(this).closest('.swipe-content').find('.prd-desc').addClass('show').find('.animated').addClass('fadeInRight');
    });
    $('.swipe-item:nth-child(2) video:nth-of-type(1)').on('ended', function () {
        toggleNextBtn(true);
        $(this).closest('.swipe-content').find('.prd-desc').addClass('show').find('.animated').addClass('fadeInLeft');
    });
    $('.swipe-item:nth-child(2)').on('click', '#playPrdVideo', function () {
        var el = $(this);
        if (!el.attr('data-playing')) {
            el.attr('data-playing', 1);
            var commands = __isEn ? {"1": 'Fold', "2": 'Unfold', "3": 'Rotate', "4": 'Withdraw'} : {
                "1": '折叠',
                "2": '展开',
                "3": '旋转',
                "4": '收回'
            };
            var cur = +el.attr('data-opt');
            $('.video-wrap .cur').removeClass('cur')[0].currentTime = 0;
            $('.video-wrap [data-index="' + cur + '"]').addClass('cur')[0].play();
            var next = cur + 1;
            next = commands[next] ? next : 1;
            el.attr('data-opt', next).text(commands[next] + (__isEn ? " headsets" : "耳机"));
            setTimeout(function () {
                el.removeAttr('data-playing');
            }, 1000)
        }
    });
    var resize = function () {
        winHeight = win.height();
        // var height = winHeight - (winHeight < 750 ? 0 : 90);
        // height = height > 670 ? height : 670;
        // $('.swipe-content').height(height);
        autoHideNavBar();
    };
    win.resize(resize);
    resize();
});