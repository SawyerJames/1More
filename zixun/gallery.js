$(document).ready(function () {
    var path = "//source-img.fiil.com/portal/pc/";
    var covers = [
        // { cover: path + "photo/small/newA1.jpg", colorful: path + "photo/small/color/new1.jpg", source: path + "photo/large/new1.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA2.jpg", colorful: path + "photo/small/color/new2.jpg", source: path + "photo/large/new2.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA3.jpg", colorful: path + "photo/small/color/new3.jpg", source: path + "photo/large/new3.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA4.jpg", colorful: path + "photo/small/color/new4.jpg", source: path + "photo/large/new4.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA5.jpg", colorful: path + "photo/small/color/new5.jpg", source: path + "photo/large/new5.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA6.jpg", colorful: path + "photo/small/color/new6.jpg", source: path + "photo/large/new6.jpg", type: 1, cell: 1},
        // { cover: path + "photo/3.png", colorful: "", source: "//source-img.fiil.com/portal/pc/video/gallery_mv/fiil_dancer.mp4", type: 2, cell: 2},
        // { cover: path + "photo/small/newA7.jpg", colorful: path + "photo/small/color/new7.jpg", source: path + "photo/large/new7.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA8.jpg", colorful: path + "photo/small/color/new8.jpg", source: path + "photo/large/new8.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA9.jpg", colorful: path + "photo/small/color/new9.jpg", source: path + "photo/large/new9.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA10.jpg", colorful: path + "photo/small/color/new10.jpg", source: path + "photo/large/new10.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA11.jpg", colorful: path + "photo/small/color/new11.jpg", source: path + "photo/large/new11.jpg", type: 1, cell: 1},
        // { cover: path + "photo/5.png", colorful: "", source: "//source-img.fiil.com/portal/pc/video/gallery_mv/fiil_hangdrum.mp4", type: 2, cell: 2},
        // { cover: path + "photo/small/newA12.jpg", colorful: path + "photo/small/color/new12.jpg", source: path + "photo/large/new12.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/newA13.jpg", colorful: path + "photo/small/color/new13.jpg", source: path + "photo/large/new13.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/2.jpg", colorful: path + "photo/small/color/2.jpg", source: path + "photo/large/2.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/3.jpg", colorful: path + "photo/small/color/3.jpg", source: path + "photo/large/3.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/1.jpg", colorful: path + "photo/small/color/1.jpg", source: path + "photo/large/1.jpg", type: 1, cell: 1},
        // { cover: path + "photo/11.png", colorful: "", source: "//source-img.fiil.com/portal/pc/video/gallery_mv/FIIL_1080P.mp4", type: 2, cell: 2},
        // { cover: path + "photo/small/5.jpg", colorful: path + "photo/small/color/5.jpg", source: path + "photo/large/5.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/6.jpg", colorful: path + "photo/small/color/6.jpg", source: path + "photo/large/6.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/7.jpg", colorful: path + "photo/small/color/7.jpg", source: path + "photo/large/7.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/8.jpg", colorful: path + "photo/small/color/8.jpg", source: path + "photo/large/8.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/9.jpg", colorful: path + "photo/small/color/9.jpg", source: path + "photo/large/9.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a1.jpg", colorful: path + "photo/small/color/a1.jpg", source: path + "photo/large/a1.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a2.jpg", colorful: path + "photo/small/color/a2.jpg", source: path + "photo/large/a2.jpg", type: 1, cell: 1},
        // { cover: path + "photo/15.png", colorful: "", source: "//source-img.fiil.com/portal/pc/video/gallery_mv/fiil_band.mp4", type: 2, cell: 2},
        // { cover: path + "photo/small/a3.jpg", colorful: path + "photo/small/color/a3.jpg", source: path + "photo/large/a3.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a4.jpg", colorful: path + "photo/small/color/a4.jpg", source: path + "photo/large/a4.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a5.jpg", colorful: path + "photo/small/color/a5.jpg", source: path + "photo/large/a5.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a6.jpg", colorful: path + "photo/small/color/a6.jpg", source: path + "photo/large/a6.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a7.jpg", colorful: path + "photo/small/color/a7.jpg", source: path + "photo/large/a7.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/a8.jpg", colorful: path + "photo/small/color/a8.jpg", source: path + "photo/large/a8.jpg", type: 1, cell: 1},
        // { cover: path + "photo/22.png", colorful: "", source: "//source-img.fiil.com/portal/pc/video/gallery_mv/Fiilchanpinjingli.mp4", type: 2, cell: 2},
        // { cover: path + "photo/small/a9.jpg", colorful: path + "photo/small/color/a9.jpg", source: path + "photo/large/a9.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/b1.jpg", colorful: path + "photo/small/color/b1.jpg", source: path + "photo/large/b1.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/b2.jpg", colorful: path + "photo/small/color/b2.jpg", source: path + "photo/large/b2.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/b3.jpg", colorful: path + "photo/small/color/b3.jpg", source: path + "photo/large/b3.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/b4.jpg", colorful: path + "photo/small/color/b4.jpg", source: path + "photo/large/b4.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/b5.jpg", colorful: path + "photo/small/color/b5.jpg", source: path + "photo/large/b5.jpg", type: 1, cell: 1},
        // { cover: path + "photo/small/b6.jpg", colorful: path + "photo/small/color/b6.jpg", source: path + "photo/large/b6.jpg", type: 1, cell: 1},
        // { cover: path + "photo/30.png", colorful: "", source: "//source-img.fiil.com/portal/pc/video/gallery_mv/mingxingzhufu.mp4", type: 2, cell: 2}
    ];

    //图片查看器
    var currentIndex = 0,
        mediaViewer = $('.media-viewer'),
        imageView = $(".media-viewer .image-viewer"),
        videoPlayer = $(".media-viewer #videoPlayer");
    var MediaViewer = {
        init: function () {
            var close = function () {
                mediaViewer.fadeOut();
                videoPlayer[0].pause();
            };
            mediaViewer.on("click", ".prev", function () {
                currentIndex > 0 && currentIndex--;
                videoPlayer[0].pause();
                MediaViewer.show(true)
            }).on("click", ".next", function () {
                videoPlayer[0].pause();
                currentIndex < covers.length - 1 && currentIndex++;
                MediaViewer.show()
            }).on("mousewheel", function (e) {
                e.preventDefault();
            }).on("click", ".close", close).on("click", ".mask", close);
        },
        show: function (play) {
            var cover = covers[currentIndex];
            mediaViewer.fadeIn();
            if (cover.type == 1) {
                videoPlayer.hide();
                imageView.attr("src", cover.source).fadeIn();
            } else if (cover.type == 2) {
                imageView.hide();
                videoPlayer.attr("poster", cover.cover).fadeIn().attr("src", cover.source);
                play && videoPlayer[0].paused && videoPlayer[0].play();
            }
        }
    };

    //渲染图片资源到dom
    var ul = $(".wrapper ul");
    for (var i = 0; i < covers.length; i++) {
        var c = covers[i];
        var li = $("<li>"), content;
        if (c.type == 2) {
            var play = '<i class="play-icon iconfont animated4">&#xe601;</i>';
            li.append(play);
            content = $('<video>').attr({muted: true, poster: c.cover, src: c.source});
            $(content).on("timeupdate", function () {
                if (this.currentTime > 3) {
                    try {
                        this.pause();
                    }
                    catch(e){

                    }
                    $(this).closest("li").find('.play-icon').css("opacity", 1);
                }
            });
            li.on("mouseenter", function () {
                try {
                    if ($(this).find("video")[0].paused) {
                        $(this).find("video")[0].play();
                        $(this).find("video")[0].paused = false;
                    }
                }
                catch(e){

                }
            }).on("mouseleave", function () {
                var mv = $(this).find("video")[0];
                $(this).closest("li").find('.play-icon').css("opacity", 0);
                try {
                    if (!mv.paused) {
                        mv.pause();
                    }
                }
                catch(e){

                }
            });
        } else {
            content = '<p class="black-white" style="background: url(' + c.cover + ') no-repeat; background-size: cover"></p>' +
                '<p class="colorful animated7" style="background: url(' + c.colorful + ') no-repeat; background-size: cover"></p>';
        }
        c.cell == 2 && li.addClass("f-c-2");
        li.append($("<div>").addClass('animated7').append(content));
        ul.append(li);
    }
    ul.on("click", "li", function (e) {
        e = e || window.event;
        var target = $(e.target || e.srcElement).closest("li");
        var mv = target.find("video")[0];
        if (mv && mv.currentTime > 0) {
            setTimeout(function(){
                mv.pause();
            },1);
            mv.load();
        }
        currentIndex = target.index();
        MediaViewer.show(true);
    });
    MediaViewer.init();
});