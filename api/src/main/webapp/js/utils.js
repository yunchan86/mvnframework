var Utils = (function(i){
	alert(12345);
	this.t = i ;
	this.init = function(){
		alert("init function."+this.t) ;
	}
});

//Utils(89).init();
var Pager = {
		option:{
			ts:"time"
		},
		init : function(){
			var self = this ;
			alert("init pager.");
			this.x = 0 ;
			this.y = 0 ;
			var testt = function() {
				alert(3333) ;
			}
			function test() {
				x = 12;
				y = 13 ;
				testt();
			}
			test();
			alert(this.x+this.y+self.option.ts);
		}
} ;
Pager.option.ts="this is a time."
Pager.init() ;

