package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.List;

import com.bayerbbs.applrepos.dto.RolePersonDTO;

public class AppRepAuthData implements Serializable {
	private static final long serialVersionUID = -8255363056759491716L;
	
	private String cwid;
	private String token;
	private String username;
	private String lastlogon;
	
	private List<RolePersonDTO> roles;
	
	
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
	
	public void setRoles(List<RolePersonDTO> roles) {
		this.roles = roles;
	}
	public List<RolePersonDTO> getRoles() {
		return roles;
	}
}
