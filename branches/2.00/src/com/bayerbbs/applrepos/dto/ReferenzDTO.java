package com.bayerbbs.applrepos.dto;

public class ReferenzDTO {
	private Long id;
	private String name;
	private Long itsetId;
	private Long itsecGroupId;
	private Long ciKat1;
	private Integer tableId;
	private Long delTimestamp;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Long getItsetId() {
		return itsetId;
	}
	public void setItsetId(Long itsetId) {
		this.itsetId = itsetId;
	}
	
	public Long getItsecGroupId() {
		return itsecGroupId;
	}
	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	public Long getCiKat1() {
		return ciKat1;
	}
	public void setCiKat1(Long ciKat1) {
		this.ciKat1 = ciKat1;
	}
	
	public Integer getTableId() {
		return tableId;
	}
	public void setTableId(Integer tableId) {
		this.tableId = tableId;
	}
	public Long getDelTimestamp() {
		return delTimestamp;
	}
	public void setDelTimestamp(Long delTimestamp) {
		this.delTimestamp = delTimestamp;
	}
}