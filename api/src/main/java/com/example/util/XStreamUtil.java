package com.example.util;

import java.io.Writer;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;

/**
 * @author Rayan
 */
public class XStreamUtil {
	// private static final XStream xmlStream = new XStream();
	// private static final XStream jsonStream = new XStream(new
	// JettisonMappedXmlDriver() {
	// @Override
	// public HierarchicalStreamWriter createWriter(Writer writer) {
	// return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
	// }
	//
	// });
	// private static final XStream jsonStreamWithRoot = new XStream(new
	// JettisonMappedXmlDriver());

	public static XStream getXStream() {
		// return xmlStream;
		XStream xs = new XStream();
		xs.setMode(XStream.NO_REFERENCES);
		return xs;
	}

	public static XStream getXStreamJson() {
		// return jsonStream;
		XStream xs = new XStream(new JettisonMappedXmlDriver() {
			@Override
			public HierarchicalStreamWriter createWriter(Writer writer) {
				return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
			}

		});
		xs.setMode(XStream.NO_REFERENCES);
		return xs;
	}

	public static XStream getXStreamJsonWithRoot() {
		// return jsonStreamWithRoot;
		XStream xs = new XStream(new JettisonMappedXmlDriver());
		xs.setMode(XStream.NO_REFERENCES);
		return xs;
	}

	public static XStream getXStream(String type) {
		XStream xs = null;
		if ("xml".equals(type))
			// return xmlStream;
			xs = new XStream();
		else
			// return jsonStream;
			xs = new XStream(new JettisonMappedXmlDriver() {
				@Override
				public HierarchicalStreamWriter createWriter(Writer writer) {
					return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
				}

			});

		xs.setMode(XStream.NO_REFERENCES);
		return xs;

	}
	
	
}
