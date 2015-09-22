package com.example.util.datatype;

import java.io.Writer;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;

public class XStreamJSONData extends AbsXStream {

	@Override
	public String toStr(Object obj, BaseDataConfig config) {
		XStream xs = this.getXstream() ;
		this.initConfig(xs, config);
		return xs.toXML(obj);
	}

	@Override
	public Object toOb(String str, BaseDataConfig config) {
		XStream xs = this.getXstream() ;
		this.initConfig(xs, config);
		return xs.fromXML(str);
	}
	
	private XStream getXstream() {
		XStream xs = new XStream(new JettisonMappedXmlDriver() {
			@Override
			public HierarchicalStreamWriter createWriter(Writer writer) {
				//return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
				return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
			}

		});
		xs.setMode(XStream.NO_REFERENCES);
		return xs;
	}

}
