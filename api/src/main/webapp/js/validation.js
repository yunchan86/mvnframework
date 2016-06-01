/**
 * Dependent on jQuery
 * @Author Frain 上善若水
 * @copyright 2015-2017
 * @see 校验的编写
 */
var Validation={
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
		 * 数据校验
		 * @param options
		 */
		valid:function(options) {
			jQuery()
		}
		
}
