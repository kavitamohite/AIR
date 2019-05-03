package com.bayerbbs.applrepos.dto;

public class CiGroupsDTO {

	/**
	 * The DTO (Data transfer object) for the database table "CI_GROUPS"
	 * 
	 * @author evafl
	 *
	 */

	private Long ciGroupsId;
	private Long tableId;
	private Long ciId;
	private Long groupId;
	private Long groupTypeId;
	
	public Long getCiGroupsId() {
		return ciGroupsId;
	}
	public void setCiGroupsId(Long ciGroupsId) {
		this.ciGroupsId = ciGroupsId;
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
	public Long getGroupId() {
		return groupId;
	}
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	public Long getGroupTypeId() {
		return groupTypeId;
	}
	public void setGroupTypeId(Long groupTypeId) {
		this.groupTypeId = groupTypeId;
	}
	
}
