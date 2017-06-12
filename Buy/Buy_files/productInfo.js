/**
 * 
 * */
//初始化全局变量
 var category= new Array();
 var kindpro = new Array();
 var kinds = new Array();
 var pros = new Array();
//所有懒加载资源
 var descs = new Array();  //描述
 var proParams = new Array(); //参数
 var photos = new Array();  //图片
 var aftersale = new Array();  //售后
 var majorfunc = new Array(); 	//主要功能
 var packlist = new Array();	//包装信息
 var video = new Array();
 //页面展示信息构造函数
 var PageInfo = function(){
	this.isInit = false;     //是否初始化
 	this.pid = ''; 		//商品id
 	this.psn = '';  	//商品psn
 	this.pname = ''; 	//商品名称
 	this.pimgsurl = [];  	//图片url
 	this.color = '';  		//颜色
 	this.rgbcolor='';  		//颜色
 	this.stock = ''; 		//库存
 	this.issell = ''; 		//状态
 	this.slogan = '';  		//副标题
 	this.shopprice = 0.0;		//价格
 	this.serviceinfo = '';		//服务
 	this.description = '';		//商品描述
 	this.video = '';
 	this.paramdesc = '';		//商品参数
 	this.aftersale = '';		//售后服务
 	this.majorfunc = '';	//主要功能
 	this.packlist = '';		//包装信息
 	this.infohref = '';		//了解详情地址
 	this.pcinfohref = '';	//pc了解详情地址
 	this.moinfohref = '';	//mo了解详情地址
 	this.buycount = 1;		//购买数量
 	this.kid = 0;		//商品所属规格
 	//this.cateid = 0;	//商品所属分类
 	this.pcid =0;		//商品所属型号
 	this.kinds = [];	//商品所属规格同级规格
 	this.pids = [];		//同级商品id
 	this.colors = [];		//商品所属颜色同级颜色
 	this.rgbcolors = [];		//商品所属颜色同级颜色
 	this.psns = [];			//商品所属型号同级型号
 	this.pcids = []; 		//商品所属型号同级型号
 	this.photos = [];
 	
 	//活动相关信息
 	this.activity = {
 		acpid:0,  //活动标识	
 		showdate :0,	//倒计时
 		showtype:'',	//展示规则
 		startdate:0,	//开始时间
 		enddate:0,		//结束时间
 		acpdes:'',		//活动信息
 		mtype:0,		//活动类型
 		money:0,		//减价
 		discount:1,		//打折
 		orderamountlower:0.0,	//满减
 		pcurl:'',
 		mourl:''
 	};
 };
 
//从商品list中找到指定商品
function getProInfoFromPros(pid){
	for (var i = 0; i < pros.length; i++) {
	    if (pid==pros[i].pid) {
	        return pros[i];
	    }
	}
	return null;
}

//注入
PageInfo.prototype.init = function(pid,func){
	var tempinfo = this;
	var url= 'proInfo.fiil?jsoncallback=?';
	$.getJSON(url,{pid:pid,type:"info"},function(data){
		if (data!=null) {
			//初始化数据
			category= data.category;
			//kindpro = data.kindpro;
			//kinds = data.kinds;
			pros = data.pros;
			//初始化pageInfo数据
			//tempinfo.cateid = cateid;
			tempinfo.psns =[];
			for (var i = 0; i < category.length; i++) {
				tempinfo.psns.push(category[i].psn);
			} 
			if(pid!=0){   //有商品
				tempinfo.changepid(pid);
				//测试
				//tempinfo.changePcid(1);
			}else{  //无pid,在分类
				var cpid =  category[0].cpid;
				//更新信息
				tempinfo.changePcid(cpid);
			}
			tempinfo.isInit = true;
		}
	});
	evalFun(func);
};

function evalFun(func,param){
	if (func!=null&&func!="") {
		if(param != null && param.length>0){
			var paramObj = param;
			eval(func+"("+paramObj+")");
		}
		else{
			eval(func+"()");
		}
	}
}

//更新库存和购买状态
PageInfo.prototype.updateStock = function(func){
	var tempinfo = this;
	var url= 'proInfo.fiil?jsoncallback=?';
	$.getJSON(url,{pid:tempinfo.pid,type:"stock"},function(data){
		//跟新数据
		tempinfo.pid = data.pid;
		tempinfo.stock = data.number;
		tempinfo.issell = data.issell;
		if (func!=null&&func!="") {
			evalFun(func);
		}
	});

};

//更新规格
PageInfo.prototype.updateParamdesc = function (etype,func){
	var tempinfo = this;
	var b =true;   //判断缓存中是否有数据
	for (var i = 0; i < proParams.length; i++) {
		if (tempinfo.pid==proParams[i].pid) {
			tempinfo.paramdesc = proParams[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"paramdesc",etype:etype},function(data){
			//跟新数据
			tempinfo.paramdesc = data;
			proParams.push({"pid":tempinfo.pid,"info":data});
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}

};

//更新介绍
PageInfo.prototype.updateIntroduce = function (etype,func){
	var tempinfo = this;
	var b =true;   //判断缓存中是否有数据
	for (var i = 0; i < descs.length; i++) {
		if (tempinfo.pid==descs[i].pid) {
			tempinfo.description = descs[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"description",etype:etype},function(data){
			//跟新数据
			tempinfo.description = data;
			descs.push({"pid":tempinfo.pid,"info":data});
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}

};

//更新产品售后服务
PageInfo.prototype.updateAftersale = function (etype,func){
	var tempinfo = this;
	var b =true;  //判断缓存中是否有数据
	for (var i = 0; i < aftersale.length; i++) {
		if (tempinfo.pid==aftersale[i].pid) {
			tempinfo.aftersale = aftersale[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"aftersale",etype:etype},function(data){
			//跟新数据
			tempinfo.aftersale = data;
			aftersale.push({"pid":tempinfo.pid,"info":data});
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}
};


//更新产品主要功能
PageInfo.prototype.updateMajorfunc = function (etype,func){
	var tempinfo = this;
	var b =true;  //判断缓存中是否有数据
	for (var i = 0; i < majorfunc.length; i++) {
		if (tempinfo.pid==majorfunc[i].pid) {
			tempinfo.majorfunc = majorfunc[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"majorfunc",etype:etype},function(data){
			//跟新数据
			tempinfo.majorfunc = data;
			majorfunc.push({"pid":tempinfo.pid,"info":data});
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}
};


//更新产品包装清单
PageInfo.prototype.updatePacklist = function (etype,func){
	var tempinfo = this;
	var b =true;  //判断缓存中是否有数据
	for (var i = 0; i < packlist.length; i++) {
		if (tempinfo.pid==packlist[i].pid) {
			tempinfo.packlist = packlist[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"packlist",etype:etype},function(data){
			//跟新数据
			tempinfo.packlist = data;
			packlist.push({"pid":tempinfo.pid,"info":data});
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}
};



//更新产品视频信息
PageInfo.prototype.updateVideo = function (func){
	var tempinfo = this;
	var b =true;  //判断缓存中是否有数据
	for (var i = 0; i < video.length; i++) {
		if (tempinfo.pid==video[i].pid) {
			tempinfo.video = video[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"video"},function(data){
			//跟新数据
			tempinfo.video = data;
			video.push({"pid":tempinfo.pid,"info":data});
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}
};






//更新产品图片信息,type为设备类型
PageInfo.prototype.updatePhotos = function (etype,func){
	var tempinfo = this;
	var b =true; //判断缓存中是否有数据
	for (var i = 0; i < photos.length; i++) {
		if (tempinfo.pid==photos[i].pid) {
			tempinfo.photos = photos[i].info;
			b=false;
			if (func!=null&&func!="") {
				evalFun(func);
			}
			break;
		}
	}
	if (b) {
		var url= 'proInfo.fiil?jsoncallback=?';
		$.getJSON(url,{pid:tempinfo.pid,type:"photos"},function(data){
			for (var i = 0; i < data.length; i++) {
				if (etype==data[i].type) {
					//跟新数据
					photos.push({"pid":tempinfo.pid,"info":data[i].showimgs});
					tempinfo.photos = data[i].showimgs;
				}
			}
			if (func!=null&&func!="") {
				evalFun(func);
			}
		});
	}
};

//更新产品活动信息
PageInfo.prototype.updateProAct = function (pid,func){
	var tempinfo = this;
	//查找活动
	var url = 'act.fiil?jsoncallback=?';
	$.getJSON(url,{pid:pid,oper: "4"},function(data){
		if(data!=null&&data!=""){ //存在活动
			
			tempinfo.activity.showdate = data.showdate; 		//到倒计时
			tempinfo.activity.showtype = data.showtype;		//展现形式
			tempinfo.activity.mtype = data.mtype; 		//活动类型
			tempinfo.activity.money = data.money;  		//减价
			tempinfo.activity.discount = data.discount;		//打折
			tempinfo.activity.startdate = data.startdate;		//开始时间
			tempinfo.activity.enddate = data.enddate;		//结束时间
			tempinfo.activity.acpdes = data.acpdes;		//活动藐视
			tempinfo.activity.orderamountlower = data.orderamountlower;		//满减
			tempinfo.activity.acpid = data.acpid;		//标识
			tempinfo.activity.pcurl = data.pcurl;
			tempinfo.activity.mourl = data.mourl;
			if (func!=null&&func!="") {
				evalFun(func);
			}
		}
	});

};

//更改型号
PageInfo.prototype.changePcid = function (pcid,func){
	/*this.pcid = pcid;
	for (var i = 0; i < kinds.length; i++) {
		if (pcid==kinds[i].pcid) {
			//kinds赋值
			this.changekid(this.kid,func);
			break;
		}
	}*/
	this.pcid = pcid;
	for (var i = 0; i < category.length; i++) {
		if (pcid==category[i].pcid) {
			this.changepid(category[i].pid, "");
		}
	}
};

//更改规格参数
PageInfo.prototype.changekid = function (kid,func){
	this.kid = kid;
	for (var i = 0; i < kindpro.length; i++) {
		if (kid==kindpro[i].kinfoid) {
			//kinds赋值
			this.pids = kindpro[i].pids;
			//改变优先kid
			this.pid = kindpro[i].pids.split(',')[0];
			this.changepid(this.pid,func);
			break;
		}
	}
	if (func!=null&&func!="") {
		evalFun(func);
	}
};
//更改产品
PageInfo.prototype.changepid = function (pid,func){
	this.pid = pid;
	var pro = getProInfoFromPros(pid);
	this.pid = pro.pid;
	this.psn = pro.psn;
	this.pname = pro.name;
	this.color = pro.color;
	this.rgbcolor=pro.rgbcolor;
	this.stock = pro.stock;
	this.issell = pro.issell;
	this.slogan = pro.slogan;
	this.shopprice = pro.shopprice;
	this.serviceinfo = pro.serviceinfo;
	this.infohref  = pro.infohref;
	if (pro.infohref!=undefined&&pro.infohref!="") {
		this.pcinfohref = pro.infohref.split(';')[0];
		this.moinfohref = pro.infohref.split(';')[1];
	} else {
		this.pcinfohref = "#";
		this.moinfohref = "#";
	}
	this.pids = [];		//将其滞空
	this.colors = [];	//将其滞空
	this.rgbcolors = [];	//将其滞空
	for (var i = 0; i < pros.length; i++) {
		var pro = pros[i];
		if (this.psn == pro.psn) {
			this.pids.push(pro.pid);
			this.colors.push(pro.color);
			this.rgbcolors.push(pro.rgbcolor);
		}
	}
	//pcid赋值
	for (var i = 0; i < category.length; i++) {
		if (category[i].psn==this.psn) {
			this.pcid = category[i].pcid;
			break;
		}
	}
	/*	//kinds赋值
	for (var s = 0; s < kinds.length; s++) {
		if (kinds[s].pcid==this.pcid) {
			this.kinds = kinds[s].kinds;
			break;
		}
	}
	//kid赋值
	for (var j = 0; j < kindpro.length; j++) {
		var pids = new Array();
		pids = kindpro[j].pids.split(',');
		for (var k = 0; k < pids.length; k++) {
			if (this.pid==pids[k]) {
				//pid赋值
				this.pids = pids;
				this.kid = kindpro[j].kinfoid;
			}
		}
	}*/
	if (func!=null&&func!="") {
		evalFun(func);
	}
};



