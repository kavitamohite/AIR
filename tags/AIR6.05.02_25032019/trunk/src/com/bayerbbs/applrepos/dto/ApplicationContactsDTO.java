package com.bayerbbs.applrepos.dto;

public class ApplicationContactsDTO {

	private ApplicationContactGroupDTO[] applicationContactGroupDTO;

	public ApplicationContactsDTO() {
		
	}
	
	public ApplicationContactGroupDTO[] getApplicationContactGroupDTO() {
		return applicationContactGroupDTO;
	}

	public void setApplicationContactGroupDTO(
			ApplicationContactGroupDTO[] applicationContactGroupDTO) {
		this.applicationContactGroupDTO = applicationContactGroupDTO;
	}
	
}
