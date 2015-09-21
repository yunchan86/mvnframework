package com.example.util.datatype;

import com.thoughtworks.xstream.XStream;

public class XStreamXMLData extends AbsXStream {

	@Override
	public String toStr(Object obj, BaseDataConfig config) {
		XStream xs = this.getXstream();
		this.initConfig(xs, config);
		xs.setMode(XStream.NO_REFERENCES);
		return xs.toXML(obj);
	}

	@Override
	public Object toOb(String str, BaseDataConfig config) {
		XStream xs = this.getXstream();
		this.initConfig(xs, config);
		xs.setMode(XStream.NO_REFERENCES);
		return xs.fromXML(str);
	}
	
	private XStream getXstream() {
		XStream xs = new XStream();
		return xs ;
	}

}
