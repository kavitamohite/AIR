package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ApplicationAccessDTO;
import com.bayerbbs.applrepos.dto.ApplicationDTO;

public class ApplicationDetailParameterOutput {

	private ApplicationDTO applicationDTO;
	
	private ApplicationAccessDTO applicationAccessDTO;

	public ApplicationDTO getApplicationDTO() {
		return applicationDTO;
	}

	public void setApplicationDTO(ApplicationDTO applicationDTO) {
		this.applicationDTO = applicationDTO;
	}

	public ApplicationAccessDTO getApplicationAccessDTO() {
		return applicationAccessDTO;
	}

	public void setApplicationAccessDTO(ApplicationAccessDTO applicationAccessDTO) {
		this.applicationAccessDTO = applicationAccessDTO;
	}
	
}
