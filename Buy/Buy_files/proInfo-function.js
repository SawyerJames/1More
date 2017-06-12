function initProImgBanner(num){
	$(".proInfo-img-list").owlCarousel({
		initItemWidth: 549,
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		pagination: true,
		items: 1,
		stopOnHover: true,
		singleItem:true,
		autoPlay: 5000,
		lazyLoad: true,
		itemsCal: true
	});
}

function reinit(num){
	var owl = $(".owl-carousel").data('owlCarousel');
	//owl.destroy();
	owl.reinit({
		initItemWidth: 549,
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		pagination: true,
		items: 1,
		stopOnHover: true,
		singleItem:true,
		autoPlay: 5000,
		lazyLoad: true,
		itemsCal: true
	});
}