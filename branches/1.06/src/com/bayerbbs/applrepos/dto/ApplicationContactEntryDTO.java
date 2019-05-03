package com.bayerbbs.applrepos.dto;

public class ApplicationContactEntryDTO {

	private String cwid;
	private String personName;
	private String groupId; 
	private String groupName;
	
	public ApplicationContactEntryDTO() {
	}
	
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		if (this.cwid==null) {
			this.cwid = cwid;
		} else {
			this.cwid += "," + cwid;
		}
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		if (this.personName==null) {
			this.personName = personName;
		} else {
			this.personName += "\n" + personName;
		}
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		if (this.groupId==null) {
			this.groupId = groupId;
		} else {
			this.groupId += "," + groupId;
		}
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		if (this.groupName==null) {
			this.groupName = groupName;
		} else {
			this.groupName += "\n" + groupName;
		}
	}
	
}
