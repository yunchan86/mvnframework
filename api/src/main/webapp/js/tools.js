function callback(options,obj){
	if(!options) return ;
	if(!options.callback) return ;
	var fn	= options.callback ;
	//var fnparams = options.callparams ;
	var fnparams = obj ;
	if(options.callparams) fnparams = options.callparams ;
	fn.apply(this,fnparams) ;
}
function set_select(obj,value,options){
	jQuery(obj).val(value) ;
	callback(options,obj) ;
}
function set_text(obj,value,options){
	jQuery(obj).text(value) ;
	callback(options,obj) ;
}
function set_value(obj,value,options) {
	jQuery(obj).val(value) ;
	callback(options,obj) ;
}
function set_radio(obj,value,options){
	var val = jQuery(obj).val() ;
	if(val==value) {
		jQuery(obj).attr("checked",'true') ;
		callback(options,obj) ;
	}
}
function set_checkbox(obj,value,options){
	var val = jQuery(obj).val() ;
	if(val==value) {
		jQuery(obj).attr("checked",'true') ;
		callback(options,obj) ;
	}
}
/**
 * 
 * @param obj
 * @param value
 * @param options
 */
function set_item_value(obj,value,options) {
	var tag = jQuery(obj).get(0).tagName;
	console.log(tag+"  "+value+"  "+jQuery(obj).html()) ;
	if(tag=='INPUT' || tag=='input') {//text radio checkbox
		type=jQuery(obj).attr("type") ;
		if(type=='radio'||type=='RADIO'){//radio
			set_radio(obj,value,options) ;
		}else if(type=='checkbox'||type=='CHECKBOX'){//checkbox
			set_checkbox(obj,value,options) ;
		}else {//其他
			set_value(obj,value,options) ;
		}
	}else if(tag=='SELECT' || tag=='select') {
		set_select(obj,value,options) ;
	}else {
		set_text(obj,value,options) ;
	}
}
function _getvalue(mapkey,rowdata) {
	var keyarr = mapkey.split(".");
	var objval ;
	for(i=0;i<keyarr.length;i++) {
		if(i==0) objval = rowdata[keyarr[i]] ;
		else {
			if(typeof(objval)=='object')
				objval = objval[keyarr[i]] ;
			else return "" ;
		}
	}
	return objval ;
}
/**
 * 设置行数据至html的元素中.
 * @param rowobj	html页面中的行对象，里面可以包括任何的元素，但需要赋值的对象属性必须包括vname，该值必须与map中的数据对应上，否则赋值失败。
 * @param map	需要赋值的数据名称（在rowdata中可以找到）与html需要赋值的对象元素（在rowobj中能找到）建立关联关系。
 * 			map的对象结构如下：
 * 			{
 * 				datacolumn1:htmlvname1,
 * 				datacolumn2:htmlvname2,
 * 				datacolumn3:htmlvname3,
 * 				xxx:xxx
 * 			}
 * @param rowdata   数据对象。结构如下所示：
 * 			{
 * 				datacolumn1:value1,
 * 				datacolumn2:value2,
 * 				datacolumn3:value3,
 * 				datacolumnxxx:valuexxx
 * 			}
 * @param callbackconfig	回调函数的配置
 * 			{
 * 				datacolumn1:{
 * 					callback:function,
 * 					callparams:function_params
 * 				},
 * 				...
 * 			}
 * 
 */
function row_data(rowobj,map,rowdata,callbackconfig){
	jQuery.each(map,function(i){
		var item = jQuery(rowobj).find("[vname='"+map[i]+"']") ;
		//console.log(jQuery(item).html()) ;
		jQuery.each(item,function(k){
			var objval = _getvalue(i,rowdata) ;
			set_item_value(item[k],objval,callbackconfig?callbackconfig[i]:null) ;//TODO
			/*if(typeof(rowdata[i])!='object'&&typeof(rowdata[i])!='function')
				set_item_value(item[k],rowdata[i],callbackconfig?callbackconfig[i]:null) ;//TODO
			else if(typeof(rowdata[i])!='object') {
				var objval = _getvalue(i,rowdata[i]) ;
				set_item_value(item[k],objval,callbackconfig?callbackconfig[i]:null) ;//TODO
			}*/
		});
	});
}
/**
 * 将数据data设置到html中，html需要一个模板（行数据模板）
 * @param data	json数据格式，数据格式如下：
 * 			{
 * 				rowset:[
 * 					{
 * 						datacolumn1:value1,
 * 						datacolumn2:value2,
 * 						datacolumn3:value3,
 * 						datacolumnxxx:valuexxx
 * 					},
 * 					{...},
 * 					{...}
 * 				]
 * 			}
 * @param config	数据配置，配置格式如下：
 * 			{
 * 				map:{
 * 						datacolumn1:htmlvname1,
 * 						datacolumn2:htmlvname2,
 * 						datacolumn3:htmlvname3,
 * 						xxx:xxx
 * 					}
 * 				html:{
 * 					row_template_id:html中页面模板ID ,
 * 					...:...
 * 				}
 * 				callbackconfig:{
 * 					datacolumn1:{
 * 						callback:function,
 * 						callparams:function_params
 * 					},
 * 					...
 * 				}
 * 			}
 */
function list_data(data,config) {
	var rowsdata=data.rowset ;
	//判断config
	config = (!config)?{}:config ;
	//判断data是否有值
	if(!rowsdata) return ;
	//如果没有配置映射，则默认为data中行的数据key
	if(!config.map) {
		config.map = {} ;
		rowdata=rowsdata[0] ;
		jQuery.each(rowdata,function(i){
			//TODO 需要基本的数据类型，其他对象类型排除
			map[i]=i ;
		})
	} 
	//复制页面展示的模版
	if(!config.html) {
		alert("html nodes params is not configuration.") ;
		return ;
	}
	//有配置模板
	if(config.html.row_template_id){
		//行数据循环设置
		var temlateobj=jQuery("#"+config.html.row_template_id) ;
		jQuery(temlateobj).css({"display":"none"}) ;
		jQuery.each(rowsdata,function(row_index){
			//获取行模板，并设置到模板后
			var rowobj=jQuery(temlateobj).clone();
			jQuery(rowobj).removeAttr("id") ;
			//设置行数据
			row_data(rowobj,config.map,rowsdata[row_index],config.callbackconfig) ;
			console.log(jQuery(rowobj).html()) ;
			jQuery(rowobj).css({"display":""}) ;
			jQuery(rowobj).insertBefore(temlateobj) ;
		}) ;
	}
}
function pager(config,ajaxconfig,option) {
	if(!ajaxconfig) {
		alert("ajax config is not null.") ;
		return ;
	};
	if(!ajaxconfig.url) {
		alert("ajax url is required.") ;
		return ;
	}
	if(!ajaxconfig.type) ajaxconfig.type="post" ;
	if(!ajaxconfig.success) ajaxconfig.success=function(responseData){
		list_data(data,config) ;
	} ;
	ajaxconfig.dataType="json" ;
	jQuery.ajax(ajaxconfig);
}
function page_ajax(pageNum,size,url,params) {
	jQuery.ajax({
		type:"post",
		dataType:"json",
		url:url,
		data:params,
		beforeSend:function(){},
		success:function(responseData) {
			
		},
		error:function(){}
	}) ;
}

(function ($) {
    $.fn.showlist = function (options) {
        //你自己的插件代码
    	if(!options || !options.data) return ;
    	
    };
    $.fn.show = function(options) {
    	
    }
})(jQuery);