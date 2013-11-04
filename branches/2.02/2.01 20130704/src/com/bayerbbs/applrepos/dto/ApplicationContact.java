package com.bayerbbs.applrepos.dto;

public class ApplicationContact {

	private Long groupTypeId;
	private String groupTypeName;
	private String individualContactYN;
	private Long minContacts;
	private Long maxContacts;
	private String cwid;
	private String personName;
	private Long groupId;
	private String groupName;
	
	public Long getGroupTypeId() {
		return groupTypeId;
	}
	public void setGroupTypeId(Long groupTypeId) {
		this.groupTypeId = groupTypeId;
	}
	public String getGroupTypeName() {
		return groupTypeName;
	}
	public void setGroupTypeName(String groupTypeName) {
		this.groupTypeName = groupTypeName;
	}
	public String getIndividualContactYN() {
		return individualContactYN;
	}
	public void setIndividualContactYN(String individualContactYN) {
		this.individualContactYN = individualContactYN;
	}
	public Long getMinContacts() {
		return minContacts;
	}
	public void setMinContacts(Long minContacts) {
		this.minContacts = minContacts;
	}
	public Long getMaxContacts() {
		return maxContacts;
	}
	public void setMaxContacts(Long maxContacts) {
		this.maxContacts = maxContacts;
	}
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
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
	
}
