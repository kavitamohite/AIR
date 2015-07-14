package com.bayerbbs.applrepos.dto;

import java.io.Serializable;
import java.util.Set;

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
	//Added by vandana
	private String providerName;
	private String providerNameHidden;
	private String providerAddress;
	private String providerAddressHidden;
	private String itHead;
	
	//====================
	private String severityLevelIdAcl;
//	private String businessEssentialIdAcl;//Rollenbasierte Sonderfall: wenn User Rolle BusinessEssential-Editor hat: editierbar!
	//====================

	private Set<BuildingAreaDTO> buildingAreas;
	private String buildingAreaData;
	

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

	
	public Set<BuildingAreaDTO> getBuildingAreas() {
		return buildingAreas;
	}
	public void setBuildingAreas(Set<BuildingAreaDTO> buildingAreas) {
		this.buildingAreas = buildingAreas;
	}

	public String getBuildingAreaData() {
		return buildingAreaData;
	}
	public void setBuildingAreaData(String buildingAreaData) {
		this.buildingAreaData = buildingAreaData;
	}
	//vandana

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	public String getProviderNameHidden() {
		return providerNameHidden;
	}

	public void setProviderNameHidden(String providerNameHidden) {
		this.providerNameHidden = providerNameHidden;
	}
	
	public String getProviderAddress() {
		return providerAddress;
	}

	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}
	
	public String getProviderAddressHidden() {
		return providerAddressHidden;
	}
	
	public void setProviderAddressHidden(String providerAddressHidden) {
		this.providerAddressHidden = providerAddressHidden;
	}
	
	public String getItHead() {
		return itHead;
	}
	
	public void setItHead(String itHead) {
		this.itHead = itHead;
	}
	
}