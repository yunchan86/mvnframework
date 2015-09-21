package com.example.mybatis.service;

import java.util.List;

import javax.annotation.Resource;

import com.example.mybatis.bean.UserInfoBean;
import com.example.mybatis.dao.UserInfoMapper;
/**
 * 使用注解来注入到service，service来处理
 * @author chy
 */
public class UserInfoServiceImpl implements UserInfoService {

	@Resource(type = UserInfoMapper.class)
	private UserInfoMapper uidao ;
	@Override
	public UserInfoBean get(Long userId) {
		UserInfoBean uibean = uidao.get(userId) ;
		if(uibean==null) System.out.println("object is null.");
		else System.out.println(uibean.toString());
		return uibean ;
	}
	@Override
	public String add(List<UserInfoBean> list) {
		uidao.addBatch(list);
		return "success.";
	}

}
