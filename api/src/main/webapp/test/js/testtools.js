function setdata() {
	var obj = jQuery("#ss") ;
	var map={
			"text1":"text1",
			"text2":"text2",
			"vradio":"vradio",
			"vcheckbox":"vcheckbox",
			"vspan":"vspan",
			"vselect":"vselect"
	};
	var data = {
			"text1":"value1",
			"text2":"value2",
			"vradio":"2",
			"vcheckbox":"2",
			"vspan":"vspanvalue",
			"vselect":"4"
	};
	row_data(obj,map,data) ;
}
function callback_function(x,y){
	alert("callback test."+(x+y)) ;
}
function set_template_data() {
	var config = {
		map:{
			"text1":"text1",
			"text2":"text2",
			"vradio":"vradio",
			"vcheckbox":"vcheckbox",
			"vspan":"vspan",
			"pselect.vselect.vselect":"vselect"
		},
		html:{
			row_template_id:"template"
		},
		callbackconfig:{
			"text1":{
				//callback:function(){alert("callback test.");}
				callback:callback_function,
				callparams:[1,89]
			}
		}
	} ;
	var data = {
		"rowset":[
		        {
		        	"text1":"value1",
					"text2":"value2",
					"vradio":"2",
					"vcheckbox":"2",
					"vspan":"vspanvalue",
					"vselect1":"4",
					"pselect":{
						"vselect":"3",
					},
		        	"pselect":{
		        		"vselect":{
		        			"vselect":"3"
		        		},
		        	}
		        },
		        {
		        	"text1":"value1",
					"text2":"value2",
					"vradio":"2",
					"vcheckbox":"1",
					"vspan":"vspanvalue",
					"vselect1":"4",
					"pselect":{
						"vselect":"5",
					}
		        }
		]	
	} ;
	//list_data(data,config) ;
	//Pager.list_data(data,config);
	Pager.pager({
		crossDomain: true,
		dataType:"json",
		type:"get",
		url:"http://127.0.0.1:90/opensns260/index.php?s=/mobile/event/elist.html&mindata=1",
		//url:"http://127.0.0.1:90/test/tools3.json",
		success:function(resdata) {
			alert(resdata) ;
			eval(resdata);
			alert(eval(resdata)) ;
		},
		error:function(data) {
			alert("error : "+data) ;
			Pager.data = data ;
			Pager.list_data(data,config) ;
		},
	},config) ;
}

jQuery(document).ready(function(){
	setdata() ;
	set_template_data() ;
}) ;