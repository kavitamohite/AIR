package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

public class AppRepAuthData implements Serializable {

	private static final long serialVersionUID = -8255363056759491716L;
	
	private String cwid;
	private String token;
	private String username;
	private String lastlogon;
	
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getLastlogon() {
		return lastlogon;
	}
	public void setLastlogon(String lastlogon) {
		this.lastlogon = lastlogon;
	}
	
}
