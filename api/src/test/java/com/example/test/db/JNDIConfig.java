package com.example.test.db;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.dbcp.BasicDataSource;


public class JNDIConfig {

	private final static String YACOL_DB_URL = "jdbc:mysql://127.0.0.1:3306/test" ;
	//private final static String YACOL_DB_URL = "jdbc:mysql://192.168.1.12:3306/test?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull" ;
	private final static String MYSQL_JDBC_DRIVER = "com.mysql.jdbc.Driver" ;
	private final static int MYSQL_MAX_ACTIVE = 50 ;
	private final static int MYSQL_MAX_IDLE = 20 ;
	private final static int MYSQL_MAX_WAIT = 10000 ;
	private final static String YACOL_USER = "root" ;
	private final static String YACOL_PWD = "" ;
	public static void setDB() {
		InitialContext ctx = null;
		BasicDataSource source=null;
		try {
			System.out.println("test datasource.");
			System.setProperty(Context.INITIAL_CONTEXT_FACTORY,
					"org.apache.naming.java.javaURLContextFactory");
			System.setProperty(Context.URL_PKG_PREFIXES, "org.apache.naming");
			source = new BasicDataSource();
			//source = new MysqlConnectionPoolDataSource();
	        source.setDriverClassName(MYSQL_JDBC_DRIVER);
	        source.setUrl(YACOL_DB_URL);
	        source.setUsername(YACOL_USER);
	        source.setPassword(YACOL_PWD); 
	        source.setMaxActive(MYSQL_MAX_ACTIVE); 
	        source.setMaxIdle(MYSQL_MAX_IDLE);
	        source.setMaxWait(MYSQL_MAX_WAIT);
	        ctx = new InitialContext() ;
			ctx.createSubcontext("java:");
			ctx.createSubcontext("java:comp");
			ctx.createSubcontext("java:comp/env");
			ctx.createSubcontext("java:comp/env/test");
/*			Properties props=new Properties();
			props.put(Context.INITIAL_CONTEXT_FACTORY,"org.apache.naming.java.javaURLContextFactory"); 
						" org.apache.naming.java.javaURLContextFactory
			props.put(Context.PROVIDER_URL,"localhost:8080"); 
			props.put(Context.URL_PKG_PREFIXES, "org.apache.naming") ;*/
	        //ctx = new InitialContext();System.out.println(112);
			//System.out.println("this database is "+source);
			ctx.bind("java:comp/env/test/mysql", source);
			System.out.println("this database is "+source);
		} catch (Exception e) {
			System.out.println("test datasource error is:");
			System.err.println(e);
		}
	}
}
