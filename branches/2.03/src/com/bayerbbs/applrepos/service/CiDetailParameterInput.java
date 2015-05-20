package com.bayerbbs.applrepos.service;

public class CiDetailParameterInput {
	private String token;
	private String cwid;
	private Long ciId;
	private Long ciTypeId;
	private String ciSubTypeId;
	
	public Long getCiId() {
		return ciId;
	}
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}

	public Long getCiTypeId() {
		return ciTypeId;
	}
	public void setCiTypeId(Long ciTypeId) {
		this.ciTypeId = ciTypeId;
	}

	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}

	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	/**
	 * @return the ciSubTypeId
	 */
	public String getCiSubTypeId() {
		return ciSubTypeId;
	}
	/**
	 * @param ciSubTypeId the ciSubTypeId to set
	 */
	public void setCiSubTypeId(String ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
	}
	
}