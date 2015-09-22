package com.example.util.datatype;

public class FacBaseData {

	/**
	 * xstream的xml的处理
	 */
	public final static int CLASS_TYPE_XSTREAM_XML = 10 ;
	/**
	 * xstream的json数据处理
	 */
	public final static int CLASS_TYPE_XSTREAM_JSON = 20 ;
	/**
	 * org.json的json数据处理
	 */
	public final static int CLASS_TYPE_ORG_JSON = 21 ;
	
	public static IBaseData getInstance(int type) {
		IBaseData basedata = null ;
		if(type==CLASS_TYPE_XSTREAM_XML) basedata = new XStreamXMLData() ;
		else if(type==CLASS_TYPE_XSTREAM_JSON) basedata = new XStreamJSONData() ;
		else if(type==CLASS_TYPE_ORG_JSON) basedata = null ;
		return basedata ;
	}
}
