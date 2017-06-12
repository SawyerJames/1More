$(document).ready(function () {
    var offlineMap, support = {province: [], city: []}, lookupData = [], shopProvinces = {}, shopCities = {}, currentRes = [], currentShow;
    var _keys = function (obj) {
        var keys = [];
        for(var k in obj){
            keys.push(k);
        }
        return keys;
    };
    function Shop() {
        $('[data-nav="service"],[data-nav="offline"]').addClass('active');
        this.initMap();
        this.initEvents();
        var self = this;
        this.initData(function () {
            support.province = _keys(shopProvinces);
            support.city = _keys(shopCities);
            $("#searchIpt").autocomplete({
                lookup: lookupData,
                autoSelectFirst: true,
                onSelect: function (suggestion) {
                    var result = (suggestion.data == 1 ? shopProvinces : shopCities)[suggestion.value];
                    currentShow != suggestion.value && self.renderSearch(result, suggestion.value);
                }
            })
        })
    }
    Shop.prototype = {
        initEvents: function () {
            var self = this;
            var search = function () {
                var key = $("#searchIpt").val();
                var tmp, text;
                for (var i = 0; i < support.province.length; i++){
                    text = support.province[i];
                    if(text.indexOf(key) > -1){
                        tmp = shopProvinces[text];
                        break;
                    }
                }
                if(!tmp) {
                    for (var i = 0; i < support.city.length; i++) {
                        text = support.city[i];
                        if(text.indexOf(key) > -1){
                            tmp = shopCities[text];
                            break;
                        }
                    }
                }
                if(tmp){
                    self.renderSearch(tmp, text)
                } else {
                    self.showTips("暂不支持该城市");
                }
            };
            $(window).resize(this.resizeResult);
            $('.search-shop input').keypress(function (e) {
                e.which == 13 && search();
            });
            $(document).on('click', '.search-btn', search).on('click', '.search-shop .search-result li', function (e) {
                e = e || window.event;
                var target = $(e.target || e.srcElement).closest('li');
                self.showPopInfo(currentRes[target.index()]);
            });
        },

        showTips: function (tips) {
            $('.search-result').show();
            $('.search-shop').addClass('result');
            var p = $('<p>').css({padding: "0 20px 20px"}).text(tips);
            $('.search-result ul').html($('<li>').append(p));
            this.resizeResult();
        },

        initMap: function () {
            offlineMap = new AMap.Map("container", {
                rotateEnable: true,
                dragEnable: true,
                zoomEnable: true,
                zooms: [3, 18],
                features: ['road'],
                //二维地图显示视口
                view: new AMap.View2D({
                    center: new AMap.LngLat(116.397731, 39.907329),//地图中心点
                    zoom: 4 //地图显示的缩放级别
                })
            });

            offlineMap.plugin(["AMap.Scale"], function () {
                offlineMap.addControl(new AMap.Scale());
            });
        },

        renderSearch: function (data, text) {
            currentRes = data;
            currentShow = text;
            $('.search-shop').addClass('searched');
            var self = this;
            var ul = $('.search-result ul').html("");
            var createMarker = function (marker) {
                var mm = new AMap.Marker({
                    map: offlineMap,
                    icon: marker.icon1,
                    position: [marker.position[0], marker.position[1]],
                    content: marker.content
                });
                AMap.event.addListener(mm, 'click', function () {
                    self.showPopInfo(marker);
                });
            };
            setTimeout(function () {
                for (var i = 0; i < data.length; i++) {
                    var marker = data[i];
                    createMarker(marker);
                    var li = $('<li>').addClass('animated4');
                    var div = $('<div>');
                    div.append($('<h4>').text(marker.name + "："))
                        .append($('<span>').text(marker.address));
                    li.append('<i class="iconfont">&#xe609;</i>').append(div);
                    ul.append(li);
                }
                self.resizeResult();
                offlineMap.setZoom(10);
                offlineMap.setCenter(data[0].position);
                $("#searchIpt").val(text);
            }, 500);
        },

        initData: function (callback) {
            $.getJSON("//sapp.fengeek.com/shop.fill?pla=portal", function (data) {
                delete data.sort;
                for (var keyPr in data) {
                    shopProvinces[keyPr] = [];
                    keyPr.indexOf("\u5e02") < 0 && lookupData.push({value: keyPr, data: 1});
                    for (var keyCi in data[keyPr]) {
                        shopCities[keyCi] = [];
                        lookupData.push({value: keyCi, data: 2});
                        for (var keyCo in data[keyPr][keyCi]) {
                            for (var i = 0; i < data[keyPr][keyCi][keyCo].length; i++) {
                                var point = {
                                    icon1: '//source-img.fiil.com/portal/pc/images/offline/store_point_red.png',
                                    position: [data[keyPr][keyCi][keyCo][i].positionx, data[keyPr][keyCi][keyCo][i].positiony],
                                    address: data[keyPr][keyCi][keyCo][i].address,
                                    city: data[keyPr][keyCi][keyCo][i].city,
                                    district: data[keyPr][keyCi][keyCo][i].district,
                                    name: data[keyPr][keyCi][keyCo][i].name,
                                    openhours: data[keyPr][keyCi][keyCo][i].openhours,
                                    mobile: data[keyPr][keyCi][keyCo][i].mobile,
                                    phone: data[keyPr][keyCi][keyCo][i].phone,
                                    province: data[keyPr][keyCi][keyCo][i].province,
                                    remark: data[keyPr][keyCi][keyCo][i].remark
                                };
                                shopCities[keyCi].push(point);
                                shopProvinces[keyPr].push(point);
                            }
                        }
                    }
                }
                typeof callback === "function" && callback();
            })
        },

        resizeResult: function () {
            var ulHeight = $('.search-result ul').height();
            var calcHeight = $(window).height() * 0.7;
            var height = ulHeight > 20 && ulHeight < calcHeight ? ulHeight : calcHeight;
            ($('.search-shop').hasClass('searched') || $('.search-shop').hasClass('result')) && $('.search-result').animate({ height: height});
        },

        showPopInfo: function (marker) {
            if(!marker){return}
            var content = [];
            content.push("地址：" + marker.address);
            marker.mobile && content.push("电话：" + marker.mobile);
            content.push("<div>" + marker.remark + "</div>");
            var info = $("<div>").addClass("info");

            //可以通过下面的方式修改自定义窗体的宽高
            //info.style.width = "400px";
            // 定义顶部标题
            var top = $("<div>").addClass("info-top");
            var titleD = $("<div>").html('<span style="font-size:11px;color:#fff;">' + marker.name + '</span>');
            //var closeX = $("<img>").attr("src", "//webapi.amap.com/images/close2.gif").on('click', function () {
            //    offlineMap.clearInfoWindow();
            //});

            top.append(titleD);
            //top.appendChild(closeX);
            info.append(top);

            // 定义中部内容
            info.append($("<div>").addClass("info-middle").css({backgroundColor: "#FFF"}).html(content.join('<br>')));

            // 定义底部内容
            var bottom = $("<div>").addClass("info-bottom").css({
                position: 'relative',
                top: '0px',
                margin: '0 auto'
            }).append($("<img>").attr("src", "//webapi.amap.com/images/sharp.png"));
            info.append(bottom);
            offlineMap.setZoom(12);
            offlineMap.setCenter(marker.position);
            new AMap.AdvancedInfoWindow({
                isCustom: true,  //使用自定义窗体
                content: info[0],
                offset: new AMap.Pixel(16, -42)
            }).open(offlineMap, marker.position);
        }
    };

    var shop = new Shop();
});