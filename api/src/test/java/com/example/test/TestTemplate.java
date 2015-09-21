package com.example.test;

import javax.annotation.Resource;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.example.test.db.JNDIConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
public class TestTemplate {

	@Resource
	ApplicationContext ctx ;
	
	@BeforeClass
	public static void setUpClass() throws Exception {
		JNDIConfig.setDB();
    }
	@Before
	public void before() {
		
	}
	@Test
	public void test() {
		
	}
	@After
	public void after() {
		
	}
}
