package com.bayerbbs.applrepos.dto;

public class GroupTypesDTO {

	/**
	 * The DTO (Data transfer object) for the database table "GROUP_TYPES"
	 * 
	 * @author evafl
	 *
	 */
	private Long groupTypeId;
	private String groupTypeName;
	private String individualContact;
	private Long minContacts;
	private Long maxContacts;
	private Long visibleApplication;

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
	public String getIndividualContact() {
		return individualContact;
	}
	public void setIndividualContact(String individualContact) {
		this.individualContact = individualContact;
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
	public Long getVisibleApplication() {
		return visibleApplication;
	}
	public void setVisibleApplication(Long visibleApplication) {
		this.visibleApplication = visibleApplication;
	}
	
}
