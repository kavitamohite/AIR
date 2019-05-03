package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class DedicatedDTO implements Serializable {

	private static final long serialVersionUID = -550686955338865515L;

	private String dedicatedId;
	private String dedicatedTxt;

	public DedicatedDTO() {
	}

	public DedicatedDTO(String dedicatedId) {
		this(dedicatedId, dedicatedId);
	}
	
	public DedicatedDTO(String dedicatedId, String dedicatedTxt) {
		this.dedicatedId = dedicatedId;
		this.dedicatedTxt = dedicatedTxt;
	}

	
	public String getDedicatedId() {
		return dedicatedId;
	}

	public void setDedicatedId(String dedicatedId) {
		this.dedicatedId = dedicatedId;
	}

	public String getDedicatedTxt() {
		return dedicatedTxt;
	}

	public void setDedicatedTxt(String dedicatedTxt) {
		this.dedicatedTxt = dedicatedTxt;
	}
	
	
	
}
