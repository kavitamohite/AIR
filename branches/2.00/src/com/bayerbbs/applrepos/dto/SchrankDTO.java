package com.bayerbbs.applrepos.dto;


public class SchrankDTO extends LocationDTO {
	private static final long serialVersionUID = -1220657140858832043L;

	private Long severityLevelId;
	private Long businessEssentialId;
	
	//====================
	private String severityLevelIdAcl;
//	private String businessEssentialIdAcl;//Rollenbasierte Sonderfall: wenn User Rolle BusinessEssential-Editor hat: editierbar!
	//====================

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
	
	public String getSeverityLevelIdAcl() {
		return severityLevelIdAcl;
	}
	public void setSeverityLevelIdAcl(String severityLevelIdAcl) {
		this.severityLevelIdAcl = severityLevelIdAcl;
	}
}