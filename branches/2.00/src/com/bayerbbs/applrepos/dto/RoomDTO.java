package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class RoomDTO extends LocationDTO implements Serializable {
	private static final long serialVersionUID = 1853465853927062074L;
	
	private String alias;

	private String floor;
	private String roomType;
	
	private Long severityLevelId;
	private Long businessEssentialId;
	
	private String street;
	private String streetNumber;
	private String postalCode;
	private String location;
	
	//====================
	private String severityLevelIdAcl;
//	private String businessEssentialIdAcl;//Rollenbasierte Sonderfall: wenn User Rolle BusinessEssential-Editor hat: editierbar!
	//====================


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

	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
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
	
	
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}

	
	public String getStreetNumber() {
		return streetNumber;
	}
	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	
	public String getSeverityLevelIdAcl() {
		return severityLevelIdAcl;
	}
	public void setSeverityLevelIdAcl(String severityLevelIdAcl) {
		this.severityLevelIdAcl = severityLevelIdAcl;
	}
	
	
//	public String getBusinessEssentialIdAcl() {
//		return businessEssentialIdAcl;
//	}
//	public void setBusinessEssentialIdAcl(String businessEssentialIdAcl) {
//		this.businessEssentialIdAcl = businessEssentialIdAcl;
//	}
}