$(document).ready(function () {
    initIndexPage();
});

function initIndexPage() {
    initBanner();
    initActive();
}

function initBanner(){
    var win = $(window);
    var pageBannerArray = new Array();
    getPageInfo("pageInfo","index_zh","banner",1,0,pageBannerArray,"drawBanner");
    $('[data-nav="index"]').addClass('active');
    var winWidth = document.documentElement.clientWidth;
    var winHeight = winWidth*805/1920;
    var getBottomHeight = function (){
        return winHeight > 750 ? 150 : 60;
    };
    var nav = $('.j-nav-bar').addClass('home-nav');
    var navBack = $('.j-nav-bar .nav-back');
    var yuyueWidth = 185;
    var yuyueHeight = 48;
    var ratio = winWidth/1920;
    var fontSizeYuyue = 25;
    var fontSizeXiangqing = 20;

    $(".init-height").height(winHeight);

    $(".swiper-slide").css("background-size","auto "+winHeight+"px");

    $(".diva-btn-yuyue").css("width",yuyueWidth*ratio);
    $(".diva-btn-yuyue").css("height",yuyueHeight*ratio);
    $(".diva-btn-yuyue").css("margin-top",winHeight*0.67);
    $(".diva-btn-xiangqing").css("margin-top",winHeight*0.7);
    $(".diva-btn-yuyue").css("font-size",fontSizeYuyue*ratio);
    $(".diva-btn-xiangqing").css("font-size",fontSizeXiangqing*ratio);
    $(".diva-btn-yuyue").css("line-height",yuyueHeight*ratio+"px");
    $(".diva-btn-yuyue").css("margin-left",-440*ratio);
    $(".diva-btn-xiangqing").css("margin-left",-180*ratio);

    var fadeInDivs = $('.story-grid.wrapper .fade-item');
    var fadeItems = [];
    var initFadeItems = function () {
        $.each(fadeInDivs, function (i, div) {
            var top = $(div).parent().offset().top;
            fadeItems[i] = {start: top - winHeight + 100, el: $(div)};
        });
    };
    initFadeItems();

    var player = document.getElementById("fiil-player"),
        controller = $(".player-controller"),
        playBtn = $(".player-controller .play"),
        pauseBtn = $(".player-controller .pause");
    var toggleBtn = function () {
        if (controller.fadeIn().hasClass("active")) {
            playBtn.hide();
            pauseBtn.show();
        } else {
            playBtn.show();
            pauseBtn.hide();
        }
    };
    $(document).on("click", ".player-controller", function () {
        controller.toggleClass("active").hasClass("active") ? player.play() : player.pause();
        toggleBtn();
    }).on("mouseenter", ".video-wrap", function () {
        player.play();
        controller.addClass("active");
        toggleBtn();
    }).on("mouseleave", ".video-wrap", function () {
        controller.fadeOut();
    });

    win.scroll(function () {
        var top = win.scrollTop();
        $('.swiper-container').css("top", -top * 0.3);
        if(top > winHeight - getBottomHeight() - 80){
            nav.removeClass("home-nav");
        } else {
            nav.addClass("home-nav");
        }
        if (top > 10) {
            var opacity = top / 1000;
            opacity = opacity > 0.95 ? 0.95 : opacity < 0.3 ? 0.3 : opacity;
            navBack.css({opacity: opacity});
        } else {
            navBack.css({opacity: ""});
        }
        $.each(fadeItems, function (i, obj) {
            if (top > obj.start) {
                obj.el.fadeIn(800);
            } else {
                obj.el.fadeOut(800);
            }
        });
        top < $(player).offset().top - winHeight && player.pause();
    });

    win.resize(function () {
        initStyleBanner();
        initFadeItems();
    });
}

function drawBanner(array){
    printBanner(array);
    moveBanner();
}

function printBanner(array){
    var str = '';
    for(var i = 0;i<array.length;i++){
        if(array[i].type == 0){
            if(array[i].jumpurl != "" && typeof(array[i].jumpurl) != "undefined"){
                str = str + '<div class="swiper-slide banner'+i+'" style="background:url('+array[i].showimg+') center no-repeat;">'+
                    '<a target="_blank" href="'+array[i].jumpurl+'"></a>'+
                    '</div>';
            }
            else {
                str = str + '<div class="swiper-slide banner'+i+'" style="background:url('+array[i].showimg+') center no-repeat;"></div>';
            }

        }
        else{
            if(array[i].jumpurl != "" && typeof(array[i].jumpurl) != "undefined"){
                str = str + '<div class="swiper-slide banner'+i+'">'+
                    '<a target="_blank" href="'+array[i].jumpurl+'">'+
                    '<video>'+
                    '<source src="'+array[i].showvideo+'">'+
                    '</video>'+
                '</a>'+
                '</div>';
            }
            else {
                str = str + '<div class="swiper-slide banner'+i+'">'+
                    '<video>'+
                    '<source src="'+array[i].showvideo+'">'+
                    '</video>'+
                '</div>';
            }
        }

    }
    $(".swiper-wrapper").html(str);
    initStyleBanner();
}

function initStyleBanner(){
    var winWidth = document.documentElement.clientWidth;
    var winHeight = winWidth*805/1920;
    var getBottomHeight = function (){
        return winHeight > 750 ? 150 : 60;
    };
    var nav = $('.j-nav-bar').addClass('home-nav');
    var navBack = $('.j-nav-bar .nav-back');
    var yuyueWidth = 185;
    var yuyueHeight = 48;
    var ratio = winWidth/1920;
    var fontSizeYuyue = 25;
    var fontSizeXiangqing = 20;

    $(".init-height").height(winHeight);

    $(".swiper-slide").css("background-size","auto "+winHeight+"px");
}

function moveBanner() {
    var swiperOption = {};
    swiperOption = {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        autoplay: 5000,
        loop: true,
        calculateHeight: true,
        autoplayDisableOnInteraction:false,
    };
    swiperOption.onSwiperCreated = function() {
    }, swiperOption.onSlideChangeStart = function(e) {
    };
    var swiper = new Swiper('.swiper-container', swiperOption);
}

function initActive() {
    var pageActiveArray = new Array();
    getPageInfo("pageInfo","index_zh","activity",1,0,pageActiveArray,"drawActive");
}

function drawActive(array){
    // console.log(array);
    var str = '';
    for(var i = 0;i<array.length;i++) {
        if(array[i].jumpurl != "" && typeof(array[i].jumpurl) != "undefined"){
            str = str + '<div class="item p'+(i+1)+'">'+
                '<p>'+
                '<i class="mask"></i>'+
                '<em style="background:url('+array[i].showimg+') center no-repeat; background-size: cover;"></em>'+
                '<a target="_blank" href="'+array[i].jumpurl+'">'+array[i].name+'</a>'+
                '</p>'+
                '<h3>'+
                '<a target="_blank" href="'+array[i].jumpurl+'">'+array[i].title+'</a>'+
                '</h3>'+
                '<h5></h5>'+
                '<div class="desc">'+array[i].description+'</div>'+
                '</div>';
        }
        else{
            str = str + '<div class="item p'+(i+1)+'">'+
                '<p>'+
                '<i class="mask"></i>'+
                '<em style="background:url('+array[i].showimg+') center no-repeat; background-size: cover;"></em>'+
                '<a>'+array[i].name+'</a>'+
                '</p>'+
                '<h3>'+
                '<a>'+array[i].title+'</a>'+
                '</h3>'+
                '<h5></h5>'+
                '<div class="desc">'+array[i].description+'</div>'+
                '</div>';
        }

    }
    $(".product-container").html(str);
}