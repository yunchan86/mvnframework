package jvm;

import org.junit.Test;
/**
 * java虚拟机栈
 * @author chy
 * -Xss1M
 */
public class TestStack {
	private int count = 0;
	public void recursion() {
		count++;
		recursion();
	}
	@Test
	public void testStack() {
		try {
			recursion() ;
		} catch (Exception e) {
			System.out.println("deep of stack is "+count);
			e.printStackTrace();
		}
	}
}
