/**
 * 去除html标签
 */
//删除html标签
function replace_html(str){
	if (str==null||str==undefined||str=="") {
		return "";
	} else {
		str = str.replace(/\</g,'&lt;');
		str = str.replace(/\>/g,'&gt;');
		str = str.replace(/\n/g,'<br/>');
		return str;
	}
	
}