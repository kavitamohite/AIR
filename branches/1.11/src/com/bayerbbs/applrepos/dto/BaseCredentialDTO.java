package com.bayerbbs.applrepos.dto;

public class BaseCredentialDTO extends CiBaseDTO {
	private String cwid;
	private String token;
	
	public BaseCredentialDTO() {}
	
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
}