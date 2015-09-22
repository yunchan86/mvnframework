package com.example.test;

import static org.junit.Assert.assertEquals;

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
	}

	@Test
	public void obj2xml() {
		assertEquals(8,8) ;
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toStr(userInfo, config) ;
		System.out.println(result);
	}
	@Test
	public void obj2json() {
		String result = FacBaseData.getInstance(FacBaseData.CLASS_TYPE_XSTREAM_XML).toStr(userInfo, config) ;
		System.out.println(result);
	}
	
	@After
	public void after() {
		System.out.println("after testing.");
	}
	
}
