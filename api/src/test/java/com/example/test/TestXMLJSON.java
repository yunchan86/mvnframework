package com.example.test;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.example.test.bean.TestUserInfo;
import com.example.test.bean.TestUserRole;
import com.example.util.datatype.BaseDataConfig;
import com.example.util.datatype.FacBaseData;


public class TestXMLJSON {
	
	TestUserInfo userInfo = null ;
	BaseDataConfig config = null ;
	List<TestUserInfo> list = null ;
	
	@Before
	public void setup() {
		System.out.println("before testing.");
		userInfo = new TestUserInfo() ;
		TestUserRole role = new TestUserRole(1,"超级管理员") ;
		userInfo.setAddress("Beijing");
		userInfo.setAge(10);
		userInfo.setRole(role);
		userInfo.setTruename("CHY");
		userInfo.setUsername("chy");
		list = new ArrayList<TestUserInfo>() ;
		list.add(userInfo) ;
		list.add(userInfo) ;
		
		config = new BaseDataConfig() ;
		Map<String,Class> aliasClass = new HashMap<String,Class>() ;
		aliasClass.put("userinfo", TestUserInfo.class) ;
		//aliasClass.put("data", List.class) ;
		config.setAliasClass(aliasClass);
		Map<Class,List<String>> omitField  = new HashMap<Class,List<String>>();
		List tfieldlist = new ArrayList<String>() ;
		tfieldlist.add("truename") ;
		omitField.put(TestUserInfo.class, tfieldlist) ;
		List subfieldlist = new ArrayList<String>() ;
		subfieldlist.add("roleId") ;
		omitField.put(TestUserRole.class, subfieldlist) ;
		config.setOmitField(omitField);
	}

	@Test
	public void obj2xml() {
		assertEquals(8,8) ;
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toStr(userInfo, config) ;
		System.out.println(result);
	}
	@Test
	public void obj2xmllist() {
		assertEquals(8,8) ;
		List listx = list ;
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toStr(listx, config) ;
		System.out.println(result);
	}
	@Test
	public void obj2json() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_JSON).toStr(userInfo, config) ;
		System.out.println("this result is : "+result);
	}
	@Test
	public void obj2jsonlist() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_JSON).toStr(list, config) ;
		System.out.println("this result is : "+result);
	}
	@Test
	public void xml2obj() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toStr(userInfo, config) ;
		TestUserInfo userinfo = (TestUserInfo)FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toOb(result, config) ;
		System.out.println("xml to object :\n"+userinfo);
	}
	@Test
	public void xmllist2list() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toStr(list, config) ;
		List<TestUserInfo> ll = (List<TestUserInfo>)FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toOb(result, config) ;
		System.out.println("list str to xml list"+ll);
	}
	@Test
	public void json2obj() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_JSON).toStr(userInfo, config) ;
		TestUserInfo userinfo = (TestUserInfo)FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_JSON).toOb(result, config) ;
		System.out.println("json to object :\n"+userinfo);
	}
	@Test
	public void json2list() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_JSON).toStr(list, config) ;
		List ll = (List) (FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_JSON).toOb(result, config)) ;
		System.out.println("list str to json list"+ll);
	}
	
	@After
	public void after() {
		System.out.println("after testing.");
	}
	
}
