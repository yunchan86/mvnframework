function set_select(obj,value,options){
	jQuery(obj).val(value) ;
}
function set_text(obj,value,options){
	jQuery(obj).text(value) ;
}
function set_radio(obj,value,options){
	jQuery(obj).find("[type='radio'][value='"+value+"']").attr("checked",'true') ;
}
function set_checkbox(obj,value,options){
	jQuery(obj).find("[type='checkbox'][value='"+value+"']").attr("checked",'true') ;
}
function set_item_value(obj,value,options) {
	var tag = jQuery(obj).get(0).tagName;
	if(tag=='INPUT' || tag=='input') {//text radio checkbox
		type=jQuery(obj).attr("type") ;
		if(type=='radio'||type=='RADIO'){
			set_radio(obj,value,options) ;
		}else if(type=='checkbox'||type=='CHECKBOX'){
			set_checkbox(obj,value,options) ;
		}else {
			jQuery(obj).val(value) ;
		}
	}else if(tag=='SELECT' || tag=='select') {
		set_select(obj,value,options,options) ;
	}else {
		jQuery(obj).text(value) ;
	}
}
function set_row_data(rowobj,map,rowdata){
	jQuery.each(map,function(i){
		var item = jQuery(rowobj).find("[vname='"+config.map[i]+"']") ;
		jQuery.each(item,function(k){
			set_item_value(item[k],rowdata[k],null) ;//TODO
		});
	});
}
function page_view_ajax(data,config) {
	//判断config
	config = (!config)?{}:config ;
	//判断data是否有值
	//TODO
	//如果没有配置映射，则默认为data中行的数据key
	if(!config.map) {
		config.map = {} ;
		rowdata=data.rowset[0] ;
		jQuery.each(rowdata,function(i){
			map[i]=i ;
		})
	} 
	//复制页面展示的模版
	if(!config.html) {
		alert("page params is not configuration.") ;
		return ;
	}
	if(config.html.rowtemplate){
		var rowtemplate=jQuery("#"+config.html.rowtemplateid).clone();
		jQuery(rowtemplate).removeAttr("id") ;
		jQuery.each(config.map,function(i){
			var item = jQuery(rowtemplate).find("[vname='"+config.map[i]+"']") ;
			jQuery.each(item,function(k){
				set_item_value(item[k],value,null) ;//TODO
			});
		});
	}
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