//页面加载完毕执行操作
$(document).ready(function(){
	eventBinding();//事件绑定
	styleControl();//样式控制
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

var path ="//s.fiil.com/";

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
		if(now_page == 0)
		{
			login(1,"quick");
		}
		else
		{
			login(2,"normal");
		}
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

	var mobile = validateForm.trim($(".quick_mobile").val());
	var validatecode = $("#validatecode").val();
	if(!validateForm.isBlank(mobile)){
		addShowError("quick_mobile");;
		showErrorTitle("手机号不能为空","error_box_mobile_quick");
		stateChange("quick",false,"state_mobile");
		return;
	}else if(!validateForm.isMobileNum(mobile)){
		addShowError("quick_mobile");
		showErrorTitle("手机格式不正确，请重新输入","error_box_mobile_quick");
		stateChange("quick",false,"state_mobile");
		return;
	}else{
		hideShowError();
		stateChange("quick",true,"state_mobile");
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
	//$("#sendBt").addClass("sendBt_gray");
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
					//alert("手机验证码已发送");
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
function login(type,classType){
	//判断用户名密码是否为空
	var mobile = "";
	var pwd = validateForm.trim($(".password").val());
	var checkcode = validateForm.trim($(".verif_code").val());
	
	if(type==2){
		mobile = validateForm.trim($(".normal_mobile").val());
		if(!validateForm.isBlank(mobile)){
			addShowError("normal_mobile");
			showErrorTitle("手机号不能为空","error_box_mobile_normal");
			stateChange(classType,false,"state_mobile");
			return;
		}
		else if(!validateForm.isMobileNum(mobile)){
			addShowError("normal_mobile");
			showErrorTitle("手机格式不正确，请重新输入","error_box_mobile_normal");
			stateChange(classType,false,"state_mobile");
			return;
		}
		else
		{
			hideShowError();
			stateChange(classType,true,"state_mobile");
		}
		
		if(!validateForm.isBlank(pwd)){
			addShowError("password");
			showErrorTitle("密码不能为空","error_box_password");
			stateChange(classType,false,"state_password");
			return;
		}
	}
	
	if(type==1){
		mobile = validateForm.trim($(".quick_mobile").val());
		if(!validateForm.isBlank(mobile)){
			addShowError("quick_mobile");
			showErrorTitle("手机号不能为空","error_box_mobile_quick");
			stateChange(classType,false,"state_mobile");
			return;
		}
		else if(!validateForm.isMobileNum(mobile)){
			addShowError("quick_mobile");
			showErrorTitle("手机格式不正确，请重新输入","error_box_mobile_quick");
			stateChange(classType,false,"state_mobile");
			return;
		}
		else
		{
			hideShowError();
			stateChange(classType,true,"state_mobile");
		}
		
		if(!validateForm.isBlank(checkcode)){
			addShowError("verif_code");
			showErrorTitle("验证码不能为空","error_box_verif");
			stateChange(classType,false,"state_password");
			return;
		}
		else if(checkcode.length!=4){
			addShowError("verif_code");
			showErrorTitle("验证码错误","error_box_verif");
			stateChange(classType,false,"state_password");
			return;
		}
	}
	
	//密码md5 加密
	pwd = hex_md5(pwd);
	$.getJSON("moLogin.fiil?jsoncallback=?", { type:type,
				mobile:mobile,
				password:pwd,
				checkcode:checkcode
			},function(data){
				if("ok"==data.code){
					window.location.href= basePath +
							"callBackUrl.jsp";
				}else{
					if(data.result!=""){
						if(type == 1){
							addShowError("verif_code");
							showErrorTitle(data.result,"error_box_verif");
						}
						else if(type == 2){
							addShowError("password");
							showErrorTitle(data.result,"error_box_password");
						}
					}else{
						if(type == 1){
							addShowError("verif_code");
							showErrorTitle("手机号或者验证码错误","error_box_verif");
						}
						else if(type == 2){
							addShowError("password");
							showErrorTitle("手机号或者密码错误","error_box_password");
						}
					}
					if(type == 1){
						stateChange(classType,false,"state_password");
					}
					else if(type == 2){
						stateChange(classType,false,"state_password");
					}
				}
			});
}

function validate_state_show(title,type)
{
	addShowError(type);
	showErrorTitle(title,"error_box_mobile_quick");
	stateChange(type,false,"state_mobile");
}

function validate_state_hide()
{
	addShowError("quick_mobile");;
	showErrorTitle("手机号不能为空","error_box_mobile_quick");
	stateChange("quick",false,"state_mobile");
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