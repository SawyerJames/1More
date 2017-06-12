	/*
*js Unicode编码转换
*/ 
var decToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u"+res.join("\\u");
}
var hexToDec = function(str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}
//var str=decToHex("decToHex unicode 编码转换");

/*** 
 * 对 特殊字符进行重新编码 
 * **/ 
function URLencode(sStr){ 
    return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F').replace(/\#/g,'%23'); 
 } 