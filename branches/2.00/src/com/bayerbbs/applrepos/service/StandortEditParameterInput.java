package com.bayerbbs.applrepos.service;

public class StandortEditParameterInput extends BaseEditParameterInput {
	private String standortCode;
	private Long landId;
	
    public String getStandortCode() {
		return standortCode;
	}
	public void setStandortCode(String code) {
		this.standortCode = code;
	}

	public Long getLandId() {
		return landId;
	}
	public void setLandId(Long landId) {
		this.landId = landId;
	}
}
