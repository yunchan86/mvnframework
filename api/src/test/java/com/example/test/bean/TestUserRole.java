package com.example.test.bean;

public class TestUserRole {

	private int roleId ;
	private String rolename ;
	
	public TestUserRole(){}
	public TestUserRole(int roleId,String rolename) {
		this.roleId = roleId ;
		this.rolename = rolename ;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	
	
}
