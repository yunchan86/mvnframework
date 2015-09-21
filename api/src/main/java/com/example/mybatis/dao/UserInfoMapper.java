package com.example.mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.mybatis.bean.UserInfoBean;

public interface UserInfoMapper {
	public void add(UserInfoBean userInfo) ;
	public void addBatch(List<UserInfoBean> list) ;
	public UserInfoBean get(@Param("userId")Long userId) ;
	public UserInfoBean getByUsername(@Param("username")String username) ;
}
