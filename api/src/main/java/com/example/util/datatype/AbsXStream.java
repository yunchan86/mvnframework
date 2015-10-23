package com.example.util.datatype;

import java.util.List;
import java.util.Map;

import com.thoughtworks.xstream.XStream;

public abstract class AbsXStream extends AbsBaseData {

	/**
	 * 初始化XStream的配置
	 * @param config
	 * @param xs
	 */
	protected void initConfig(XStream xs,BaseDataConfig config) {
		if(xs==null) return ;
		beforeConfig(xs) ;
		if(this.configIsNull(config)) return ;
		this.configAliasClass(xs,config) ;
		this.configAliasField(xs, config);
		configOmitField(xs,config) ;
	}
	/**
	 * 类及类别名的配置
	 * @param xs
	 * @param config
	 */
	@SuppressWarnings("rawtypes")
	private void configAliasClass(XStream xs,BaseDataConfig config) {
		if(this.configAliasClassIsEmpty(config)) return ;
		Map<String,Class> map = config.getAliasClass() ;
		for(String key : map.keySet()) {
			xs.alias(key, map.get(key));
		}
	}
	/**
	 * 类属性及属性别名的配置
	 * @param xs
	 * @param config
	 */
	@SuppressWarnings("rawtypes")
	private void configAliasField(XStream xs,BaseDataConfig config) {
		if(this.configAliasFieldIsEmpty(config)) return ;
		Map<Class,Map<String,String>> map = config.getAliasField() ;
		for(Class clazz : map.keySet()) {
			Map<String,String> fieldMap = map.get(clazz) ;
			if(fieldMap==null||fieldMap.size()==0) continue ;
			for(String field : fieldMap.keySet()) {
				xs.aliasField(field, clazz, fieldMap.get(field)) ;
			}
		}
	}
	
	private void configOmitField(XStream xs,BaseDataConfig config) {
		if(this.configOmitFieldIsEmpty(config)) return ;
		Map<Class,List<String>> omitMap = config.getOmitField() ;
		for(Class clazz : omitMap.keySet()) {
			List<String> fieldlist = omitMap.get(clazz) ;
			if(fieldlist==null||fieldlist.size()==0) continue ;
			for(String field : fieldlist) {
				xs.omitField(clazz, field);
			}
		}
	}
	private void beforeConfig(XStream xs) {
		xs.aliasSystemAttribute(null, "class");
	}

}
