package com.example.mybatis.bean;

public class UserInfoBean {

	private Long userId ;
	private String username ;
	private Integer age ;
	private String email ;
	public UserInfoBean(){}
	public UserInfoBean(Long userId,String username,Integer age,String email) {
		this.userId = userId ;
		this.username = username ;
		this.age = age ;
		this.email = email ;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String toString() {
		return "userId:"+this.userId+"\n"
				+"username:"+this.username+"\n"
				+"age:"+this.age+"\n"
				+"email:"+this.email+"\n";
	}
	
}
