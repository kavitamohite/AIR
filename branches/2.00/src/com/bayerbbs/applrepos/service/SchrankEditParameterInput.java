package com.bayerbbs.applrepos.service;

public class SchrankEditParameterInput extends BaseEditParameterInput {

	private Long severityLevelId;
	private Long businessEssentialId;
		
	
	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
}
