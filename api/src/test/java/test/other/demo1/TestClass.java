package test.other.demo1;

public class TestClass {

	public void test() {
		System.out.println("TestClass testing.") ;
	}
	
	class TestSubA {
		public void test() {
			System.out.println("TestSubA testing.");
		}
/*		有问题不能执行
		public static void testStatic() {
			 System.out.println("TestSubA static method testing.");
		 }*/
	}
	public  static class TestSubStaticA {
		 public void test() {
			 System.out.println("TestSubStaticA testing.");
		 }
		 public static void testStatic() {
			 System.out.println("TestSubStaticA static method testing.");
		 }
	 }
	public static void main(String[] args) {
		TestClass tt = new TestClass() ;
		tt.test();
		TestClass.TestSubA tta = tt.new  TestSubA() ;
		tta.test();
		TestClass.TestSubStaticA.testStatic();
	}
}
