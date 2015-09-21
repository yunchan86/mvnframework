package com.example.page;

import java.util.List;

public class PageData<T> {

	private int total=1;
	private int pageNum=0;
	List<T> rowset ;
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public List<T> getRowset() {
		return rowset;
	}
	public void setRowset(List<T> rowset) {
		this.rowset = rowset;
	}
	
	
}
