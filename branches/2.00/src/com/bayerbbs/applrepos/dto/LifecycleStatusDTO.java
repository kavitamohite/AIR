package com.bayerbbs.applrepos.dto;

public class LifecycleStatusDTO {
	private Long lcStatusId;
	private String lcStatus;
	private String lcStatusTxt;
	private String lcStatusEn;
	private Long sort;
	
	private Long lcSubStatusId;
	private Long tableId;
	
	
	public Long getLcStatusId() {
		return lcStatusId;
	}
	public void setLcStatusId(Long lcStatusId) {
		this.lcStatusId = lcStatusId;
	}
	public String getLcStatus() {
		return lcStatus;
	}
	public void setLcStatus(String lcStatus) {
		this.lcStatus = lcStatus;
	}
	public String getLcStatusTxt() {
		return lcStatusTxt;
	}
	public void setLcStatusTxt(String lcStatusTxt) {
		this.lcStatusTxt = lcStatusTxt;
	}
	public Long getSort() {
		return sort;
	}
	public void setSort(Long sort) {
		this.sort = sort;
	}
	public String getLcStatusEn() {
		return lcStatusEn;
	}
	public void setLcStatusEn(String lcStatusEn) {
		this.lcStatusEn = lcStatusEn;
	}
	
	
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}	
	public void setLcSubStatusId(Long lcSubStatusId) {
		this.lcSubStatusId = lcSubStatusId;
	}
	public Long getLcSubStatusId() {
		return lcSubStatusId;
	}
}