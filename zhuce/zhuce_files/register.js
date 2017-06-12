//页面加载完毕执行操作
$(document).ready(function(){
	eventBinding();//事件绑定
	// styleControl();//样式控制
	initPageLogin();
	//initAlert();//绘制弹出框
});

//事件绑定
function eventBinding(){
	//登陆按钮
	$(".login_btn_quick").click(function(){
		login(1,"quick");//快速登录
	});
	
	$(".login_btn_normal").click(function(){
		login(2,"normal");//普通登陆
	});
	
	//发送短信验证码
	$(".verif_code_btn").click(function(){
		sendCheckcode();
	});
	
	$(".error_box").click(function(){
		$(this).parent().parent().removeClass("show_error");
	});

	$(".changeBtn").click(function(){
		loadimage();
	});
	
}

function initPageLogin() {
	loadimage();
}



function loadimage(){
	document.getElementById("validateCode").src = "code.jsp?"+Math.random();
}


//样式控制
function styleControl(){
	var height_window = window.screen.height;
	$("body").css("height",height_window-125);
	$("footer").css("margin-top",height_window-220);
	$(".login_form_col").css("top",(height_window-128)/2);
	$(".logo").css("margin-top",(height_window-128)*0.4);
}

//回车事件
var now_page = 0;
$(function(){
document.onkeydown = function(e){ 
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
    	register();
    }
};
});  

//发送验证码
var isSended = 0;
function sendCheckcode(){
	if(isSended==1){
		return;
	}
//判断用户名密码是否为空

	var mobile = validateForm.trim($(".register_mobile").val());
	var validatecode = $("#validatecode").val();
	if(!validateForm.isBlank(mobile)){
		addShowError("register_mobile");;
		showErrorTitle("手机号不能为空","error-register-mobile");
		stateChange("quick",false,"state_register_mobile");
		return;
	}
	else if(!validateForm.isMobileNum(mobile)){
		addShowError("register_mobile");
		showErrorTitle("手机格式不正确，请重新输入","error-register-mobile");
		stateChange("quick",false,"state_register_mobile");
		return;
	}else{
		hideShowError();
		stateChange("quick",true,"state_register_mobile");
	}
	if (validatecode==null||validatecode=="") {
		addShowError("verif_code_1");
		showErrorTitle("图形验证码不能为空","error_box_validatecode");
		stateChange("quick",false,"state_validatecode");
		return;
	}
	var djs = 60;
	isSended = 1;
	$(".verif_code_btn").attr('disabled',true);//设置disabled属性为true，按钮不可用
					
	$(".verif_code_text").html(""+djs+"s");
	$("#checkcode").val("");
	var djsInt = setInterval(function() {
        djs--;
        $(".verif_code_text").html(""+djs+"s");
        if (djs<=0){
            clearInterval(djsInt);
            $(".verif_code_btn").attr('disabled',false);
            $(".verif_code_text").html("获取验证码");
            //$("#sendBt").removeClass("sendBt_gray");
            isSended = 0;
        }
    }, 1000);
	$.getJSON("checkcode.fiil?jsoncallback=?", {
				mobile:mobile,
				validatecode:validatecode
			},function(data){
				if("ok"==data.code){
				}else if(data.code=="error"&&data.reason!=""){
					if(data.surplus!=null&&data.surplus!=""){
						djs = data.surplus;
					}else{
						djs = 0;
					}
					loadimage();
				}else{
					loadimage();
				}
				
			});
}

/**
 * 手机号，密码登陆
 */
function register(){
	//判断用户名密码是否为空
	var rules = $("#rules").prop("checked");
	var mobile = $("#mobile").val().replace(/^\s+|\s+$/g,"");
	var password = $("#password").val().replace(/^\s+|\s+$/g,"");
	var password2 = $("#password2").val().replace(/^\s+|\s+$/g,"");
	var checkcode = $("#checkcode").val().replace(/^\s+|\s+$/g,"");
	var email = $("#email").val().replace(/^\s+|\s+$/g,"");
	//校验
	if (rules==false) {
		$.alertShow("","请同意服务协议!","确定","");
		return;
	}
	if(!validateForm.isBlank(mobile)){
		addShowError("register_mobile");
		showErrorTitle("手机号不能为空","error-register-mobile");
		stateChange("quick",false,"state_register_mobile");
		return;
	}
	var reg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
	if(!reg.test(mobile) ){
		addShowError("register_mobile");
		showErrorTitle("手机号格式不正确","error-register-mobile");
		stateChange("quick",false,"state_register_mobile");
		return;
	}
	if(checkcode.length!=4){
		addShowError("verif_code");
		showErrorTitle("验证码错误","error_box_verif");
		stateChange("quick",false,"state_password");
		return;
	}
	if(!validateForm.isBlank(password)){
		addShowError("password");
		showErrorTitle("密码不能为空","error_box_password");
		stateChange("quick",false,"state_password_normal");
		return;
	}
	if(password.length<6){
		addShowError("password");
		showErrorTitle("密码长度不能小于6位","error_box_password");
		stateChange("quick",false,"state_password_normal");
		return;
	}
	if(password!=password2){
		addShowError("password-again");
		showErrorTitle("两次密码输入不一致","error_box_password_again");
		stateChange("quick",false,"state_password_normal_again");
		return;
	}
	if (email!=""){
		var regmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
		if(!regmail.test(email)){
			addShowError("email");
			showErrorTitle("邮箱格式不正确，请重新输入!","error_box_email");
			stateChange("quick",false,"state_email");
			return;
		}
	}
	//密码md5 加密
	password = hex_md5(password);
	password2 = hex_md5(password2);
	$.getJSON("moRegister.fiil?jsoncallback=?", { oper:"register",
		mobile:mobile,
		password:password,
		password2:password2,
		checkcode:checkcode,
		email:email
		},function(data){
			if("200"==data.code){
				$.alertShow("",data.result,"确定","toMainPage()");
				//跳转登录
			
			}else{
				$.alertShow("",data.result,"确定","");
			}
		});
}
function toMainPage(){
	window.location.href = "pc/login.jsp";
}


function validate_state_show(title,type)
{
	addShowError(type);
	showErrorTitle(title,"error-register-mobile");
	stateChange(type,false,"state_register_mobile");
}

function validate_state_hide()
{
	addShowError("register_mobile");;
	showErrorTitle("手机号不能为空","error-register-mobile");
	stateChange("quick",false,"tate_register_mobile");
}

function showErrorTitle(error_title,className)
{
	$("."+className).children("span").html(error_title);
}

/**
*展示错误提示
*/
function addShowError(class_child)
{
	$("."+class_child).parent().parent().addClass("show_error");
}

/**
*隐藏错误提示
*/
function hideShowError()
{
	$(".show_error").removeClass("show_error");
}

/**
*改变验证结果对应样式
*/
function stateChange(loginType,suc,co)
{
	if(suc == true)
	{
		$("#"+loginType).children().children("."+co).removeClass("state_error");
		$("#"+loginType).children().children("."+co).addClass("state_correct");
	}
	else
	{
		$("#"+loginType).children().children("."+co).removeClass("state_correct");
		$("#"+loginType).children().children("."+co).addClass("state_error");
	}
}