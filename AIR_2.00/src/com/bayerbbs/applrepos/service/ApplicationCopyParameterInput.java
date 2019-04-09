package com.bayerbbs.applrepos.service;

public class ApplicationCopyParameterInput {

	private String token;
	private String cwid;
	
	// for create by copy
	private Long tableIdSource;
	private Long ciIdSource;
	
	private String ciNameTarget;
	private String ciAliasTarget;
	
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
	public Long getTableIdSource() {
		return tableIdSource;
	}
	public void setTableIdSource(Long tableIdSource) {
		this.tableIdSource = tableIdSource;
	}
	public Long getCiIdSource() {
		return ciIdSource;
	}
	public void setCiIdSource(Long ciIdSource) {
		this.ciIdSource = ciIdSource;
	}
	public String getCiNameTarget() {
		return ciNameTarget;
	}
	public void setCiNameTarget(String ciNameTarget) {
		this.ciNameTarget = ciNameTarget;
	}
	public String getCiAliasTarget() {
		return ciAliasTarget;
	}
	public void setCiAliasTarget(String ciAliasTarget) {
		this.ciAliasTarget = ciAliasTarget;
	}
	
}
