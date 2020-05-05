package com.bayerbbs.applrepos.dto;

import com.bayerbbs.applrepos.constants.AirKonstanten;


public class SchrankDTO extends LocationDTO {
	private static final long serialVersionUID = -1220657140858832043L;

	private Long severityLevelId;
	private Long businessEssentialId;
	private Long roomId;
	
	private String street;
	private String streetNumber;
	private String postalCode;
	private String location;

	public SchrankDTO() {
		setTableId(AirKonstanten.TABLE_ID_POSITION);
	}
	//====================
	private String severityLevelIdAcl;
//	private String businessEssentialIdAcl;//Rollenbasierte Sonderfall: wenn User Rolle BusinessEssential-Editor hat: editierbar!
	//====================

	public Long getRoomId() {
		return roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}
	
	/*public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}*/

	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
	
	public String getSeverityLevelIdAcl() {
		return severityLevelIdAcl;
	}
	public void setSeverityLevelIdAcl(String severityLevelIdAcl) {
		this.severityLevelIdAcl = severityLevelIdAcl;
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
}