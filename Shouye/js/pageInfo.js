/**
 *   页面信息
 */
 
//测试
// var basepath = 'http://101.200.192.204:11202/';
// var basepath = '<%=basePath%>';
//正式
var basepath = "https://s.fiil.com/";
  
var pageInfo = function(){

	this.pid = ''; 		//pid
	this.page = '';  	//page
	this.location = ''; 	//location
	this.name = '';  		//name
	this.type='';  		//type
	this.plat = ''; 		//plat
	this.title = ''; 		//title
	this.description = '';  		//description
	this.content = '';		//content
	this.showimg = '';		//showimg
	this.showvideo = '';		//showvideo
	this.jumpurl = '';		//jumpurl
	this.jumptype = '';		//jumptype
	this.displayorder = '';	//displayorder
	this.state = '';		//state
};


//获取数据的function   oper 必须为pageInfo
//page
//location
//plat
//state
//pageInfoArray   保存数据的数组
//func 保存后执行的方法
function getPageInfo(oper,page,location,plat,state,pageInfoArray,func){
	var url = basepath+"pageInfo.fiil?jsoncallback=?";
	$.getJSON(url, {
		jt:1, //必须传
		oper:oper,//必须传
		page:page,
		location:location,
		plat:plat,
		state:state
	}, function(data) {
		for (var i = 0; i < data.length; i++) {
			var pageinfo = new pageInfo();
			pageinfo.pid = data[i].pid ;
			pageinfo.page = data[i].page ;
			pageinfo.location = data[i].location ;
			pageinfo.name = data[i].name ;
			pageinfo.type = data[i].type ;
			pageinfo.plat = data[i].plat ;
			pageinfo.title = data[i].title ;
			pageinfo.description = data[i].description ;
			pageinfo.content = data[i].content ;
			pageinfo.showimg = data[i].showimg ;
			pageinfo.showvideo = data[i].showvideo ;
			pageinfo.jumpurl = data[i].jumpurl ;
			pageinfo.jumptype = data[i].jumptype ;
			pageinfo.displayorder = data[i].displayorder ;
			pageinfo.state = data[i].state ;
			pageInfoArray.push(pageinfo);
		}
		if (func!=null&&func!="") {
			eval(func+"(pageInfoArray)");
		}
	});
}
  	