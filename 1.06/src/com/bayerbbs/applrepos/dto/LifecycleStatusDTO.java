package com.bayerbbs.applrepos.dto;

public class LifecycleStatusDTO {

	/**
	 * The DTO (Data transfer object) for the database table "LIFECYCLE_STATUS"
	 * 
	 * @author evafl
	 *
	 */
	
	private Long lcStatusId;
	private String lcStatus;
	private String lcStatusTxt;
	private Long sort;
	private Long tabelleId;
	private String lcStatusEn;
	
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
	public Long getTabelleId() {
		return tabelleId;
	}
	public void setTabelleId(Long tabelleId) {
		this.tabelleId = tabelleId;
	}
	public String getLcStatusEn() {
		return lcStatusEn;
	}
	public void setLcStatusEn(String lcStatusEn) {
		this.lcStatusEn = lcStatusEn;
	}
	
}
