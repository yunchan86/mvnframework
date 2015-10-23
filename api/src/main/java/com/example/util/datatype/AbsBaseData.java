package com.example.util.datatype;
/**
 * 基本数据处理的抽象类
 * @author chy
 *
 */
public abstract class AbsBaseData implements IBaseData {

	/**
	 * 类别名配置是否为空
	 * @param config
	 * @return true-为空或不存在，false表示不为空即size>0
	 */
	protected boolean configAliasClassIsEmpty(BaseDataConfig config) {
		return (config==null||config.getAliasClass()==null
				||config.getAliasClass().size()==0
				) ? true : false ;
	}
	/**
	 * 判断config对象是否为空
	 * @param config
	 * @return
	 */
	protected boolean configIsNull(BaseDataConfig config) {
		return config==null ? true : false ;
	}
	/**
	 * 判断class的属性别名配置
	 * @param config
	 * @return
	 */
	protected boolean configAliasFieldIsEmpty(BaseDataConfig config) {
		return (config==null||config.getAliasField()==null
				||config.getAliasField().size()==0
				) ? true : false;
	}
	/**
	 * 判断显示的属性是否为空
	 * @param config
	 * @return
	 */
	protected boolean configOmitFieldIsEmpty(BaseDataConfig config) {
		return (config==null||config.getOmitField()==null
				||config.getOmitField().size()==0
				) ? true : false;
	}
}
