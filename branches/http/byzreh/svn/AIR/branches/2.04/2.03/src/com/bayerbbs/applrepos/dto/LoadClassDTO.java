package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class LoadClassDTO implements Serializable {

	private static final long serialVersionUID = 4531536818063564465L;

	private String loadClassId;
	private String loadClassTxt;
	
	public LoadClassDTO() {
	}

	public LoadClassDTO(String loadClassId) {
		this(loadClassId, loadClassId);
	}
	
	public LoadClassDTO(String loadClassId, String loadClassTxt) {
		this.loadClassId = loadClassId;
		this.loadClassTxt = loadClassTxt;
	}

	
	public String getLoadClassId() {
		return loadClassId;
	}

	public void setLoadClassId(String loadClassId) {
		this.loadClassId = loadClassId;
	}

	public String getLoadClassTxt() {
		return loadClassTxt;
	}

	public void setLoadClassTxt(String loadClassTxt) {
		this.loadClassTxt = loadClassTxt;
	}
	
}
