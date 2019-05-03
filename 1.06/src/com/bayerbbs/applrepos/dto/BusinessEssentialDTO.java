package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class BusinessEssentialDTO implements Serializable {

	private static final long serialVersionUID = 7663272578450416786L;
	
	private Long severityLevelId;
	private String severityLevel;
	private Long severityGPSC;
	private String usage;
	private Long beCode;
	
	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	public String getSeverityLevel() {
		return severityLevel;
	}
	public void setSeverityLevel(String severityLevel) {
		this.severityLevel = severityLevel;
	}
	public Long getSeverityGPSC() {
		return severityGPSC;
	}
	public void setSeverityGPSC(Long severityGPSC) {
		this.severityGPSC = severityGPSC;
	}
	public String getUsage() {
		return usage;
	}
	public void setUsage(String usage) {
		this.usage = usage;
	}
	public Long getBeCode() {
		return beCode;
	}
	public void setBeCode(Long beCode) {
		this.beCode = beCode;
	}
	
}
