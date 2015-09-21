package com.example.mybatis.service;

import java.util.List;

import com.example.mybatis.bean.UserInfoBean;

public interface UserInfoService {
	public UserInfoBean get(Long userId) ;
	public String add(List<UserInfoBean> list) ;
}
