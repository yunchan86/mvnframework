var Clipboard = {
	copy:function(event, value) {
		var event = event || window.event;
		if(event.clipboardData){
			return event.clipboardData.setData("text/plain", value);
		}else if(window.clipboardData){alert(112) ;
			return window.clipboardData.setData("text", value);
		}
	},
	paste:function(event) {
		var event = event || window.event;
		var clipboardData = event.clipboardData || window.clipboardData;
		return clipboardData.getData("text");
	},
	
};
var Tools = {
	/***联动***/
	Linkage:{
		getdata_ajax:function(obj,parentvalue,calls) {
			
		}
	},
	
};
var Tooltip = {
		_get_tip_name:function() {
			return "tip-name";
		},
		/**
		 *  内部定义的css样式
		 *  @param name css处理的样式的类型名，要与定义的一致,否则取默认值
		 *  @param position_type 位置显示的类型，左(left)、左上(left-top)、左下(left-bottom)、中上(center-top)、中下(center-bottom)、右(right)、右上(right-top)、右下(right-bottom)等
		 *  @param obj 对象
		 */
		_get_tip_css:function(name,position_type,obj) {
			var css_array = {//定义的css样式
					"default":{
						"outer":{
							"display":"inline-block",
							"z-index":"1000",
							"position":"absolute",
							"color":"white",
							"font-size":"10px",
						},
						"inner":{
							"display":"inline-block",
							"position":"relative",
							"background-color":"rgba(255,0,0,0.5)",
							"color":"black",
							"width":"100%",
							"left":"0px",
							"top":"0px",
							"padding":"5px",
							"-moz-border-radius": "6px",
							"-webkit-border-radius": "6px",
							"border-radius": "6px",
							"display":"inline-block",
						},
						"content":{
							"display":"inline-block",
							"width":"100%",
						},
						"arrow":{
							"height": "0",
							"width": "0",
							"border-bottom":"10px solid rgba(255,0,0,0.5)",
							"border-right": "5px solid transparent",
							"border-left": "5px solid transparent",
							"position": "absolute",
							"top": "-10px",
							"left": "30px",
							"display":"inline-block",
						},
					},
					"green":{
						"outer":{
							"display":"inline-block",
							"z-index":"1000",
							"position":"absolute",
							"color":"white",
							"font-size":"10px",
						},
						"inner":{
							"display":"inline-block",
							"position":"relative",
							"background-color":"green",
							"color":"black",
							"width":"100%",
							"left":"0px",
							"top":"0px",
							"padding":"5px",
							"-moz-border-radius": "6px",
							"-webkit-border-radius": "6px",
							"border-radius": "6px",
							"display":"inline-block",
						},
						"content":{
							"display":"inline-block",
							"width":"100%",
						},
						"arrow":{
							"height": "0",
							"width": "0",
							"border-bottom":"10px solid green",
							"border-right": "5px solid transparent",
							"border-left": "5px solid transparent",
							"position": "absolute",
							"top": "-10px",
							"left": "30px",
							"display":"inline-block",
						},
					},
					"red":{
						"outer":{
							"display":"inline-block",
							"z-index":"1000",
							"position":"absolute",
							"color":"white",
							"font-size":"10px",
						},
						"inner":{
							"display":"inline-block",
							"position":"relative",
							"background-color":"rgba(255,0,0,0.5)",
							"color":"black",
							"width":"100%",
							"left":"0px",
							"top":"0px",
							"padding":"5px",
							"-moz-border-radius": "6px",
							"-webkit-border-radius": "6px",
							"border-radius": "6px",
							"display":"inline-block",
						},
						"content":{
							"display":"inline-block",
							"width":"100%",
						},
						"arrow":{
							"height": "0",
							"width": "0",
							"border-bottom":"10px solid rgba(255,0,0,0.5)",
							"border-right": "5px solid transparent",
							"border-left": "5px solid transparent",
							"position": "absolute",
							"top": "-10px",
							"left": "30px",
							"display":"inline-block",
						},
					},
					"black":{
						"outer":{
							"display":"inline-block",
							"z-index":"1000",
							"position":"absolute",
							"color":"white",
							"font-size":"10px",
						},
						"inner":{
							"display":"inline-block",
							"position":"relative",
							"background-color":"black",
							"color":"white",
							"width":"100%",
							"left":"0px",
							"top":"0px",
							"padding":"5px",
							"-moz-border-radius": "6px",
							"-webkit-border-radius": "6px",
							"border-radius": "6px",
							"display":"inline-block",
						},
						"content":{
							"display":"inline-block",
							"width":"100%",
						},
						/**
						"arrow":{
							"height": "0",
							"width": "0",
							"border-top":"10px solid black",
							"border-right": "5px solid transparent",
							"border-left": "5px solid transparent",
							"position": "absolute",
							"bottom": "-10px",
							"left": "30px",
						},
						*/
						"arrow":{
							"height": "0",
							"width": "0",
							"border-bottom":"10px solid black",
							"border-right": "5px solid transparent",
							"border-left": "5px solid transparent",
							"position": "absolute",
							"top": "-10px",
							"left": "30px",
							"display":"inline-block",
						},
					},
			};
			var css = (css_array[name]==undefined) ? css_array["default"] : css_array[name] ;
			return css ;
		},
		/**
		 * 获取对象的tip的位置坐标或像素位置
		 * @param obj 文本框显示的对象
		 * @param position_type 位置显示的类型，左(left)、左上(left-top)、左下(left-bottom)、中上(center-top)、中下(center-bottom)、右(right)、右上(right-top)、右下(right-bottom)等
		 * @return offset.left offset.top 返回页面的left、top的位置
		 * 
		 */
		_get_tip_postion:function(obj,position_type) {
			var offset = jQuery(obj).offset() ;
			var height = jQuery(obj).outerHeight();
			//TODO 一下ifelse需要重新编写
			if(!position_type) {
				offset.top = offset.top+height ;
				offset.left = offset.left+5 ;
			}else if(position_type=="left") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="left-top") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="left-bottom") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="center-top") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="center-bottom") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="right") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="right-top") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else if(position_type=="right-top") {
				offset.top = offset.top-5 ;
				offset.left = offset.left +5 ;
			}else {
				offset.top = offset.top+height ;
				offset.left = offset.left+5 ;
			}
			return offset ;
		},
		/**
		 * 创建tip提示框,但是不能创建hidden的数据
		 * @param obj 文本框对象
		 * @param options 配置
		 * {
		 * 	"css_name":css的名称，见_get_tip_css方法
		 * 	"position_type":postion的offset的位置，详细见_get_tip_postion方法
		 * }
		 *	//TODO 需要重新操作hidden的数据
		 */
		create:function(obj,selfconig,options) {
			var self = this ;
			var that = Tooltip ;
			var name = jQuery(obj).attr("name") ;
			var tipname_attr = that._get_tip_name();
			var tipobj = jQuery("div["+tipname_attr+"="+name+"]") ;
			var content = null ;
			if(!options) options={};
			if(!(jQuery(tipobj).html())) {
				tipobj = jQuery("<div></div>") ;
				var inner = jQuery("<div></div>") ;
				content = jQuery("<div></div>") ;
				var arrow = jQuery("<div></div>") ;
				var offset = that._get_tip_postion(obj,options.position_type) ;
				var css = that._get_tip_css(options.css_name) ;
				var position_css = {	//默认的css样式
						"top":offset.top+"px",
						"left":offset.left+"px",
					};
				jQuery(inner).css(css['inner']) ;
				jQuery(content).css(css['content']) ;
				jQuery(arrow).css(css['arrow']) ;
				jQuery(tipobj).css(css['outer']) ;
				jQuery(inner).append(content) ;
				jQuery(inner).append(arrow) ;
				jQuery(tipobj).append(inner) ;
				jQuery(tipobj).css(position_css) ;
				jQuery(tipobj).attr(tipname_attr,name) ;
			}else {
				jQuery(tipobj).css({"display":"block"}) ;
			}
			var text = selfconig.text ;
			if(text) {
				jQuery(content).html(text) ;
				jQuery("body").append(tipobj) ;
			}
		},
		remove:function(obj,options) {
			var self = this ;
			var that = Tooltip ;
			var name = jQuery(obj).attr("name") ;
			var tipname_attr = that._get_tip_name();
			var tipobj = jQuery("*["+tipname_attr+"="+name+"]") ;
			if(tipobj) {
				jQuery(tipobj).remove();
			}
		},
		show:function(obj,selfconig,options) {
			var self = this ;
			var that = Tooltip ;
			var name = jQuery(obj).attr("name") ;
			var tipname_attr = that._get_tip_name();
			var tipobj = jQuery("*["+tipname_attr+"="+name+"]") ;
			if(tipobj) {
				jQuery(tipobj).css({"display":"block"});
			}else {
				Tooltip.create(obj,selfconig,options) ;
			}
		},
		hide:function(obj,options) {
			var self = this ;
			var that = Tooltip ;
			var name = jQuery(obj).attr("name") ;
			var tipname_attr = that._get_tip_name();
			var tipobj = jQuery("*["+tipname_attr+"="+name+"]") ;
			if(tipobj) {
				jQuery(tipobj).css({"display":"none"});
			}
		}
} ;
/**
 * 校验组件
 * @Require  Tooltip	需要tip的插件
 * 
 */
var Valid = {
	is_email:function(val){
		var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(pattern.test(val)) return true ;
		else return false;
	},
	is_number:function(val){
		var pattern = /^[0-9]{1,20}[.]?[0-9]{1,20}$/ ;
		if(pattern.test(val)) return true ;
		else return false;
	},
	is_digit:function(val){
		var pattern = /^[0-9]{1,20}$/ ;
		if(pattern.test(val)) return true ;
		else return false;
	},
	is_mobile:function(val) {
		var pattern = /^1\d{10}$/ ;
		if(pattern.test(val)) return true ;
		else return false;
	},
	is_telephone:function(val) {
		var pattern = /^0\d{2,3}-?\d{7,8}$/ ;
		if(pattern.test(val)) return true ;
		else return false;
	},
	is_http:function(val) {
		var pattern = /^https?:\/\/.+$/i ;
		if(pattern.test(val)) return true ;
		else return false;
	},
	/**
	 * @param obj form表单校验的具体对象，如input的文本框、select、area等
	 * @param valid_obj_config  针对obj对象的校验配置，具体的配置如下：
	 * {
	 * 	type:校验类型,	//如邮箱、电话、手机号、数字、url地址、用户名等
	 * 	pattern:正则表达式,	//执行的正则表达式
	 * 	error_msg:错误提示内容,	//错误提示的内容,不存在时默认“请出入正确内容”
	 * 	callback:function,//校验的函数处理,返回json格式的数据
	 * 	show_error_type:错误时页面显示的类型
	 * }
	 * @param oconfig 其他配置数据
	 * @return 返回值 true-校验成功，false-校验失败
	 */
	_valid:function(obj,valid_obj_config,oconfig) {
		var that = Valid ;
		var self = this ;
		var required = jQuery(obj).attr("required") ;
		if(required==undefined) return true; //不校验
		if(!oconfig) oconfig={};
		if(!valid_obj_config) valid_obj_config = {};
		var type = jQuery(obj).attr("type").toLowerCase() ;
		if(type=='hidden') return true ;//TODO 这里先咱不处理hidden，需要另外来处理
		//if(valid_obj_config.type) type = valid_obj_config.type ;//使用配置的类型来检测
		var type = (valid_obj_config.type) ? valid_obj_config.type : jQuery(obj).attr("type").toLowerCase() ;
		var pattern = (valid_obj_config.pattern) ? valid_obj_config.pattern : jQuery(obj).attr("pattern").toLowerCase() ;
		if(typeof pattern == 'string') pattern = eval(pattern) ;
		var value = jQuery(obj).val();
		var flag = false ;
		if(pattern) {//有正则表达式
			if(pattern.test(value)) flag = true ;
			else flag = false ;
		}else {//未有正则表达式
			if(type=="email") {
				flag = that.is_email(value) ;
			}else if(type=="number") {
				flag = that.is_number(value) ;
			}else if(type=="digit") {
				flag = that.is_digit(value) ;
			}else if(type=="mobile") {
				flag = that.is_mobile(value) ;
			}else if(type=="telephone") {
				flag = that.is_telephone(value) ;
			}else if(type=="http") {
				flag = that.is_http(value) ;
			}
			else { //不为空
				flag = true ;
			}
		}
		error_msg = jQuery(obj).attr("msg") ;
		error_msg = (error_msg) ? error_msg : valid_obj_config.error_msg;
		//扩展函数的处理
		if(flag) {
			var fn = valid_obj_config.callback ;
			var result = fn.apply(this, [obj]);
			if(result) {
				if(result.success) result = true ;
				else {
					if(result.error_msg) {
						flag = false ;
						error_msg = result.error_msg ;
					}
				}
			}
		}
		//错误显示的处理
		if((!flag)&&error_msg) {
			/*if(valid_obj_config.show_error_type) {
				var obj_config = {"text":error_msg} ;
				Tooltip.create(obj,obj_config,oconfig.tip_config) ;
			}else {
				
			}*/
			var obj_config = {"text":error_msg} ;
			Tooltip.create(obj,obj_config,oconfig.tip_config) ;
			//TODO 如果为用户自定义的样式时，需要的处理，现暂时不做处理，扩展使用
		}
		return flag;
	},
	/**
	 * 提交校验数据的正确性
	 * @param options 校验数据配置，具体的数据如下：
	 * {
	 * 	"field_config":{
	 * 		"name1":config(同_valid方法的valid_obj_config配置),
	 * 		"name2":config(同_valid方法的valid_obj_config配置),
	 * 		...
	 * 	},
	 * }
	 * @param oconfig 其他数据的配置
	 * {
	 * 	valid_oconfig:{
	 * 		tip_config:{},//tip显示的配置
	 * 	},
	 * }
	 */
	submit:function(options,oconfig) {
		var that = Valid ;
		var self = this ;
		if(!options) options={};
		jQuery("form").bind("submit",function(form){
			var fields = jQuery(".form-field") ;
			var sumit_flag = true ;
			jQuery.each(fields,function(i){
				var form_field_obj = fields[i];
				var name = jQuery(form_field_obj).attr("name") ;
				var form_field_obj_config = options.field_config[name] ;
				var field_flag = that._valid(form_field_obj,form_field_obj_config,null) ;
				if(!field_flag) {
					sumit_flag = false ;
					return false ;
				}
			});
			return sumit_flag ;
		});
		jQuery(".form-field").bind("focus",function(){
			var name = jQuery(this).attr("name") ;
			Tooltip.hide(this,null) ;
		}) ;
		jQuery(".form-field").bind("blur",function(){
			var name = jQuery(this).attr("name") ;
			var form_field_obj_config = options.field_config ? options.field_config[name] :null ;
			var field_flag = that._valid(this,form_field_obj_config,null) ;
			if(!field_flag) {
				return false ;
			}
		}) ;
	},
};
var Component = {
	_getvalue:function(mapkey,rowdata) {
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
	},
	
	Radio:{
		/**
		 * 自定义radio组件，如span的radio组件
		 * <div id="group_id" radio-target="#id">
		 * 	<span class="user-empty-radio no_select_css" value="A" >A</span>
		 * 	<span class="user-empty-radio no_select_css" value="B" >B</span>
		 * </div>
		 * options的数据结构如下：
		 * {
		 * 	group_id:"组ID",
		 * 	no_select_css:"未选中的css样式",
		 * 	selected_css:"选中的css",
		 *  target_id:"对应的实际赋值的id,包括＃号",
		 *  init_value:"初始化或者默认值，可以为空",
		 *  data:{},//多维的json格式数据
		 *  map:{//初始值与data的映射
		 *  	datacolumn1:htmlnvname1,
		 *  	datacolumn2:htmlnvname2,
  		 *		datacolumn3:htmlnvname3,
  		 *		xxx:xxx
		 *  },
		 *  callbackconfig:{
		 *  	htmlnvname1:{
		 *  		fn:callback,
		 *  	},
		 *  }
		 * }
		 **/
		_radio:function(groupobj,options){
			var self = this ;
			var class_value=".user-empty-radio" ;
			var objarrs = jQuery(groupobj).find(class_value) ;
			var targetid = options.target_id ? options.target_id : jQuery(groupobj).attr("radio-target") ;
			if(!targetid) return ;
			var targetobj = jQuery(targetid) ;//获取input的可以进行修改
			var nvname = jQuery(groupobj).attr("nvname");
			var init_func = function(map,rowdata,_targetobj) {
				jQuery.each(map,function(i){
					if(nvname==map[i]) {
						value = Component._getvalue(i,rowdata) ;
						if(!value) return false;
						jQuery(_targetobj).val(value) ;
						var currobj = jQuery(objarrs).filter("[value="+value+"]");
						jQuery(objarrs).removeClass(options.selected_css) ;
						jQuery(objarrs).addClass(options.no_select_css) ;
						jQuery(currobj).addClass(options.selected_css) ;
						jQuery(currobj).removeClass(options.no_select_css) ;
					}
				}) ;
			}
			var value_target = function (sourceobj,_targetobj) {
				var _value = jQuery(sourceobj).attr("value");
				jQuery(_targetobj).val(_value) ;
				if(options.callbackconfig) {
					jQuery.each(options.callbackconfig,function(i){
						if(nvname==i) {
							var fn = options.callbackconfig[i].callback ? options.callbackconfig[i].callback : null;
							if(!fn) return;
							var fnparams = {} ;
							fnparams.rowdata = options.rowdata;
							fnparams.currobj= sourceobj;
							fn.apply(this, [fnparams,options.defaultconfig]);
						}
					});
				}
			}
			if(options.data) {
				init_func(options.map,options.data,targetobj) ;
			}
			jQuery(objarrs).bind("click",function(event){
				//var currobj = event.currentTarget ;
				var currobj = event.target ;
				jQuery(objarrs).removeClass(options.selected_css) ;
				jQuery(objarrs).addClass(options.no_select_css) ;
				jQuery(currobj).addClass(options.selected_css) ;
				jQuery(currobj).removeClass(options.no_select_css) ;
				value_target(currobj,targetobj) ;
			}) ;
		},
		radio:function(options) {
			var self = this ;
			var groupobj = jQuery("#"+options.group_id) ;
			self._radio(groupobj,options) ;
		},
		multi_group_radio:function(options){
			var self = this ;
			var grouparrobj = jQuery(".user-group-radio") ;
			jQuery(grouparrobj).each(function(i){
				self._radio(jQuery(this),options) ;
			}) ;
		},
	},
	Tag:{
		/**
		 * 自定义radio组件，如span的radio组件
		 * <div id="group_id" radio-target="#id">
		 * 	<span class="user-empty-radio no_select_css" value="A" >A</span>
		 * 	<span class="user-empty-radio no_select_css" value="B" >B</span>
		 * </div>
		 * <div id="group_id" class="user-group-tag" nvname="name">
		 * 	<span class="user-empty-radio no_select_css" value="A" >A</span>
		 * 	<span class="user-empty-radio no_select_css" value="B" >B</span>
		 * 	<input name="name" type="hidden" value="" />
		 * </div>
		 * <div id="group_id" class="user-group-tag-onename" nvname="name">
		 * 	<span class="user-empty-radio no_select_css" value="A" >A</span>
		 * 	<span class="user-empty-radio no_select_css" value="B" >B</span>
		 * 	<input name="name" type="hidden" value="" />
		 * </div>
		 * options的数据结构如下：
		 * {
		 * 	group_id:"组ID",
		 * 	no_select_css:"未选中的css样式",
		 * 	selected_css:"选中的css",
		 *  target_id:"对应的实际赋值的id,包括＃号",
		 *  init_value:"初始化或者默认值，可以为空",
		 *  data:{},//多维的json格式数据
		 *  map:{//初始值与data的映射
		 *  	datacolumn1:htmlnvname1,
		 *  	datacolumn2:htmlnvname2,
  		 *		datacolumn3:htmlnvname3,
  		 *		xxx:xxx
		 *  },
		 *  callbackconfig:{
		 *  	htmlnvname1:{
		 *  		fn:callback,
		 *  	},
		 *  }
		 * }
		 **/
		_tag:function(groupobj,options) {
			var self = this ;
			var class_value=".user-empty-tag" ;
			var objarrs = jQuery(groupobj).find(class_value) ;
			var targetobj = jQuery(groupobj).find("input") ;
			if(!targetobj) return ;
			var nvname = jQuery(groupobj).attr("nvname");
			var init_func = function(map,rowdata,_targetobj) {//初始化
				jQuery.each(map,function(i){
					if(nvname==map[i]) {
						var value = Component._getvalue(i,rowdata) ;
						jQuery(_targetobj).val(value) ;
						var objarrs_value = jQuery(objarrs).attr("value") ;
						if(value == objarrs_value) {
							jQuery(objarrs).removeClass(options.no_selected_css) ;
							jQuery(objarrs).addClass(options.selected_css) ;
						}else {
							jQuery(objarrs).removeClass(options.selected_css) ;
							jQuery(objarrs).addClass(options.no_select_css) ;
						}
					}
				}) ;
			};
			var value_target = function (sourceobj,_targetobj) {
				var _value = jQuery(sourceobj).attr("value");
				var _noselect_value = jQuery(sourceobj).attr("default_value") ? jQuery(sourceobj).attr("default_value") : "";
				var _target_value = jQuery(_targetobj).val();
				if(_target_value==_value) {
					jQuery(_targetobj).val(_noselect_value) ;
					jQuery(sourceobj).removeClass(options.selected_css) ;
					jQuery(sourceobj).addClass(options.no_select_css) ;
				}else {
					jQuery(_targetobj).val(_value) ;
					jQuery(sourceobj).removeClass(options.no_select_css) ;
					jQuery(sourceobj).addClass(options.selected_css) ;
				}
				if(options.callbackconfig) {
					jQuery.each(options.callbackconfig,function(i){
						if(nvname==i) {
							var fn = options.callbackconfig[i].callback ? options.callbackconfig[i].callback : null;
							if(!fn) return;
							var fnparams = {} ;
							fnparams.rowdata = options.data;
							fnparams.currobj= sourceobj;
							fn.apply(this, [fnparams,options.defaultconfig]);
						}
					});
				}
			};
			if(options.data) {
				init_func(options.map,options.data,targetobj) ;
			}
			jQuery(objarrs).bind("click",function(event){
				//var currobj = event.currentTarget ;
				var currobj = event.target ;
				value_target(currobj,targetobj) ;
			}) ;
		},
		//同一个名字多个标签的处理 ,值默认以英文的逗号隔开
		_onename_multi_tag:function(groupobj,options) {
			var self = this ;
			var splitstr = ","
			var class_value=".user-empty-tag" ;
			var objarrs = jQuery(groupobj).find(class_value) ;//这里存在多个
			var targetobj = jQuery(groupobj).find("input") ;//这里只有一个
			if(!targetobj) return ;
			var nvname = jQuery(groupobj).attr("nvname");
			var init_func = function(map,rowdata,_targetobj) {//初始化  -------未做测试
				jQuery.each(map,function(i){
					if(nvname==map[i]) {
						var value = Component._getvalue(i,rowdata) ;//以逗号开始的多个值
						jQuery(_targetobj).val(value) ;
						var value_arrs = value.split(splitstr) ;
						jQuery.each(value_arrs,function(j){
							var value_tag_obj = jQuery(objarrs).filter("[value="+value_arrs[j]+"]") ;
							jQuery(value_tag_obj).removeClass(options.no_selected_css).addClass(options.selected_css) ;
						}) ;
					}
				}) ;
			};
			var value_target = function (sourceobj,_targetobj) {
				var _value = jQuery(sourceobj).attr("value"); 
				var _noselect_value = jQuery(sourceobj).attr("default_value") ? jQuery(sourceobj).attr("default_value") : "";
				var _target_value = jQuery(_targetobj).val();
				var tmpvalue = "" ;
				if(jQuery(sourceobj).hasClass(options.no_select_css)) {//开始未选中，则进行选中的处理
					jQuery(sourceobj).removeClass(options.no_select_css).addClass(options.selected_css) ;
					jQuery(_targetobj).val(_value) ;
					tmpvalue = _value ;
				}else {
					jQuery(sourceobj).removeClass(options.selected_css).addClass(options.no_select_css) ;
					jQuery(_targetobj).val("") ;
				}
				var selectobjs = jQuery(sourceobj).siblings().filter("."+options.selected_css) ;
				jQuery.each(selectobjs,function(i){
					tmpvalue = tmpvalue + splitstr + jQuery(selectobjs[i]).attr("value");
				}) ;
				var resetvalue = tmpvalue.replace(/^,(\w+)/g,"$1") ;
				jQuery(_targetobj).val(resetvalue) ;
				if(options.callbackconfig) {
					jQuery.each(options.callbackconfig,function(i){
						if(nvname==i) {
							var fn = options.callbackconfig[i].callback ? options.callbackconfig[i].callback : null;
							if(!fn) return;
							var fnparams = {} ;
							fnparams.rowdata = options.data;
							fnparams.currobj= sourceobj;
							fn.apply(this, [fnparams,options.defaultconfig]);
						}
					});
				}
			};
			if(options.data) {
				init_func(options.map,options.data,targetobj) ;
			}
			jQuery(objarrs).bind("click",function(event){
				//var currobj = event.currentTarget ;
				var currobj = event.target ;
				value_target(currobj,targetobj) ;
			}) ;
		},
		tag:function(options) {
			var self = this ;
			var groupobj = jQuery("#"+options.group_id) ;
			self._radio(groupobj,options) ;
		},
		multi_group_tag:function(options) {
			var self = this ;
			var grouparrobj = jQuery(".user-group-tag") ;
			jQuery(grouparrobj).each(function(i){
				self._tag(jQuery(this),options) ;
			}) ;
		},
		multi_group_tag_onename:function(options) {
			var self = this ;
			var grouparrobj = jQuery(".user-group-tag-onename") ;
			jQuery(grouparrobj).each(function(i){
				self._onename_multi_tag(grouparrobj[i],options) ;
			}) ;
		}
	},
	Checkbox:{
		
	},
	Toggle:{
		
	},
	Image:{
	 adapt_img:function(imgObj,imgconfig) {
		 	var self = this;
			var image = new Image() ;
			image.src = jQuery(imgObj).attr("src") ;
			 //alert(jQuery(imgObj).outerWidth()) ;
			//alert(imgObj.clientWidth) ;
			//return ;
			//console.log(image.src) ;
			image.onload = function() {
				//var maxWidth= imgconfig.max_width ;
				//var maxHeight = imgconfig.max_height ;
				var maxWidth= 500 ;
				var maxHeight = 90 ;
				if(imgconfig){
					maxWidth = imgconfig.max_width ? imgconfig.max_width : maxWidth ;
					maxHeight = imgconfig.max_height ? imgconfig.max_height : maxHeight ;
				}
				var width = this.width ;
				var height = this.height ;
				console.log("default width:"+width+",height:"+height) ;
				var scale = 1.000000 ;
				/**if(this.width<maxWidth&&this.height<maxHeight) {
					width = this.width ;
					height = this.height ;
					console.log("no setted width:"+width+",height:"+height) ;
				}else if(this.height>maxHeight&&this.height>this.width){
					width = this.width * maxHeight*scale/this.height ;
					height = maxHeight ;
					console.log("setted width. width:"+width+",height:"+height) ;
				}else if(this.width>maxWidth&&this.width>this.height) {
					width = maxWidth ;
					height = this.height * maxWidth*scale/this.width ;
					console.log("setted height. width:"+width+",height:"+height) ;
				}else if(this.width>maxWidth&&this.width==this.height){
					width = maxWidth ;
					height = maxHeight ;
				}
				*/
				var w_h_scale = this.width*scale/this.height;
				var max_w_h_scale = maxWidth*scale/maxHeight;
				var this_scale = parseInt(w_h_scale*1000000) ;
				var max_scale = parseInt(max_w_h_scale*1000000) ;
				if(this.width<maxWidth&&this.height<maxHeight) {
					width = this.width ;
					height = this.height ;
					console.log("no setted width:"+width+",height:"+height) ;
				}else {
					if(this_scale>=max_scale) {//图片的实际宽高比例大于屏幕的宽高比例
						width = maxWidth  ;
						height = this.height *maxWidth * scale/this.width;
					} else {//图片的实际宽高比例小于屏幕的宽高比例
						width = this.width * maxHeight * scale / this.height;
						height = maxHeight;
					}
				}
				
				var left = 0 ;
				var top = 0 ;
				if(width<maxWidth) left = (maxWidth-width)/2 ;
				if(height<maxHeight) top = (maxHeight-height)/2 ;
				jQuery(imgObj).css({"width":width+"px","height":height+"px"}) ;
				if(imgconfig.position==''){
					jQuery(imgObj).css({"left":left,"top":top}) ;
				}else {
					jQuery(imgObj).css({"margin-left":left,"margin-top":top}) ;
				}
				console.log("setted width:"+width+",height:"+height) ;
		    }
			image = null;
		},
		_check:function(file_img_obj,options) {
			var self = this ;
			var filepath=jQuery(file_img_obj).val();
			var extStart=filepath.lastIndexOf(".");
		    var ext=filepath.substring(extStart,filepath.length).toUpperCase();
		    if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
		     //alert("图片限于bmp,png,gif,jpeg,jpg格式");
		     return 11;
		    }
		    var MAX_SIZE = 2*1024*1024 ;
			var img=new Image();
			img.src=filepath;
			var size = img.fileSize || file_img_obj.files[0].fileSize || file_img_obj.files[0].size;  
			if(size>MAX_SIZE) {
				//alert("图片不能大于2M.") ;
				return 12 ;
			}
			return 1 ;//成功
		},
		/**
		 * 图片上传
		 * @param options	图片上传的参数
		 * {
		 * 	dev_mode:"模式，如开发模式", 0-
		 * 	check_error:function,	//上传的图片校验问题，自定义的不用参数，可以在函数内获取参数，第一个参数为校验的int结果，第二个参数为options。
		 * 	ajax_config:{	//ajax的配置，参数同jquery的ajax的配置。
		 * 		url:"上传的图片的地址",
		 * 	},
		 * }
		 */
		upload_ajax:function(options) {
			var self = this ;
			var file_img_obj = null ;
			var check_result = self._check(file_img_obj,options) ;
			if(!check_result) {//校验不满足时处理结果
				var func_check_error = options.check_error ? options.check_error : null ;
				if(!func_check_error) return ;
				func_check_error.apply(this,check_result,options) ;
				return ;
			}
			var check_ajax_config_func = function(ajaxconfig) {	//ajax上传文件的配置
				if(!ajaxconfig) {
					alert("ajax config is not null.") ;
					return false;
				};
				if(!ajaxconfig.url) {
					alert("ajax url is required.") ;
					return false;
				}
				if(!ajaxconfig.type) ajaxconfig.type="post" ;//默认为post
				return true ;
			};
			if(check_ajax_config_func(ajax_config)) {
				jQuery.ajaxSubmit(ajax_config) ;
			}
		}
	},
	File:{},
	Date:{
		format:function(date,pattern) {
			if(date==null) date = new Date();
			var self = this ;
			var o = {   
				    "M+" : date.getMonth()+1,                 //月份   
				    "d+" : date.getDate(),                    //日   
				    "H+" : date.getHours(),                   //小时   
				    "m+" : date.getMinutes(),                 //分   
				    "s+" : date.getSeconds(),                 //秒   
				    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
				    "S"  : date.getMilliseconds()             //毫秒   
			};
			if(/(y+)/.test(pattern))   
				pattern=pattern.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
			for(var k in o) {
				if(new RegExp("("+ k +")").test(pattern))   
			    	pattern = pattern.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
			}
			return pattern; 
		},
		parse:function(datastr,pattern) {
			if(!datastr) return null ;
			var self = this ;
			var year = 0;
			var month = 0;
			var hours = 0;
			var minutes = 0;
			var seconds = 0 ;
			var millseconds = 0;
			//var size = Math.min(datastr.length, pattern.length);
			var regx = {  
				    yy:"(\\d{2})", // 2位数字  
				    yyyy:"(\\d{4})", // 4位数字
				    MM:"(0[1-9]|1[012])",// 01到12  
				    dd:"(0[1-9]|[12][0-9]|3[01])", // 01到31
				    HH:"(0[1-9]|1[0-9]|2[0-3])",//时
				    mm:"(0[0-9]|[1-5][0-9])",//分
				    ss:"(0[0-9]|[1-5][0-9])",//秒
				    //....  
			}; 
			for(var k in regx) {
				var index = pattern.indexOf(k) ;
				if(index==-1) continue;
				var length = k.length;
				var value = datastr.substr(index,length) ;
				regx[k] = parseInt(value) ;
			}
			return new Date(regx.yyyy,regx.MM,regx.dd,regx.HH,regx.mm,regx.ss) ;
		},
		compare:function(date1,date2) {
			var self = this ;
			if((!date1)&&date2) return 2 ;
			if((!date2)&&date1) return 1 ;
			if((!date1)&&(!date2)) return 0;
			var time1 = date1.getTime();
			var time2 = date2.getTime();
			if(time1>time2) return 1 ;
			if(time1<time2) return 2;
			if(time1==time2) return 0 ;
		}
	},
};
/**
 * 
 <input type="text" id="inp" value="梦龙小站" />
 */
/**
window.onload = function(){
	  var oInp = document.getElementById("inp");

	  function getClipboardText(event){
	    var clipboardData = event.clipboardData || window.clipboardData;
	    return clipboardData.getData("text");
	  };

	  oInp.addEventListener('paste',function(event){
	    var event = event || window.event;
	    var text = getClipboardText(event);

	    if(!/^\d+$/.test(text)){
	      event.preventDefault();
	    }
	  }, false);	
	}
*/