var pageInfo = new PageInfo();
$(document).ready(function(){
	initProPage();
	eventBindingProduct();
	styleControlProduct();
});

(function(){
	var urlPid;
	var search = window.location.search;
	if(search != null){
		var searchArray = new Array();
		searchArray = search.split("&");
	}

	for(var i = 0; i < searchArray.length; i++){
		if(searchArray[i].indexOf("pid")>=0){
			urlPid = parseInt(searchArray[i].split("=")[1]);
			break;
		}
	}
	if(urlPid != null){
		pageInfo.init(urlPid);//---------------------------------注入
	}
	else {
		window.location.href = basepath+"index.jsp";
	}
})();

function eventBindingProduct(){
	var date = $("#date1").val();
	if (date<1486627200000) {
		$(".valentine-btn").click(function(){
			if($(".valentine-btn-active").attr("data-No") == $(this).attr("data-No")){
				$(".valentine-btn-active").children(".prompt-radio").prop("checked",false);
				$(".valentine-btn-active").removeClass("valentine-btn-active");
				$(".cal-add").attr("onclick","cal(1)");
				$(".cal-sub").attr("onclick","cal(0)");
				$(".cal-btn").css("cursor","pointer");
			}
			else{
				$(".valentine-btn-active").children(".prompt-radio").prop("checked",false);
				$(".valentine-btn-active").removeClass("valentine-btn-active");

				$(this).addClass("valentine-btn-active");
				$(this).children(".prompt-radio").prop("checked",true);
				num = 1;
				$("#proNum").html(num);
				$(".cal-btn").removeAttr("onclick");
				$(".cal-btn").css("cursor","not-allowed");
			}
		});
	}
	else if(date>1486627200000&&date<1486713600000){
		$(".valentine-btn:not([data-No='1'])").click(function(){
			if($(".valentine-btn-active").attr("data-No") == $(this).attr("data-No")){
				$(".valentine-btn-active").children(".prompt-radio").prop("checked",false);
				$(".valentine-btn-active").removeClass("valentine-btn-active");
				$(".cal-add").attr("onclick","cal(1)");
				$(".cal-sub").attr("onclick","cal(0)");
				$(".cal-btn").css("cursor","pointer");
			}
			else{
				$(".valentine-btn-active").children(".prompt-radio").prop("checked",false);
				$(".valentine-btn-active").removeClass("valentine-btn-active");

				$(this).addClass("valentine-btn-active");
				$(this).children(".prompt-radio").prop("checked",true);
				num = 1;
				$("#proNum").html(num);
				$(".cal-btn").removeAttr("onclick");
				$(".cal-btn").css("cursor","not-allowed");
			}
		});
	}
	else if(date>1486713600000&&date<1486800000000){
		$(".valentine-btn:not([data-No='1'],[data-No='2'])").click(function(){
			if($(".valentine-btn-active").attr("data-No") == $(this).attr("data-No")){
				$(".valentine-btn-active").children(".prompt-radio").prop("checked",false);
				$(".valentine-btn-active").removeClass("valentine-btn-active");
				$(".cal-add").attr("onclick","cal(1)");
				$(".cal-sub").attr("onclick","cal(0)");
				$(".cal-btn").css("cursor","pointer");
			}
			else{
				$(".valentine-btn-active").children(".prompt-radio").prop("checked",false);
				$(".valentine-btn-active").removeClass("valentine-btn-active");

				$(this).addClass("valentine-btn-active");
				$(this).children(".prompt-radio").prop("checked",true);
				num = 1;
				$("#proNum").html(num);
				$(".cal-btn").removeAttr("onclick");
				$(".cal-btn").css("cursor","not-allowed");
			}
		});
	}

	$(".major").click(function(){
		pageInfo.updateMajorfunc(0,"drawMajor");
	});
	$(".spec").click(function(){
		pageInfo.updateParamdesc(0,"drawParamdesc");
	});
	$(".packList").click(function(){
		pageInfo.updatePacklist(0,"drawPacklist");
	});
}

function initProPage(){
	var initTimer = setInterval(function(){
		if(pageInfo.isInit){
			drawProInfo();
			clearInterval(initTimer);
		}
	},20);
}

function drawFenqiCol(price){
	var shopPrice = price;
	shopPrice = parseFloat(shopPrice);
	if(shopPrice>=500&&shopPrice<20000){
		$(".item-show-fenqi").show();
		numDrump("fenqi3",0,(shopPrice/12).toFixed(2),2,0.5);
		numDrump("fenqi2",0,(shopPrice/6).toFixed(2),2,0.5);
		numDrump("fenqi1",0,(shopPrice/3).toFixed(2),2,0.5);
	}
	else{
		$(".item-show-fenqi").hide();
	}
}

var tempNum = 0;
var num = 1;
function cal(e){
	if(e==1){//加
		var maxNum = pageInfo.stock>5?5:pageInfo.stock;
		if(maxNum=="0"){
			maxNum = "1";
		}
		num = ((num+1)>parseInt(maxNum))?parseInt(maxNum):(num+1);
		$("#proNum").text(num);
	}
	else{//减
		if(num>1){
			num--;
		}
		$("#proNum").text(num);
	}
}

function changePro(pid){
	history.pushState("", "fiil 商城", changeUrl(pid));
	clearPage();
	if(pid != null){
		pageInfo.changepid(pid,"drawProInfo");
	}

	//pageInfo.updateIntroduce("drawIntroduce");//--------------------更新产品说明
	$(".proPara-content").children(".nav-tabs").children("li.active").removeClass("active");
	$(".proPara-content").children(".tab-content").children(".tab-pane").removeClass("active");
	$(".proPara-content").children(".tab-content").children(".tab-pane").removeClass("in");

	$(".proPara-content").children(".nav-tabs").children("li:eq(0)").addClass("active");
	$(".proPara-content").children(".tab-content").children(".tab-pane:eq(0)").addClass("active");
	$(".proPara-content").children(".tab-content").children(".tab-pane:eq(0)").addClass("in");
}

function changeUrl(pid){
	var href = window.location.href;
	var newHref = "";
	newHref = href.replace("pid="+pageInfo.pid,"pid="+pid);
	return newHref;
}

function loadJs(file) {
	var head = $("head");
	head.remove("script[role='reload']");
	$("script[role='reload']").remove();
	$("<scri" + "pt>" + "</scr" + "ipt>").attr({ role: 'reload', src: file, type: 'text/javascript' }).appendTo(head);
}

function drawIndoHref(){
	$(".know-other").off('click');
	if(pageInfo.pcinfohref == "#"){
		$(".know-other").on("click",function(){
			scrollToTop($(".content-proPara-imgOnly"));
		});
	}
	else{
		$(".know-other").on("click",function(){
			window.open(pageInfo.pcinfohref);
		});
	}
}

function initProParaimg(){
	if(pageInfo.pcinfohref == "#"){
		pageInfo.updateMajorfunc(1,"drawProParaImg");
	}
	else{
		hideProParaImg();
	}
}

function drawProParaImg(){
	$(".content-proPara-imgOnly").fadeIn();
	$(".content-proPara-imgOnly").html(pageInfo.majorfunc.majorfunc);
	$(".content-proPara").fadeOut();
}

function hideProParaImg(){
	$(".content-proPara-imgOnly").fadeOut();
	$(".content-proPara-imgOnly").html("");
	$(".content-proPara").fadeIn();
}

function scrollToTop(point) {
	var target = point;
	if(target.length==1){
		var top = target.offset().top-84;
		if(top > 0){
			$('html,body').animate({scrollTop:top},400);
		}
	}
}

function drawProInfo(){
	pageInfo.updatePhotos(0,"drawPhotos");
	pageInfo.updateStock("drawStock");
	pageInfo.updateProAct(pageInfo.pid,"drawProAct");
	initProParaimg();
	pageInfo.updateMajorfunc(0,"drawMajor");
	pageInfo.updateVideo("drawVideo");
	$(".proName").html(pageInfo.pname);
	$(".proDesc").html(pageInfo.slogan);
	
	if(pageInfo.shopprice.toString().indexOf(".") > -1){
		numDrump("priceNow",parseFloat($(".proPrice").html()),parseFloat(pageInfo.shopprice),2,0.5);
	}
	else{
		numDrump("priceNow",parseInt($(".proPrice").html()),parseInt(pageInfo.shopprice),0,0.5);
	}

	$(".proSer").html(pageInfo.serviceinfo);

	drawIndoHref();
	drawPsnItem();
	drawColorItem();
	drawFenqiCol(parseFloat(pageInfo.shopprice));
}

function drawVideo(){
	$(".content-proVideo").html(pageInfo.video.video);
}

var changeProflag = true;
function drawPhotos(){
	if(pageInfo.photos != null){
		var photesArray = new Array();
		var photosStr = pageInfo.photos;
		photesArray = photosStr.split(",");
		var bigPhotos = "";

		for(var i = 0;i<photesArray.length;i++){
			bigPhotos = bigPhotos + '<div class="proInfo-img-item">'+
									'<img src="'+photesArray[i]+'" alt=""/>'+
									'</div>';
		}
		$(".proInfo-img-list").html(bigPhotos);
		if(changeProflag){
			initProImgBanner();
			changeProflag = false;
		}
		else {
			reinit();
		}
	}
}

function drawPsnItem(){
	var proPsn = '';
	if(category != null&&category.length>0){
		$(".model-select-col").html("");
		for(var i = 0; i<category.length; i++){
			if(pageInfo.psn == category[i].psn){
				proPsn = proPsn + "<div class='border-btn animate-common animate-duration-ms proPsn proPsn-active'>"+
					pageInfo.psns[i]+
					"</div>";
			}
			else{
				proPsn = proPsn + "<div class='border-btn animate-common animate-duration-ms proPsn' onclick='changePro("+category[i].pid+")'>"+
					pageInfo.psns[i]+
					"</div>";
			}
		}
		$(".model-select-col").html(proPsn);
	}
}

function drawColorItem(){
	var proColor = '';
	$(".color-select-col").html("");

	for(var i = 0; i<pageInfo.rgbcolors.length; i++){
		if(pageInfo.color == pageInfo.colors[i]){
			proColor = proColor + "<div class='color-round-border animate-common animate-duration-s color-active' data-pid='"+pageInfo.pids[i]+"'"+
										"style='border:1px solid "+pageInfo.rgbcolors[i]+"'>"+
										"<div class='color-round animate-common animate-duration-s'"+
												"style='background-color:"+pageInfo.rgbcolors[i]+"'></div>"+
								  "</div>";
		}
		else{
			proColor = proColor + "<div class='color-round-border animate-common animate-duration-s' onclick='changePro("+pageInfo.pids[i]+")' data-pid='"+pageInfo.pids[i]+"'"+
										"style='border:1px solid "+pageInfo.rgbcolors[i]+"'>"+
										"<div class='color-round animate-common animate-duration-s'"+
												"style='background-color:"+pageInfo.rgbcolors[i]+"'></div>"+
									"</div>";
		}
	}
	$(".color-select-col").html(proColor);
}

function drawStock(){
	if(pageInfo.issell){
		if(pageInfo.stock>10){
			$("#inventory-num").html("");
		}
		else if(pageInfo.stock<=10&&pageInfo.stock>0){
			$("#inventory-num").html("仅剩"+pageInfo.stock+"件");
		}
		else{
			$("#inventory-num").html("暂时无货");
		}
	}
	else{
		$("#inventory-num").html("");
	}
	drawNormalBtn();
}


function drawNormalBtn(){
	if(pageInfo.issell){
		if(pageInfo.stock>0){
			$(".pay").removeClass("pay-none");
			$(".pay").html("立即购买");
			$(".pay").attr("onclick","immeBuy()");
		}
		else{
			$(".pay").addClass("pay-none");
			$(".pay").html("已售罄");
			$(".pay").removeAttr("onclick");
		}
	}
	else{
		$(".pay").addClass("pay-none");
		$(".pay").html("已停售");
		$(".pay").removeAttr("onclick");
	}
}

function drawProAct(){
	var shopPrice = pageInfo.shopprice;//原价
	var btnTxt;//按钮文案
	var discount;//折扣
	var subMoney;//减价
	var showPrice;//显示价格
	var startTime;
	var endTime;
	var timeDif;
	var pcUrl;
	var acpdes;
	if(pageInfo.activity != null || pageInfo.activity.acpid != 0){
		if(pageInfo.activity.mtype!=null){
			switch (pageInfo.activity.mtype){
				case 1://减价
					subMoney = pageInfo.activity.money;
					showPrice = shopPrice - subMoney;
					//btnTxt = "立即购买";
					break;
				case 2://折扣
					discount = pageInfo.activity.discount;
					showPrice = (parseFloat(shopPrice) * parseFloat(discount)).toFixed(2);
					//btnTxt = "立即购买";
					break;
				case 3://满减
				//不考虑
				case 4://预约
					pcUrl = pageInfo.activity.pcurl;
					btnTxt = "预约";
					break;
				default:
					break;
			}
		}
		if(pageInfo.activity.acpdes != null){
			acpdes = pageInfo.activity.acpdes;
		}
		if(pageInfo.activity.startdate != null && pageInfo.activity.enddate != null){
			//startTime = pageInfo.startdate;
			//endTime = pageInfo.enddate;
		}
		if(pageInfo.activity.showdate != null){
			$(".proAct").show();
			$("#timeend").show();
			$(".proPrice-through").hide();
			if(pageInfo.activity.showdate > 0){
				myCountDown = new CountDown(pageInfo.activity.showdate,1000,"showAct");
				myCountDown.start();
			}
			else if(pageInfo.activity.showdate <= 0){
				showActivity(acpdes,showPrice,shopPrice,startTime,endTime,btnTxt,pcUrl,pageInfo.activity.showtype);
				$("#timeend").hide();
			}
		}
		else{
			$(".proPrice-through").hide();
			$(".proAct").hide();
			$("#timeend").hide();
		}
	}
}

function showActivity(acpdes,showPrice,shopPrice,startTime,endTime,btnTxt,pcUrl,showType){
	if(showType == 0){
		if(acpdes != null){//原价
			$(".proAct").html(acpdes);
		}
		if(showPrice != null){//当前价格
			if(showPrice.toString().indexOf(".") > -1){
				numDrump("priceNow",parseFloat($(".proPrice").html()),parseFloat(showPrice),2,0.5);
			}
			else{
				numDrump("priceNow",parseInt($(".proPrice").html()),parseInt(showPrice),0,0.5);
			}
		}
		if(shopPrice != null){//原价
			if(showPrice != null){
				$(".proPrice-through").show();
				if(shopPrice.toString().indexOf(".") > -1){
					numDrump("priceOld",parseFloat($(".proPrice").html()),parseFloat(shopPrice),2,0.5);
				}
				else{
					numDrump("priceOld",parseInt($(".proPrice").html()),parseInt(shopPrice),0,0.5);
				}
			}
			else{
				$(".proPrice-through").hide();
				//$(".proPrice-through").show();
				if(shopPrice.toString().indexOf(".") > -1){
					numDrump("priceNow",parseFloat($(".proPrice").html()),parseFloat(shopPrice),2,0.5);
				}
				else{
					numDrump("priceNow",parseInt($(".proPrice").html()),parseInt(shopPrice),0,0.5);
				}
			}
		}
	}
	else{
		$(".proPrice-through").hide();
	}

	if(btnTxt != null){//按钮文案
		$(".pay").html(btnTxt);
		$(".pay").removeClass("pay-none");
	}
	if(pcUrl != null){//按钮跳转
		$(".pay").removeAttr("onclick");
		$(".pay").click(function(){
			window.location.href = pcUrl;
		});
	}
	if(startTime!=null&&endTime!=null){

	}

	if(showPrice != null){//当前价格
		drawFenqiCol(showPrice);
	}
}

function showEnddate(){
	$("#timeend").html("倒计时："+counttime.hhh+":"+counttime.mm+":"+counttime.ss);

	if(counttime.restTime==0){
		//showActivity();
	}
}

function showAct(){
	$("#timeend").html("倒计时："+myCountDown.hh+":"+myCountDown.mm+":"+myCountDown.ss);
	if(myCountDown.restTime==0){
		setTimeout(function(){
			pageInfo.updateProAct(pageInfo.pid,"drawProAct");
		},2000);
	}
}

function immeBuy(){
	
	if ($("input[name='prompt']:checked").length>0) {
		window.location.href = basepath+"pc/pcOrder.fiil?type=3&buytype=3&pid="+pageInfo.pid+","+$("input[name='prompt']:checked").attr("data-pid")+"&count=1,1";
	}else {
		window.location.href = basepath+"pc/pcOrder.fiil?type=3&buytype=1&pid="+pageInfo.pid+"&count="+num;
	}
	
}

function drawMajor(){
	$("#major").html(pageInfo.majorfunc.majorfunc);
}

function drawParamdesc(){
	$("#spec").html(pageInfo.paramdesc.paramdesc);
	changeTable();
}

function drawPacklist(){
	$("#packList").html(pageInfo.packlist.packlist);
}

function changeTable()
{
	$(".ke-zeroborder").css("width","50%");
	$(".ke-zeroborder tbody tr td").css("vertical-align","central");
	$(".ke-zeroborder").css("margin-top",20+"px");
	$(".ke-zeroborder").css("margin-bottom",10+"px");
	$(".ke-zeroborder").css("margin-left","0%");
	$(".ke-zeroborder tbody tr td").css("background-color","white");
}

function clearPage(){
	$("#xiangqing").html("");
	$("#shuoming").html("");
	$("#shouhou").html("");
	$(".proAct").html("");
	//$(".proPrice").html("");
	//$(".proPrice-through").html("");
	$("#inventory-num").html("");
	$(".color-select-col").html("");
	$(".model-select-col").html("");
	$(".proSliderImg").html("");
	$(".selectors").html("");
	$(".proName").html("");
	$(".proDesc").html("");
	$(".proSer").html("");
	num = 1;
	$("#proNum").text(1);
}

var myCountDown;
var thumbLength = 0;
var counttime;
function moveProThumb(e)
{
	if($(".selectorsCont a").length>5)
	{
		if(e==1)
		{
			$(".thumbLeft").removeAttr("disabled");
			if(thumbLength<$(".selectorsCont a").length-5)
			{
				thumbLength++;
				selectorsContMove(thumbLength);
			}
			else
			{
				$(".thumbRight").attr("disabled","disabled");
			}
		}
		else
		{
			$(".thumbRight").removeAttr("disabled");
			if(thumbLength>0)
			{
				thumbLength--;
				selectorsContMove(thumbLength);
			}
			else
			{
				$(".thumbLeft").attr("disabled","disabled");
			}
		}

	}
}

function styleControlProduct(){
	$("body").css("display","block");
	var bodyWidth = $("body").width();
	var headerTopHeight = 1920*16/1920;
	var headerNavColWidth = 1920*1200/1920;
	var headerNavColHeight = headerNavColWidth*35/1200;

	$(".userCol").css("margin-left",(bodyWidth-1200)/2);
	$("#serCol").css("margin-left",(bodyWidth-1351)/2);

	$(".content").css("margin-top",headerTopHeight+headerNavColHeight*3);
	$(".proInfoDetails").css("margin-left",(bodyWidth-1200)/2);
}


$(window).resize(function(e) {
	styleControlProduct();
});


