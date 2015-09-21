package com.example.util.datatype;

/**
 * 基本的数据类型接口
 * @author chy
 *
 */
public interface IBaseData {

	/**
	 * 将对象转换为字符串的格式，如xml／json等
	 * @param obj
	 * @param config
	 * @return
	 */
	public String toStr(Object obj,BaseDataConfig config) ;
	/**
	 * 将指定的字符串转换为指定的Object对象，如xml／json字符串转换为java的数据对象
	 * @param str
	 * @param config
	 * @return
	 */
	public Object toOb(String str,BaseDataConfig config) ;
}
