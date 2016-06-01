/**
 * Dependent on jQuery
 * 
 * @author Frain 上善若水
 * @date 2015-11-26
 * @copyright 2015
 *
 */


 /*
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
 * 					page_mode:分页类型,//1-单页处理，其他-瀑布类型分页
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
		fn.apply(this, [fnparams,options.defaultconfig]);
	},
	set_item_value:function(obj,value,options) {
		var self = this ;
		if(typeof(value)=='object') {
			self.callback(options,obj) ;
			return ;
		}
		function set_select(obj,value,options){
			jQuery(obj).val(value) ;
			self.callback(options,obj) ;
		}
		function set_text(obj,value,options){
			jQuery(obj).text(value) ;
			self.callback(options,obj) ;
		}
		function set_value(obj,value,options) {
			jQuery(obj).val(value) ;
			self.callback(options,obj) ;
		}
		function set_radio(obj,value,options){
			var val = jQuery(obj).val() ;
			if(val==value) {
				jQuery(obj).attr("checked",'true') ;
				self.callback(options,obj) ;
			}
		}
		function set_checkbox(obj,value,options){
			var val = jQuery(obj).val() ;
			if(val==value) {
				jQuery(obj).attr("checked",'true') ;
				self.callback(options,obj) ;
			}
		}
		function set_href(obj,value,options) {
			jQuery(obj).attr("href",value) ;
			self.callback(options,obj) ;
		}
		function set_src(obj,value,options) {
			jQuery(obj).attr("src",value) ;
			self.callback(options,obj) ;
		}
		
		var tag = jQuery(obj).get(0).tagName;
		console.log(tag+"  "+value+"  "+jQuery(obj).html()) ;
		if(tag=='INPUT' || tag=='input') {//text radio checkbox
			var type=jQuery(obj).attr("type") ;
			if(type=='radio'||type=='RADIO'){//radio
				set_radio(obj,value,options) ;
			}else if(type=='checkbox'||type=='CHECKBOX'){//checkbox
				set_checkbox(obj,value,options) ;
			}else {//其他
				set_value(obj,value,options) ;
			}
		}else if(tag=='SELECT' || tag=='select') {
			set_select(obj,value,options) ;
		}else if (tag=='A' || tag=='a') {
			set_href(obj,value,options) ;
		}else if (tag=='img' || tag=='IMG') {
			set_src(obj,value,options) ;
		}else {
			set_text(obj,value,options) ;
		}
	},
	_getvalue:function(mapkey,rowdata) {
		var keyarr = mapkey.split(".");
		var objval ;
		for(var i=0;i<keyarr.length;i++) {
			if(i==0) objval = rowdata[keyarr[i]] ;
			else {
				if(objval==null) return "" ;
				if(typeof(objval)=='object') {
					if(objval instanceof Array) return "" ;
					objval = objval[keyarr[i]] ;
				}else return "" ;
			}
		}
		return objval ;
	},
	row_data:function(rowobj,map,rowdata,callbackconfig){
		var self = this;
		jQuery.each(map,function(i){
			var item = jQuery(rowobj).find("[vname='"+map[i]+"']") ;
			jQuery.each(item,function(k){
				var objval = self._getvalue(i,rowdata) ;
				if(callbackconfig) {
					var callbackcofigtmp = callbackconfig[i]?callbackconfig[i]:null ;
				}
				if(callbackcofigtmp) {
					if(!callbackcofigtmp.defaultconfig)
						callbackcofigtmp.defaultconfig = {} ;
					callbackcofigtmp.defaultconfig.rowdata=rowdata ;
					callbackcofigtmp.defaultconfig.colvalue=objval;
				}
				self.set_item_value(item[k],objval,callbackcofigtmp) ;
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
			if(!rowsdata) rowsdata = data.list;
			//判断config
			config = (!config)?{}:config ;
			//判断data是否有值
			if(!rowsdata) return ;
			//如果没有配置映射，则默认为data中行的数据key
			if(!config.map) {
				config.map = {} ;
				var rowdata=rowsdata[0] ;
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
				if(config.html.page_mode==1) {
					var olddata = jQuery(temlateobj).siblings();
					if(olddata) {
						jQuery(olddata).remove() ;
					}
				}
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
		ajaxconfig.dataType="json" ;
		jQuery.ajax(ajaxconfig);
	}
};

var PageNav={
		/**
		 * 配置函数的处理
		 */
		config:function(config) {
			config = config ? config : {};
			
			return config ;
		},
		/**
		 * @param eventobj	点击分页按钮的对象
		 * @param config	其他数据配置,如下配置
		 * 		{
		 * 			total_num:页总数量,//这个可以为空。
		 * 		}
		 * 
		 * @return 返回值（JSON对象），返回值说明如下：
		 * 		{
		 * 			is_access:是否可访问,//0-不可访问,1-可访问
		 * 			page_num:获取的跳转的页号,
		 * 			pre_page_num:前一页数据,
		 * 		}
		 */
		get_page_nav_num:function(eventobj,config) {
			var self = this ;
			config = self.config(config) ;
			var result = {
						is_access:1,//0-不能访问，1-可访问
					} ;
			var pageflag = 0 ;//默认不处理
			if(jQuery(eventobj).hasClass("flip")) pageflag = 1 ;//选择数字
			else if(jQuery(eventobj).hasClass("over")) pageflag = 2 ;//上一页
			else if(jQuery(eventobj).hasClass("next")) pageflag = 3 ;//下一页
			else return ;
			//var pagenum = jQuery("#pagenum").val();
			var pagenum = jQuery(eventobj).parents(".pageview").find(".active").attr("pvalue");
			if((!pagenum)||pagenum=='') pagenum = "1";
			var page = parseInt(pagenum);
			result.pre_page_num=page;
			if(pageflag==1) {
				page = parseInt(jQuery(eventobj).html()) ;
				result.page_num = page ;
			}else if(pageflag==2) {
				if(page<=1) result.is_access = 0 ;
				else {
					page = page - 1 ;
					result.page_num = page ;
				}
			}else if(pageflag==3) {
				if(config.total_num&&page>=config.total_num) result.is_access = 0 ;
				else {
					page = page + 1 ;
					result.page_num = page ;
				}
			}else {
				result.is_access = 0 ;
			}
			return result ;
		},
		/**
		 * @param config	配置数据，具体说明如下
		 * 		{
		 * 			curr_pagenum:当前点击需要跳转的页面,
		 * 			pre_pagenum:上一页面,
		 * 			total_num:总页数,
		 * 		}
		 * @param options 扩展参数，暂未设置，保留
		 */
		init_page_nav:function(config,options) {
			var self = this ;
			config = self.config(config) ;
			var active_class = "active" ;
			var show_css = {"display":""};
			var hidden_css = {"display":"none"};
			var threshold = 10 ;
			/**
			var left_num = 3;
			var center_num = 4 ;
			var right_num = 3 ;
			**/
			var total_num = config.total_num ? config.total_num : 1 ;//最大页数
			//var page_view_obj = jQuery(eventobj).parents(".pageview") ;
			var page_view_obj = jQuery(".pageview");
			var curr_pagenum = config.curr_pagenum ;
			var pre_pagenum = config.pre_pagenum ;
			var e1 = jQuery(page_view_obj).find("[ptag=E1]");
			var e2 = jQuery(page_view_obj).find("[ptag=E2]");
			if(total_num<=1) {//只有一页则不显示
				jQuery(page_view_obj).css(hidden_css) ;
			}else if(total_num<=threshold) {//小于指定显示时所有都按数字展示，同时去掉点显示
				jQuery(e1).css(hidden_css) ;
				jQuery(e2).css(hidden_css) ;
				for(var i=threshold;i>0;i--) {
					var displayobj =  jQuery(page_view_obj).find("[ptag=N"+i+"]");
					if(i>total_num) {
						jQuery(displayobj).css(hidden_css) ;
					}else {
						jQuery(displayobj).css(show_css) ;
					}
					jQuery(displayobj).html(i) ;
					jQuery(displayobj).attr("pvalue",i) ;
					jQuery(displayobj).removeClass(active_class) ;
				}
				var activeobj = jQuery(page_view_obj).find("[pvalue="+curr_pagenum+"]") ;
				jQuery(activeobj).addClass(active_class) ;
			}else {
				if(curr_pagenum<7) {
					jQuery(e1).css(hidden_css) ;
					jQuery(e2).css(show_css) ;
					for(var i=1;i<=threshold;i++) {
						var displayobj =  jQuery(page_view_obj).find("[ptag=N"+i+"]");
						if(i<=7) {
							jQuery(displayobj).html(i) ;
							jQuery(displayobj).attr("pvalue",i) ;
						}
						else {
							var value = total_num+i-threshold ;
							jQuery(displayobj).html(value) ;
							jQuery(displayobj).attr("pvalue",value) ;
						}
						jQuery(displayobj).removeClass(active_class) ;
					}
					var activeobj = jQuery(page_view_obj).find("[pvalue="+curr_pagenum+"]") ;
					jQuery(activeobj).addClass(active_class) ;
				}else if(curr_pagenum>=7&&curr_pagenum<=total_num-7) {
					jQuery(e1).css(show_css) ;
					jQuery(e2).css(show_css) ;
					for(var i=1;i<=threshold;i++) {
						var displayobj =  jQuery(page_view_obj).find("[ptag=N"+i+"]");
						jQuery(displayobj).removeClass(active_class) ;
						if(i<=3) {
							jQuery(displayobj).html(i) ;
							jQuery(displayobj).attr("pvalue",i) ;
						}else if(i>3&i<=7) {
							if(curr_pagenum%3==1) {//重新设置，放到中间的第一个
								var value = curr_pagenum+i-4 ;
								jQuery(displayobj).html(value) ;
								jQuery(displayobj).attr("pvalue",value) ;
							}else if (curr_pagenum%3==2){
								var value = curr_pagenum+i-5 ;
								jQuery(displayobj).html(value) ;
								jQuery(displayobj).attr("pvalue",value) ;
							} else {
								var value = curr_pagenum+i-6 ;
								jQuery(displayobj).html(value) ;
								jQuery(displayobj).attr("pvalue",value) ;
							}
						}else {
							var value = total_num+i-threshold ;
							jQuery(displayobj).html(value) ;
							jQuery(displayobj).attr("pvalue",value) ;
						}
					}
					var activeobj = jQuery(page_view_obj).find("[pvalue="+curr_pagenum+"]") ;
					jQuery(activeobj).addClass(active_class) ;
				}else if(curr_pagenum>total_num-7){
					//alert() ;
					jQuery(e1).css(show_css) ;
					jQuery(e2).css(hidden_css) ;
					for(var i=1;i<=threshold;i++) {
						var displayobj =  jQuery(page_view_obj).find("[ptag=N"+i+"]");
						jQuery(displayobj).removeClass(active_class) ;
						if(i<=3) {
							jQuery(displayobj).html(i) ;
							jQuery(displayobj).attr("pvalue",i) ;
						}else {
							var value = total_num+i-threshold ;
							jQuery(displayobj).html(value) ;
							jQuery(displayobj).attr("pvalue",value) ;
						}
					}
					var activeobj = jQuery(page_view_obj).find("[pvalue="+curr_pagenum+"]") ;
					jQuery(activeobj).addClass(active_class) ;
				}
			}
		},
		/**
		 * @param eventobj	点击分页按钮的对象
		 * @param config	配置数据，具体说明如下
		 * 		{
		 * 			curr_pagenum:当前点击需要跳转的页面,
		 * 			pre_pagenum:上一页面,
		 * 			total_num:总页数,
		 * 		}
		 * @param options 扩展参数，暂未设置，保留
		 */
		reset_page_nav:function(eventobj,config,options) {
			var self = this ;
			self.init_page_nav(config,options) ;
		}
} ;
