package com.bayerbbs.applrepos.dto;

public class ApplicationContactGroupDTO {

	private Long groupTypeId;
	private String groupTypeName;
	private String individualContactYN;
	private Long minContacts;
	private Long maxContacts;
	
	private ApplicationContactEntryDTO[] applicationContactEntryDTO;

	public ApplicationContactGroupDTO() {
	}
	
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

	public ApplicationContactEntryDTO[] getApplicationContactEntryDTO() {
		return applicationContactEntryDTO;
	}

	public void setApplicationContactEntryDTO(
			ApplicationContactEntryDTO[] applicationContactEntryDTO) {
		this.applicationContactEntryDTO = applicationContactEntryDTO;
	}

	
}
