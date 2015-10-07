package com.bayerbbs.applrepos.service;


public class RoomEditParameterInput extends BaseEditParameterInput {
	private String alias;

	private String floor;
	private Long areaId;
	
	private Long severityLevelId;
	private Long businessEssentialId;
	
	//vandana
	private String itHead;

	
	
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	
	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public Long getAreaId() {
		return areaId;
	}
	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}
	
	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}


	public String getItHead() {
		return itHead;
	}
	public void setItHead(String itHead) {
		this.itHead = itHead;
	}
	
}