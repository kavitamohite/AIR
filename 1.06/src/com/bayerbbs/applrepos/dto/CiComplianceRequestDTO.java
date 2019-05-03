package com.bayerbbs.applrepos.dto;

public class CiComplianceRequestDTO {

	private Long ciComplianceRequestId;
	private Long complianceRequestId;
	private Long ciId;
	private Long tableId;
	
	private String value;

	public Long getCiComplianceRequestId() {
		return ciComplianceRequestId;
	}

	public void setCiComplianceRequestId(Long ciComplianceRequestId) {
		this.ciComplianceRequestId = ciComplianceRequestId;
	}

	public Long getComplianceRequestId() {
		return complianceRequestId;
	}

	public void setComplianceRequestId(Long complianceRequestId) {
		this.complianceRequestId = complianceRequestId;
	}

	public Long getCiId() {
		return ciId;
	}

	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}

	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
}
