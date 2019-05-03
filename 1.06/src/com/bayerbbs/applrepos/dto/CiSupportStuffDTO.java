package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class CiSupportStuffDTO implements Serializable {

	private static final long serialVersionUID = -8415394282755411775L;
	
	private Long ciSupportStuffId;
	private Long ciSupportStuffTypeId;
	private Long tableId;
	private Long ciId;
	private String ciSupportStuffValue;

	public Long getCiSupportStuffId() {
		return ciSupportStuffId;
	}
	public void setCiSupportStuffId(Long ciSupportStuffId) {
		this.ciSupportStuffId = ciSupportStuffId;
	}
	public Long getCiSupportStuffTypeId() {
		return ciSupportStuffTypeId;
	}
	public void setCiSupportStuffTypeId(Long ciSupportStuffTypeId) {
		this.ciSupportStuffTypeId = ciSupportStuffTypeId;
	}
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	public Long getCiId() {
		return ciId;
	}
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}
	public String getCiSupportStuffValue() {
		return ciSupportStuffValue;
	}
	public void setCiSupportStuffValue(String ciSupportStuffValue) {
		this.ciSupportStuffValue = ciSupportStuffValue;
	}
	
	
	
}
