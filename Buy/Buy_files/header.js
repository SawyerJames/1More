/**
 * Created by Administrator on 2016/11/19.
 */

$(document).ready(function(){
	eventBindingMenu();
});

function eventBindingMenu(){
	$("[data-select=menu-pro]").hover(function(){
		$(".fiil-header").addClass("fiil-menu-show");
	},function(){
		$(".fiil-header").removeClass("fiil-menu-show");
	});

	$("[data-select=menu-service]").hover(function(){
		$(".fiil-header").addClass("fiil-menu-server-show");
	},function(){
		$(".fiil-header").removeClass("fiil-menu-server-show");
	});

	//$(".hover-sub-ser").hover(function(){
	//	$("[data-sub=sub-ser]").fadeIn(1);
	//	$(".j-nav-bar").addClass("home-nav-sub-show");
	//	$(".j-nav-bar").addClass("home-nav-subSer-show");
	//},function(){
	//	$("[data-sub=sub-ser]").fadeOut(50);
	//	$(".j-nav-bar").removeClass("home-nav-sub-show");
	//	$(".j-nav-bar").removeClass("home-nav-subSer-show");
	//	$(".sub-url").removeClass("opacity-sub-item");
	//});
	//
	//$(".sub-url").hover(function(){
	//	$(this).css("-webkit-transition-delay",0);
	//	$(this).css("transition-delay",0);
	//	$(".sub-url").addClass("opacity-sub-item");
	//	$(this).removeClass("opacity-sub-item");
	//},function(){
	//	$(this).css("-webkit-transition-delay",($(this).index()+1)*0.2);
	//	$(this).css("-transition-delay",($(this).index()+1)*0.2);
	//});
}
