package com.bayerbbs.applrepos.service;

public class HistoryComplianceParameterInput {

	private String token;
	private String cwid;

	// for the list page
	private Long tableId;
	private Long tablePkId;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	public Long getTablePkId() {
		return tablePkId;
	}
	public void setTablePkId(Long tablePkId) {
		this.tablePkId = tablePkId;
	}
}
