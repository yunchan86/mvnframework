package jvm;
/**
 * 设置线程栈，根据xmx xms的大小不同，xss的线程溢出的大小不同
 * @author chy
 * -Xss1M
 */
public class TestXss {

	public static class MyThread extends Thread {
		public void run(){
			try {
				Thread.sleep(10000);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		}
	}
	public static void main(String args[]) {
		int i=0 ;
		try {
			for(i=0;i<10000;i++) {
				new MyThread().start();
			}
		} catch (Exception e) {
			System.out.println("count thread is "+i);
		}
	}
}
