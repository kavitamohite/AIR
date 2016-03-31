package com.bayerbbs.applrepos.dto;

public class GroupsDTO {

	/**
	 * The DTO (Data transfer object) for the database table "GROUPS"
	 * 
	 * @author evafl
	 *
	 */
	private Long groupId;
	private String groupName;
	private String cwidResponsible;
	private String managerCwid;
	private String managerSubstituteCwid;
	
	public Long getGroupId() {
		return groupId;
	}
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getCwidResponsible() {
		return cwidResponsible;
	}
	public void setCwidResponsible(String cwidResponsible) {
		this.cwidResponsible = cwidResponsible;
	}
	public String getManagerCwid() {
		return managerCwid;
	}
	public void setManagerCwid(String managerCwid) {
		this.managerCwid = managerCwid;
	}
	public String getManagerSubstituteCwid() {
		return managerSubstituteCwid;
	}
	public void setManagerSubstituteCwid(String managerSubstituteCwid) {
		this.managerSubstituteCwid = managerSubstituteCwid;
	}
	
}
