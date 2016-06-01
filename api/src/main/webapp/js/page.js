/**
 * Dependent on jQuery
 * 
 * @author Frain 上善若水
 * @date 2015-11-26
 * @copyright 2015
 *
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
 * 将数据data设置到html(如上config配置的html)中，html需要一个模板（行数据模板）
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
 */
var Pager = {
	config:null,
	data:null,
	callback : function(options, obj) {
		if (!options)
			return;
		if (!options.callback)
			return;
		var fn = options.callback;
		// var fnparams = options.callparams ;
		var fnparams = obj;
		if (options.callparams)
			fnparams = options.callparams;
		fn.apply(this, fnparams);
	},
	set_item_value:function(obj,value,options) {
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
	},
	row_data:function(rowobj,map,rowdata,callbackconfig){
		var self = this;
		jQuery.each(map,function(i){
			var item = jQuery(rowobj).find("[vname='"+map[i]+"']") ;
			jQuery.each(item,function(k){
				var objval = _getvalue(i,rowdata) ;
				self.set_item_value(item[k],objval,callbackconfig?callbackconfig[i]:null) ;//TODO
			});
		});
	},
	/**
	 * @param data  同上文data参数说明
	 * @param config 同上文config参数说明
	 */
	list_data:function(data,config) {
		var self = this ;
		if(!self.config) self.config = config ;
		if(!config) config = self.config ;
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
					self.row_data(rowobj,config.map,rowsdata[row_index],config.callbackconfig) ;
					console.log(jQuery(rowobj).html()) ;
					jQuery(rowobj).css({"display":""}) ;
					jQuery(rowobj).insertBefore(temlateobj) ;
				}) ;
			}
		},
	pager:function(ajaxconfig,config,option) {
		var self = this ;
		if(!self.config) self.config = config ;
		if(!config) config = self.config ;
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
			self.data = responseData ;
			self.list_data(self.data,config) ;
		} ;
		//ajaxconfig.dataType="json" ;
		jQuery.ajax(ajaxconfig);
	}
};
