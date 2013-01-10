package com.bayerbbs.applrepos.dto;

public class CiPersonsDTO {
	
	/**
	 * The DTO (Data transfer object) for the database table "CI_PERSONS"
	 * 
	 * @author evafl
	 *
	 */
	
	private Long ciPersonsId;
	private Long tableId;
	private Long ciId;
	private String cwid;
	private Long groupTypeId;
	
	public Long getCiPersonsId() {
		return ciPersonsId;
	}
	public void setCiPersonsId(Long ciPersonsId) {
		this.ciPersonsId = ciPersonsId;
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
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public Long getGroupTypeId() {
		return groupTypeId;
	}
	public void setGroupTypeId(Long groupTypeId) {
		this.groupTypeId = groupTypeId;
	}
	
}
