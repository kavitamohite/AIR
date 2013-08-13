package com.bayerbbs.applrepos.dto;

public class OperationalStatusDTO {

	/**
	 * The DTO (Data transfer object) for the database table "EINSATZ_STATUS" - operational status
	 * 
	 * @author evafl
	 *
	 */
	
	private Long operationalStatusId;
	private String operationalStatus;
	private String operationalStatusEn;
	private String operationalStatusTxt;
	private Long sort;

	public Long getOperationalStatusId() {
		return operationalStatusId;
	}
	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}
	public String getOperationalStatus() {
		return operationalStatus;
	}
	public void setOperationalStatus(String operationalStatus) {
		this.operationalStatus = operationalStatus;
	}
	public String getOperationalStatusEn() {
		return operationalStatusEn;
	}
	public void setOperationalStatusEn(String operationalStatusEn) {
		this.operationalStatusEn = operationalStatusEn;
	}
	public String getOperationalStatusTxt() {
		return operationalStatusTxt;
	}
	public void setOperationalStatusTxt(String operationalStatusTxt) {
		this.operationalStatusTxt = operationalStatusTxt;
	}
	public Long getSort() {
		return sort;
	}
	public void setSort(Long sort) {
		this.sort = sort;
	}
	
}
