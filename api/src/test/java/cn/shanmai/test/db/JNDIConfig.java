package cn.shanmai.test.db;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.dbcp.BasicDataSource;


public class JNDIConfig {

	private final static String YACOL_DB_URL = "jdbc:mysql://10.0.0.89:3306/yacol?useUnicode=true&characterEncoding=gbk&zeroDateTimeBehavior=convertToNull" ;
	private final static String MYSQL_JDBC_DRIVER = "com.mysql.jdbc.Driver" ;
	private final static int MYSQL_MAX_ACTIVE = 50 ;
	private final static int MYSQL_MAX_IDLE = 20 ;
	private final static int MYSQL_MAX_WAIT = 10000 ;
	private final static String YACOL_USER = "yacoltest" ;
	private final static String YACOL_PWD = "yacol.!2#" ;
	public static void setYacolDB() {
		InitialContext ctx = null;
		BasicDataSource source=null;
		try {
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
			ctx.createSubcontext("java:comp/env/jdbc");
/*			Properties props=new Properties();
			props.put(Context.INITIAL_CONTEXT_FACTORY,"org.apache.naming.java.javaURLContextFactory"); 
						" org.apache.naming.java.javaURLContextFactory
			props.put(Context.PROVIDER_URL,"localhost:8080"); 
			props.put(Context.URL_PKG_PREFIXES, "org.apache.naming") ;*/
	        ctx = new InitialContext();
			ctx.bind("java:comp/env/jdbc/mysql", source);
		} catch (Exception e) {
			System.err.println(e);
		}
	}
}
