package com.bayerbbs.applrepos.service;

public class CiComplianceParameterInput {
	private String cwid;
	private String token;
	
	private Long zielotypGSToolId;
	private Long itSetId;
	private Long applicationId;
	private Long massnahmeId;
	private Long applicationCat1Id;

	// für die Einzelverlinkung
	private Long linkCiId;
	private Long linkCiTableLinkId;
	private Long massnahmeGstoolId;
	
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Long getZielotypGSToolId() {
		return zielotypGSToolId;
	}
	public void setZielotypGSToolId(Long zielotypGSToolId) {
		this.zielotypGSToolId = zielotypGSToolId;
	}
	public Long getItSetId() {
		return itSetId;
	}
	public void setItSetId(Long itSetId) {
		this.itSetId = itSetId;
	}
	public Long getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}
	public Long getMassnahmeId() {
		return massnahmeId;
	}
	public void setMassnahmeId(Long massnahmeId) {
		this.massnahmeId = massnahmeId;
	}
	public Long getApplicationCat1Id() {
		return applicationCat1Id;
	}
	public void setApplicationCat1Id(Long applicationCat1Id) {
		this.applicationCat1Id = applicationCat1Id;
	}
	public Long getLinkCiId() {
		return linkCiId;
	}
	public void setLinkCiId(Long linkCiId) {
		this.linkCiId = linkCiId;
	}
	public Long getLinkCiTableLinkId() {
		return linkCiTableLinkId;
	}
	public void setLinkCiTableLinkId(Long linkCiTableLinkId) {
		this.linkCiTableLinkId = linkCiTableLinkId;
	}
	public Long getMassnahmeGstoolId() {
		return massnahmeGstoolId;
	}
	public void setMassnahmeGstoolId(Long massnahmeGstoolId) {
		this.massnahmeGstoolId = massnahmeGstoolId;
	}

}
