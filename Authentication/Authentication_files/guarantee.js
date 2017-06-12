var path ="//s.fiil.com/";

function loadimage(){
	document.getElementById("validateCode").src = path+"pc/code.jsp?"+Math.random();
}


function eventBindingValidate(){
    $("#validateCode").click(function(){
        loadimage();
    });
}

(function () {
    var orderData = {};
    var Popup = {
        showPopup: function (type, title, showClose) {
            $('.pop-mask').fadeIn(300, function () {
                title ? $('.pop-title').text(title).show() : $('.pop-title').hide();
                showClose ? $('.pop-close').fadeIn() : $('.pop-close').hide();
                $(".pop-container").attr('data-type', type).slideDown(300);
            });
        },
        hidePopup: function () {
            $(".pop-container").slideUp(300, function () {
                $('.pop-content').hide();
                $('.pop-mask').fadeOut(300);
            });
        }
    };

    $(document).ready(function () {
        eventBindingValidate();
    });
    /**
     * 提示信息
     * @param msg
     * @param [btnTxt]
     */
    var showAlert = function (msg, btnTxt) {
        btnTxt = btnTxt || "确定";
        var content = $(".pop-content.alert").show();
        Popup.showPopup('alert');
        content.find('.message').text(msg);
        content.find('.btn').text(btnTxt);
    };
    var Validate = {
        required: function (sn, label) {
            var result = {flag: true};
            if(!sn){
                result.flag = false;
                result.msg = "请输入" + label;
            }
            return result;
        },
        mobile: function (str, label) {
            var result = {flag: true};
            if (! /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/.test(str)) {
                result.flag = false;
                result.msg = label + '格式不正确';
            }
            return result;
        },
        ID: function (num, label) {
            var isID = function (num) {
                num = num.toUpperCase();
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
                if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                    return false;
                }
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                //下面分别分析出生日期和校验位
                var len, re, arrSplit, dtmBirth, bGoodDay, nTemp = 0;
                len = num.length;
                if (len == 15) {
                    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                    arrSplit = num.match(re);

                    //检查生日日期是否正确
                    dtmBirth = new Date('19' + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                    if (!bGoodDay) {
                        return false;
                    }
                    else {
                        //将15位身份证转成18位
                        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                        for (var i = 0; i < 17; i++) {
                            nTemp += num.substr(i, 1) * arrInt[i];
                        }
                        num += arrCh[nTemp % 11];
                        return num;
                    }
                } else if (len == 18) {
                    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                    arrSplit = num.match(re);

                    //检查生日日期是否正确
                    dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                    bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                    if (!bGoodDay) {
                        return false;
                    } else {
                        //检验18位身份证的校验码是否正确。
                        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                        var valNum;
                        for (var j = 0; j < 17; j++) {
                            nTemp += num.substr(j, 1) * arrInt[j];
                        }
                        valNum = arrCh[nTemp % 11];
                        if (valNum != num.substr(17, 1)) {
                            return false;
                        }
                        return num;
                    }
                }
                return false;
            };
            var result = {flag: true};
            if (!isID(num)) {
                result.msg = label + '格式错误';
                result.flag = false;
            }
            return result;
        }
    };
    var validateForm = function () {
        var result = {flag: true};
        $('.field').each(function () {
            var field = $(this);
            var ipt = field.find('input');
            var label = field.find('span').text();
            if (field.find('em').length > 0) {
                if (!ipt.val()) {
                    result.msg = (ipt.is('input') ? "请输入" : "请选择") + label;
                    result.flag = false;
                    return false;
                }
            }
            var func = Validate[ipt.attr('data-type')];
            result = typeof func === 'function' ? func.call(Validate, ipt.val(), label) : result;
            if (!result.flag) {
                return false;
            }
            orderData[ipt.attr('name')] = ipt.val();
            orderData["channel"] = "portal_pc";
        });
        !result.flag && showAlert(result.msg);
        return result.flag;
    };
    $(document.body).on('click', '.pop-mask,.j-close', function () {
        Popup.hidePopup();
    }).on('click', '.j-sn', function () {
        var content = $('.pop-content.sn').show();
        Popup.showPopup('sn', '根据产品不同，您可以在以下位置查找序列号', true);
    }).on('click', '.j-invoice', function () {
        var content = $('.pop-content.invoice').show();
        Popup.showPopup('invoice', '根据购买方式不同，发票上的编号也略有不同', true);
    }).on('mousewheel', '.pop-mask', function (e) {
        e = e || window.event;
        e.preventDefault();
        e.returnValue = false;
    }).on('click', '.guarantee-bth', function () {
        validateForm() && $.getJSON(path+"guarantee.fiil?jsoncallback=?", orderData,
            function (data) {
                if ("200" == data.code) {
                    showAlert("注册成功");
                    $("input").val("");
                    $("select").val("");
                } else {
                    showAlert(data.reason);
                }
            });
    }).on('click', '.validate-btn', function () {
        validateForm() && $.getJSON(path+"genuine.fiil?jsoncallback=?", orderData,
                function (data) {
                    if ("200" == data.code) {
                        showAlert("您所验证的序列号为正品");
                        $("input").val("");
                        $("select").val("");
                        loadimage();
                    } else {
                        showAlert(data.reason);
                        loadimage();
                    }
                });
        });
})();