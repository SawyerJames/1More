
/***********************************************************************************************************************/
/**
*倒计时
*restTime 倒计时毫秒数秒数
*refreshTime
*showFun 显示倒计时的函数
*/
var CountDown = function (restTime,refreshTime,showFun){
	this.beginRestTime = restTime;
	this.restTime = restTime;
	this.refreshTime = refreshTime;
	this.hhh = zeroStr(Math.floor(this.restTime/3600000),3);
	this.hh = zeroStr(Math.floor(this.restTime/3600000),2);
	this.mm = zeroStr(Math.floor(((this.restTime/1000)%3600)/60),2);
	this.ss = zeroStr(Math.floor((this.restTime/1000)%60),2);
	this.ms = zeroStr(Math.floor(this.restTime%1000),3);
	this.showFun = showFun;
	this.createdate = new Date();
	this.timer = null;
	this.state = 0;//该倒计时状态，0为未开始，1为运行中，2为暂停，3为结束
}

CountDown.prototype = {
	start:function(){//倒计时开始
		var tempThis = this;
		if(this.state!=1){
			this.state = 1;
			this.timer = setInterval(function(){
			tempThis.restTime = tempThis.restTime - tempThis.refreshTime;
			tempThis.hhh = zeroStr(Math.floor(tempThis.restTime/3600000),3);
			tempThis.hh = zeroStr(Math.floor(tempThis.restTime/3600000),2);
			tempThis.mm = zeroStr(Math.floor(((tempThis.restTime/1000)%3600)/60),2);
			tempThis.ss = zeroStr(Math.floor((tempThis.restTime/1000)%60),2);
			tempThis.ms = zeroStr(Math.floor(tempThis.restTime%1000),3);
			
			if(tempThis.restTime<=0){
				clearInterval(tempThis.timer);
				tempThis.restTime = 0;
				tempThis.hhh = "000";
				tempThis.hh = "00";
				tempThis.mm = "00";
				tempThis.ss = "00";
				tempThis.ms = "000";
			}
			
			
			if(tempThis.showFun!=null&&""!=tempThis.showFun){
				eval(tempThis.showFun+"()");//执行func_abc()函数
			}
			
		},this.refreshTime);
		}
	},
	stop:function(){//倒计时结束
		this.state = 3;
		if(this.timer!=null){
			this.restTime = 0;
			this.hhh = "000";
			this.hh = "00";
			this.mm = "00";
			this.ss = "00";
			this.ms = "000";
			clearInterval(this.timer);
			if(this.showFun!=null&&""!=this.showFun){
				eval(this.showFun+"()");//执行func_abc()函数
			}
		}
	},
	pause:function(){//倒计时暂停
		this.state = 2;
		if(this.timer!=null){
			clearInterval(this.timer);
		}
	}

}

/**
*在字符产之前拼接0达到指定位数
*/
function zeroStr(str,len){
	var retStr = str;
	if(str!=null){
		for(var i=0;i<len -(""+str).length;i++){
			retStr = "0"+retStr;
		}
	}else{
		for(var i=0;i<len;i++){
			retStr = "0"+retStr;
		}
	}
	return retStr;
}

/***********************************************************************************************************************/