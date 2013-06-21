package com.bayerbbs.applrepos.service;

public class ItSystemCopyParameterInput {

	private String token;
	private String cwid;
	
	// for create by copy
	private Long tableIdSource;
	private Long ciIdSource;
	
	private String ciNameTarget;
	private String ciAliasTarget;
	
	public String getCiAliasTarget() {
		return ciAliasTarget;
	}
	public Long getCiIdSource() {
		return ciIdSource;
	}
	public String getCiNameTarget() {
		return ciNameTarget;
	}
	public String getCwid() {
		return cwid;
	}
	public Long getTableIdSource() {
		return tableIdSource;
	}
	public String getToken() {
		return token;
	}
	public void setCiAliasTarget(String ciAliasTarget) {
		this.ciAliasTarget = ciAliasTarget;
	}
	public void setCiIdSource(Long ciIdSource) {
		this.ciIdSource = ciIdSource;
	}
	public void setCiNameTarget(String ciNameTarget) {
		this.ciNameTarget = ciNameTarget;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public void setTableIdSource(Long tableIdSource) {
		this.tableIdSource = tableIdSource;
	}
	public void setToken(String token) {
		this.token = token;
	}
}