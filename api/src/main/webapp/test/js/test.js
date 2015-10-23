function test1(){
	//var obj = jQuery("span [name='xxx']") ;
	var obj = jQuery("span").find("[name='xxx']") ;
	jQuery.each(obj,function(i){
		console.log(jQuery(obj[i]).html());
		alert(jQuery(obj[i]).html()) ;
	});
}
function jsontest1() {
	var data = {
		rowset:[{
			name:"name1",
			username:"username1"
		},{}],
		num:1
	} ;
	jQuery.each(data.rowset,function(i){
		var item = data.rowset[i] ;
		jQuery.each(item,function(k){
			alert(k + "\n" + item[k]) ;
		}) ;
	});
}
function spp(x,y) {
	if(!x)x=2;
	if(!y)y=4;
	alert(x+y) ;
	return x+y ;
}
function applyf(callback,callparams) {
	//alert(function(){callback(1,3);}) ;
	alert("hello.") ;
	//alert(callback(x,y)) ;
	callback.apply(this,callparams) ;
}
function Cls(){
	this.username="test" ;
	this.setname=function(uname){this.username=uname} ;
}
jQuery(document).ready(function(){
	//test1() ;
	//jsontest1() ;
	//applyf(spp) ;
	alert(Cls.username) ;
	var c = new Cls() ;
	c.setname("teset name") ;
	alert(c.username) ;
}) ;