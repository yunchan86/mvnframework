package jvm.perform_book;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class HoldIOMain {

	public static class HoldIOTask implements Runnable {
		@Override
		public void run() {
			while(true) {
				try {
					FileOutputStream fos = new FileOutputStream(new File("teme")) ;
					for(int i=0;i<10000;i++)
						fos.write(i);
					fos.close();
					FileInputStream fis = new FileInputStream(new File("teme")) ;
					while(fis.read()!=-1) ;
					fis.close();
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch(IOException e) {
					e.printStackTrace();
				}
			}

		}
	}
	
	public static class LazyTask implements Runnable {

		@Override
		public void run() {
			try {
				while(true) {
					Thread.sleep(1000);
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		
	}
	

	public static void main(String[] args) {
		new Thread(new HoldIOTask()).start();
		new Thread(new LazyTask()).start();
		new Thread(new LazyTask()).start();
		new Thread(new LazyTask()).start();

	}

}
