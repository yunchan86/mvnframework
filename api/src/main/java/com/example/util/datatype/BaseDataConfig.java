package com.example.util.datatype;

import java.util.List;
import java.util.Map;

public class BaseDataConfig {

	/**
	 * Object class alias
	 */
	
	@SuppressWarnings("rawtypes")
	private Map<String,Class> aliasClass ;
	
	/**
	 * 需要说明的是Map<String,String>,第一个String为FieldName，第二个String为aliasName
	 */
	@SuppressWarnings("rawtypes")
	private Map<Class,Map<String,String>> aliasField ;
	
	//private Map<String,Class> omitClass ;
	
	private Map<Class,List<String>> omitField ;

	@SuppressWarnings({ "rawtypes"})
	public Map<String, Class> getAliasClass() {
		return aliasClass;
	}

	@SuppressWarnings("rawtypes")
	public void setAliasClass(Map<String, Class> aliasClass) {
		this.aliasClass = aliasClass;
	}

	public Map<Class, Map<String, String>> getAliasField() {
		return aliasField;
	}

	public void setAliasField(Map<Class, Map<String, String>> aliasField) {
		this.aliasField = aliasField;
	}

	public Map<Class, List<String>> getOmitField() {
		return omitField;
	}

	public void setOmitField(Map<Class, List<String>> omitField) {
		this.omitField = omitField;
	}
	
}
