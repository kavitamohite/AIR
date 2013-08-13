package com.bayerbbs.applrepos.service;

public class LDAPAuthParameterOutput {
	
	private Long rcCode;
	private String token;
	private String cwid;

	private String username;
	private String lastLogon;
	
	private String result;
	private String messages[];

	public Long getRcCode() {
		return rcCode;
	}
	public void setRcCode(Long rcCode) {
		this.rcCode = rcCode;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String[] getMessages() {
		return messages;
	}
	public void setMessages(String[] messages) {
		this.messages = messages;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public String getLastLogon() {
		return lastLogon;
	}
	public void setLastLogon(String lastLogon) {
		this.lastLogon = lastLogon;
	}
}
