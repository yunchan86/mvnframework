package com.example.test;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.example.mybatis.bean.UserInfoBean;
import com.example.mybatis.service.UserInfoService;
import com.example.test.db.JNDIConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
public class TestUserInfoService {
	@Resource
	ApplicationContext ctx ;
	
	private UserInfoService uiService = null ;
	
	@BeforeClass
	public static void setUpClass() throws Exception {
		JNDIConfig.setDB();
    }
	@Before
	public void before() {
		uiService = (UserInfoService)ctx.getBean("userInfoService");
	}
	@Test
	public void get() {
		uiService.get(1l) ;
		String result = "" ;
		boolean b = true ;
		Assert.assertTrue(result, b);
	}
	@Test
	public void add() {
		UserInfoBean ui = new UserInfoBean(3l,"test1",18,"test1@example.com") ;
		UserInfoBean ui2 = new UserInfoBean(4l,"test1",18,"test1@example.com") ;
		List<UserInfoBean> list = new ArrayList<UserInfoBean>() ;
		list.add(ui) ;
		list.add(ui2) ;
		uiService.add(list) ;
	}
	
	@After
	public void after() {
		System.out.println("excute finished.");
	}
}
