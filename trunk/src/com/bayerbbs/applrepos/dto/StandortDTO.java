package com.bayerbbs.applrepos.dto;


public class StandortDTO extends LocationDTO {
	private static final long serialVersionUID = -1220657140858832043L;
	
	private String standortCode;
	private String nameEn;

    public String getStandortCode() {
		return standortCode;
	}
	public void setStandortCode(String code) {
		this.standortCode = code;
	}
	
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	public String getNameEn() {
		return nameEn;
	}
}